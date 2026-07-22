(function applyMeowdeV423CharacterRefresh() {
  const palettes = {
    a: {
      fur: "#FFF7EC",
      furShadow: "#F4E5D3",
      ink: "#463B3A",
      inner: "#F3B7B1",
      accent: "#79CCAE",
      accentSoft: "#DDF5EC",
      mark: "#EBCFB7",
    },
    b: {
      fur: "#FFF8EE",
      furShadow: "#F2E4D7",
      ink: "#443A45",
      inner: "#F1B9C7",
      accent: "#B9A2EB",
      accentSoft: "#EEE8FF",
      mark: "#E5CCBA",
    },
    c: {
      fur: "#FFF9F1",
      furShadow: "#EFE1D1",
      ink: "#3F3938",
      inner: "#F3BCB2",
      accent: "#F2B180",
      accentSoft: "#FFF0E3",
      mark: "#D8C0A8",
    },
    d: {
      fur: "#FFF8E8",
      furShadow: "#EFDCB9",
      ink: "#4B3C2B",
      inner: "#F0B9A9",
      accent: "#E6BD4B",
      accentSoft: "#FFF3C6",
      mark: "#DDBE76",
    },
  };

  function eyeMarkup(mood, palette) {
    const { ink } = palette;

    if (mood === "happy") {
      return `
        <ellipse cx="44" cy="55" rx="5.3" ry="6.2"
          fill="${ink}"/>
        <ellipse cx="76" cy="55" rx="5.3" ry="6.2"
          fill="${ink}"/>

        <ellipse cx="45.7" cy="52.9" rx="1.9" ry="2.2"
          fill="#fff"/>
        <ellipse cx="77.7" cy="52.9" rx="1.9" ry="2.2"
          fill="#fff"/>

        <path d="M39.2 48.2c3.2-1.5 6.6-1.5 9.6 0"
          fill="none" stroke="${ink}" stroke-width="1.8"
          stroke-linecap="round" opacity=".42"/>
        <path d="M71.2 48.2c3.2-1.5 6.6-1.5 9.6 0"
          fill="none" stroke="${ink}" stroke-width="1.8"
          stroke-linecap="round" opacity=".42"/>
      `;
    }

    if (mood === "focus") {
      return `
        <ellipse cx="44" cy="55" rx="5.3" ry="6.8" fill="${ink}"/>
        <ellipse cx="76" cy="55" rx="5.3" ry="6.8" fill="${ink}"/>
        <circle cx="45.8" cy="52.4" r="2" fill="#fff"/>
        <circle cx="77.8" cy="52.4" r="2" fill="#fff"/>
        <path d="M38 46.5c4.2-2.4 8.2-2.3 12 .2M70 46.7c3.8-2.5 7.8-2.6 12-.2"
          fill="none" stroke="${ink}" stroke-width="2.2"
          stroke-linecap="round" opacity=".72"/>
      `;
    }

    if (mood === "oops") {
      return `
        <ellipse cx="44" cy="55" rx="5.8" ry="7.5" fill="${ink}"/>
        <ellipse cx="76" cy="55" rx="5.8" ry="7.5" fill="${ink}"/>
        <circle cx="46" cy="52" r="2.2" fill="#fff"/>
        <circle cx="78" cy="52" r="2.2" fill="#fff"/>
        <circle cx="42" cy="58" r="1.1" fill="#fff" opacity=".65"/>
        <circle cx="74" cy="58" r="1.1" fill="#fff" opacity=".65"/>
      `;
    }

    return `
      <ellipse cx="44" cy="55" rx="5.2" ry="6.7" fill="${ink}"/>
      <ellipse cx="76" cy="55" rx="5.2" ry="6.7" fill="${ink}"/>
      <circle cx="45.8" cy="52.4" r="2" fill="#fff"/>
      <circle cx="77.8" cy="52.4" r="2" fill="#fff"/>
    `;
  }

  function accessoryMarkup(kind, palette) {
    if (kind === "b") {
      return `
        <path d="M36 83c8 7 40 7 48 0l-4 14c-12 5-28 5-40 0z"
          fill="${palette.accent}"/>
      `;
    }

    if (kind === "c") {
      return `
        <path d="M87 30l2.3 5 5.5.6-4.1 3.7 1.2 5.4-4.9-2.8-4.8 2.8
          1.1-5.4-4.1-3.7 5.6-.6z"
          fill="${palette.accent}" stroke="${palette.ink}"
          stroke-width="1.5" stroke-linejoin="round"/>
      `;
    }

    if (kind === "d") {
      return `
        <path d="M35 83c9 8 41 8 50 0l-4 15c-13 6-29 6-42 0z"
          fill="${palette.accent}"/>
      `;
    }

    return `
      <path d="M33 83c8 5 46 5 54 0"
        fill="none" stroke="${palette.accent}" stroke-width="5"
        stroke-linecap="round"/>
    `;
  }

  catSVG = function catSVG(kind = "a", mood = "idle", size = 80) {
    const p = palettes[kind] || palettes.a;
    const eyes = eyeMarkup(mood, p);
    const accessories = accessoryMarkup(kind, p);

    const mouth =
      mood === "oops"
        ? `
          <path d="M55 71.5q5-4.4 10 0"
            fill="none" stroke="${p.ink}" stroke-width="2.7"
            stroke-linecap="round"/>
        `
        : mood === "happy"
          ? `
            <path d="M51.5 69.5q4.1 6.2 8.5 0q4.4 6.2 8.5 0"
              fill="none" stroke="${p.ink}" stroke-width="2.8"
              stroke-linecap="round"/>
            <path d="M57 74.2q3 2.3 6 0"
              fill="none" stroke="#E88E9F" stroke-width="2"
              stroke-linecap="round"/>
          `
          : `
            <path d="M52.5 69.5q3.8 4 7.5 0q3.8 4 7.5 0"
              fill="none" stroke="${p.ink}" stroke-width="2.7"
              stroke-linecap="round"/>
          `;

    const blushOpacity =
      mood === "happy" ? 0.62 : mood === "oops" ? 0.22 : 0.36;

    return `
      <svg
        class="meowde-cat meowde-cat-${kind} mood-${mood}"
        width="${size}"
        height="${size}"
        viewBox="0 0 120 112"
        role="img"
        aria-label="Meowde cat coach"
      >
        <ellipse cx="60" cy="96" rx="29" ry="5.5"
          fill="#403249" opacity=".08"/>

        <path
          d="M29 43 35 19c.7-2.7 3.9-3.8 6-2l16 14.2
             M91 43 85 19c-.7-2.7-3.9-3.8-6-2L63 31.2"
          fill="${p.fur}"
          stroke="${p.ink}"
          stroke-width="4.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <path d="M37.2 27 40 21.8 48.6 32.7"
          fill="${p.inner}" stroke="${p.ink}" stroke-width="1.8"
          stroke-linejoin="round"/>
        <path d="M82.8 27 80 21.8 71.4 32.7"
          fill="${p.inner}" stroke="${p.ink}" stroke-width="1.8"
          stroke-linejoin="round"/>

        <path
          d="M22 60.5c0-23.2 16.8-38.8 38-38.8s38 15.6 38 38.8
             c0 22.1-14.8 35.8-38 35.8S22 82.6 22 60.5z"
          fill="${p.fur}"
          stroke="${p.ink}"
          stroke-width="4.3"
          stroke-linejoin="round"
        />

        <path d="M29 48c4-9.2 11.2-15.1 20.5-18.1"
          fill="none" stroke="#fff" stroke-width="4.5"
          stroke-linecap="round" opacity=".52"/>

        <path d="M51 26c2.7 4.4 5.7 6.7 9 6.7s6.3-2.3 9-6.7"
          fill="none" stroke="${p.mark}" stroke-width="4"
          stroke-linecap="round" opacity=".72"/>

        ${eyes}

        <path d="M56.6 63.5h6.8L60 67.2z"
          fill="${p.inner}" stroke="${p.ink}" stroke-width="1.6"
          stroke-linejoin="round"/>

        ${mouth}

        <ellipse cx="33" cy="67" rx="6.3" ry="3.8"
          fill="#F2AFC0" opacity="${blushOpacity}"/>
        <ellipse cx="87" cy="67" rx="6.3" ry="3.8"
          fill="#F2AFC0" opacity="${blushOpacity}"/>

        <g fill="none" stroke="${p.ink}" stroke-width="1.9"
          stroke-linecap="round" opacity=".32">
          <path d="M21 62h16"/>
          <path d="M22 68l15-3"/>
          <path d="M99 62H83"/>
          <path d="M98 68l-15-3"/>
        </g>

        ${accessories}
      </svg>
    `;
  };

  const activeScreen = () => {
    if (typeof S === "undefined") return;

    if (S.screen === "lesson" && typeof renderLesson === "function") {
      renderLesson();
      return;
    }

    if (S.screen === "map" && typeof renderMap === "function") {
      renderMap();
      return;
    }

    if (
      (S.screen === "my" || S.screen === "profile" || S.screen === "room") &&
      typeof renderMy === "function"
    ) {
      renderMy();
      return;
    }

    if (typeof renderHome === "function") {
      renderHome();
    }
  };

  activeScreen();
})();
