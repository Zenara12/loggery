// Device type detection and class injection utility
export function getDeviceType() {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function setDeviceTypeClassOnRoot() {
  const type = getDeviceType();
  const root = document.getElementById('app');
  if (!root) return;
  root.classList.remove('device-mobile', 'device-tablet', 'device-desktop');
  root.classList.add(`device-${type}`);
}

export function setupDeviceTypeClassInjection() {
  setDeviceTypeClassOnRoot();
  window.addEventListener('resize', setDeviceTypeClassOnRoot);
}
