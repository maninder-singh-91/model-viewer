// V2.16 viewport render-scale hook.
// The production bundle reads window.__viewerResolutionScale inside its ResizeObserver.
export function setViewportResolutionScale(scale = 1) {
  window.__viewerResolutionScale = Math.max(0.5, Math.min(2, Number(scale) || 1));
  window.dispatchEvent(new Event('resize'));
}
