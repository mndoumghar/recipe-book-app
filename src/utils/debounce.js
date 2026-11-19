/**
 * Debounce: waits until calls stop for `delay` ms before invoking `fn`,
 * with only the arguments of the final call. Each new call resets the timer.
 */

export function debounce(fn, delay = 1000) {
  let timerId;
  return  function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }

}
