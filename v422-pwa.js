(() => {
  "use strict";

  const VERSION = "4.41";
  const DISMISS_KEY = "meowde-pwa-install-dismissed-at";
  const RELOAD_KEY = "meowde-pwa-reload-v441";
  const DISMISS_DAYS = 7;
  const UPDATE_TIMEOUT_MS = 8000;

  let deferredInstallPrompt = null;
  let activeBanner = null;
  let reloadForNewWorker = false;
  let updateTimer = null;

  function currentLanguage() {
    try {
      if (typeof S !== "undefined" && S && S.lang === "en") return "en";
    } catch (error) {}
    return document.documentElement.lang === "en" ? "en" : "ko";
  }

  function tr(korean, english) {
    return currentLanguage() === "en" ? english : korean;
  }

  function removeBanner() {
    if (activeBanner) {
      activeBanner.remove();
      activeBanner = null;
    }
  }

  function showToast(message) {
    document.querySelectorAll(".meowde-pwa-toast").forEach((item) => item.remove());
    const toast = document.createElement("div");
    toast.className = "meowde-pwa-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  function showBanner({ title, text, primaryLabel, onPrimary, secondaryLabel, onSecondary }) {
    removeBanner();
    const banner = document.createElement("aside");
    banner.className = "meowde-pwa-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", title);

    const copy = document.createElement("div");
    copy.className = "meowde-pwa-copy";
    const titleElement = document.createElement("div");
    titleElement.className = "meowde-pwa-title";
    titleElement.textContent = title;
    const textElement = document.createElement("div");
    textElement.className = "meowde-pwa-text";
    textElement.textContent = text;
    copy.append(titleElement, textElement);

    const actions = document.createElement("div");
    actions.className = "meowde-pwa-actions";
    const primaryButton = document.createElement("button");
    primaryButton.type = "button";
    primaryButton.className = "meowde-pwa-btn primary";
    primaryButton.textContent = primaryLabel;
    primaryButton.addEventListener("click", onPrimary);
    const secondaryButton = document.createElement("button");
    secondaryButton.type = "button";
    secondaryButton.className = "meowde-pwa-btn ghost";
    secondaryButton.textContent = secondaryLabel || tr("나중에", "Later");
    secondaryButton.addEventListener("click", () => {
      removeBanner();
      if (typeof onSecondary === "function") onSecondary();
    });
    actions.append(primaryButton, secondaryButton);
    banner.append(copy, actions);
    document.body.appendChild(banner);
    activeBanner = banner;
  }

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function isIosSafari() {
    const ua = window.navigator.userAgent;
    return /iphone|ipad|ipod/i.test(ua) && /webkit/i.test(ua) && !/crios|fxios|edgios|opios/i.test(ua);
  }

  function isLearningNow() {
    try {
      return typeof S !== "undefined" && S && S.screen === "lesson";
    } catch (error) {
      return false;
    }
  }

  function wasInstallPromptRecentlyDismissed() {
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    return dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_DAYS * 86400000;
  }

  function rememberInstallDismissal() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }

  async function requestInstall() {
    if (!deferredInstallPrompt) return;
    const promptEvent = deferredInstallPrompt;
    deferredInstallPrompt = null;
    removeBanner();
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") showToast(tr("Meowde 설치를 시작했어요.", "Meowde installation started."));
    else rememberInstallDismissal();
  }

  function showInstallBanner() {
    if (isStandalone() || !deferredInstallPrompt || wasInstallPromptRecentlyDismissed()) return;
    showBanner({
      title: tr("Meowde 앱 설치", "Install Meowde"),
      text: tr(
        "홈 화면에서 더 빠르게 열고, 연결이 불안정해도 학습 화면을 사용할 수 있어요.",
        "Open Meowde faster from your home screen and keep learning when the connection is unstable."
      ),
      primaryLabel: tr("설치", "Install"),
      onPrimary: requestInstall,
      onSecondary: rememberInstallDismissal
    });
  }

  function showIosInstallGuide() {
    if (!isIosSafari() || isStandalone() || wasInstallPromptRecentlyDismissed()) return;
    showBanner({
      title: tr("홈 화면에 Meowde 추가", "Add Meowde to Home Screen"),
      text: tr(
        "Safari의 공유 버튼을 누른 뒤 ‘홈 화면에 추가’를 선택하세요.",
        "Tap Safari's Share button, then choose Add to Home Screen."
      ),
      primaryLabel: tr("확인", "Got it"),
      onPrimary: () => {
        rememberInstallDismissal();
        removeBanner();
      },
      secondaryLabel: tr("닫기", "Close"),
      onSecondary: rememberInstallDismissal
    });
  }

  function activateWaitingWorker(registration) {
    if (!registration.waiting) return false;
    reloadForNewWorker = true;
    sessionStorage.setItem(RELOAD_KEY, "pending");
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    clearTimeout(updateTimer);
    updateTimer = window.setTimeout(() => {
      showBanner({
        title: tr("업데이트가 지연되고 있어요", "The update is taking longer than expected"),
        text: tr(
          "새 버전을 적용하려면 한 번 새로고침해 주세요.",
          "Refresh once to apply the latest version."
        ),
        primaryLabel: tr("새로고침", "Refresh"),
        onPrimary: () => window.location.reload(),
        secondaryLabel: tr("계속 사용", "Keep using")
      });
    }, UPDATE_TIMEOUT_MS);
    return true;
  }

  function handleReadyUpdate(registration) {
    if (!registration.waiting) return;
    if (!isLearningNow() && document.visibilityState === "visible") {
      activateWaitingWorker(registration);
      return;
    }
    showBanner({
      title: tr("새 버전 준비 완료", "A new version is ready"),
      text: tr(
        "현재 문제를 마친 뒤 업데이트하면 최신 화면과 오프라인 파일을 사용합니다.",
        "Update after the current question to use the latest interface and offline files."
      ),
      primaryLabel: tr("업데이트", "Update"),
      onPrimary: () => activateWaitingWorker(registration),
      secondaryLabel: tr("나중에", "Later")
    });
  }

  function watchForServiceWorkerUpdate(registration) {
    if (registration.waiting && navigator.serviceWorker.controller) handleReadyUpdate(registration);
    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;
      installingWorker.addEventListener("statechange", () => {
        if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
          handleReadyUpdate(registration);
        }
      });
    });
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none"
      });
      watchForServiceWorkerUpdate(registration);
      await registration.update().catch(() => {});
      window.setInterval(() => registration.update().catch(() => {}), 30 * 60 * 1000);
    } catch (error) {
      console.error("Meowde service worker registration failed:", error);
      showBanner({
        title: tr("오프라인 파일을 준비하지 못했어요", "Offline files could not be prepared"),
        text: tr(
          "인터넷 연결을 확인한 뒤 다시 시도해 주세요.",
          "Check your internet connection and try again."
        ),
        primaryLabel: tr("다시 시도", "Try again"),
        onPrimary: () => window.location.reload(),
        secondaryLabel: tr("닫기", "Close")
      });
    }
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    localStorage.removeItem(DISMISS_KEY);
    removeBanner();
    showToast(tr("Meowde 설치가 완료됐어요.", "Meowde was installed."));
  });

  window.addEventListener("online", () => showToast(tr("인터넷에 다시 연결됐어요.", "You are back online.")));
  window.addEventListener("offline", () => showToast(tr(
    "오프라인 모드예요. Python 실행은 연결이 필요할 수 있어요.",
    "You are offline. Running Python may require a connection."
  )));

  navigator.serviceWorker?.addEventListener("controllerchange", () => {
    clearTimeout(updateTimer);
    if (!reloadForNewWorker) return;
    if (sessionStorage.getItem(RELOAD_KEY) === "reloaded") return;
    sessionStorage.setItem(RELOAD_KEY, "reloaded");
    window.location.reload();
  });

  if (sessionStorage.getItem(RELOAD_KEY) === "reloaded") {
    sessionStorage.removeItem(RELOAD_KEY);
    showToast(tr("Meowde가 최신 버전으로 업데이트됐어요.", "Meowde is now up to date."));
  }

  window.MeowPWA = {
    version: VERSION,
    checkForUpdate: async () => {
      const registration = await navigator.serviceWorker?.getRegistration("/");
      if (!registration) return false;
      await registration.update();
      if (registration.waiting) handleReadyUpdate(registration);
      return Boolean(registration.waiting);
    }
  };

  registerServiceWorker();
  window.setTimeout(() => {
    showInstallBanner();
    showIosInstallGuide();
  }, 1200);
})();
