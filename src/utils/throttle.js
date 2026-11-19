export function throttle(fn, limit = 2000) {
  let isThrottled = false;

  return function (...args) {
    if (isThrottled) return;

    fn.apply(this, args);
    
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, limit);
  };
}