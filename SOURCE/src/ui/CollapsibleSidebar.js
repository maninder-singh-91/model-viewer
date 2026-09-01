// The production sidebar drawer is injected by the V2.11 UI patch in index/HTML.
export function toggleSettingsDrawer(){ document.body.classList.toggle('v211-sidebar-hidden'); window.dispatchEvent(new Event('resize')); }
