/**
 * A wrapper for async Express route handlers to catch errors.
 * @param {function} fn - The asynchronous function to wrap.
 * @returns {function} A new function that handles errors.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { asyncHandler };
