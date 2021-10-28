/**
 * Debounces a function
 * @param {Function} func - the function you want to be debounced
 * @param {Number} timeout - the time that shall pass before the function is called
 * @returns the debounced function
 */
export const debounce = (func, timeout = 250) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => func(), timeout);
  };
};

/**
 * Makes a simple hash for a string
 * @param {String} s - the string you want to hash
 * @returns a 32-bit number
 * @credits https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0#gistcomment-2694461
 */
export const superSimpleHash = (s) => {
  let h;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};
