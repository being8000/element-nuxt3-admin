const MAX_MOBILE_WIDTH = 965;
type Device = "desktop" | "mobile";
type ThemeSize = "large" | "default" | "small";
export const useApp = () => {
  const opened = useCookie<boolean>("app-config-opened");
  const size = useCookie<ThemeSize>("app-config-size");
  const device = useCookie<Device>("app-config-device");

  const updateSize = (val: ThemeSize) => {
    useApp().size.value = val;
  };
  const updateDevice = (width: number) => {
    const { device, opened } = useApp();
    if (width > MAX_MOBILE_WIDTH) {
      device.value = "desktop";
      opened.value = true;
    } else {
      device.value = "mobile";
      opened.value = false;
    }
  };
  const updateOpened = (val: boolean) => {
    useApp().opened.value = val;
  };
  return {
    opened,
    size,
    device,
    updateSize,
    updateDevice,
    updateOpened,
  };
};
