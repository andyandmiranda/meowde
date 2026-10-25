/* Issue #101: pure selection policy. No storage access, no rewards, no state mutation. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MeowdeLessonAccess = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  function select(lessons, requestedIndex, state) {
    if (!Array.isArray(lessons) || !Number.isInteger(requestedIndex) ||
        requestedIndex < 0 || requestedIndex >= lessons.length ||
        !lessons[requestedIndex] || !Array.isArray(lessons[requestedIndex].exercises)) {
      return { ok: false, reason: 'unavailable' };
    }
    // Selecting a later lesson never marks predecessors done or grants a reward.
    // An unfinished previous lesson must be kept as a resume snapshot by the UI owner.
    const inProgress = state && state.inProgress;
    const hasPending = !!(inProgress && Array.isArray(inProgress.queue) &&
      Number.isInteger(inProgress.idx) && inProgress.idx >= 0 &&
      inProgress.idx < inProgress.queue.length);
    return {
      ok: true,
      lessonIndex: requestedIndex,
      needsResumePreservation: hasPending,
      previousResume: hasPending ? inProgress : null,
      action: hasPending ? 'save-snapshot-before-launch' : 'launch'
    };
  }
  return Object.freeze({ select });
});
