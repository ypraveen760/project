
export const LOGO_LINK="https://fintarget.in/assets/fintargetLogo-JCpOronY.png"
export const processKlineData = (kline) => ({
    time: kline.t / 1000,
    open: parseFloat(kline.o),
    high: parseFloat(kline.h),
    low: parseFloat(kline.l),
    close: parseFloat(kline.c),
  });
  