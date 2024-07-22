/**
 * Converts a timestamp into a human-readable relative time string.
 *
 * @param {number} timestamp - The timestamp in milliseconds.
 * @returns {string} - The relative time string (e.g., "52 sec", "1 min", "2 hr", "1 d", "2 weeks", "1 month", "1 year").
 */
export const timeAgo = (timestamp?: number): string => {
  if (!timestamp) {
    return "";
  }

  const now = Date.now();
  const elapsed = now - timestamp;

  const units = [
    { max: 60 * 60 * 1000, value: 60 * 1000, label: "min" },
    { max: 24 * 60 * 60 * 1000, value: 60 * 60 * 1000, label: "hr" },
    { max: 7 * 24 * 60 * 60 * 1000, value: 24 * 60 * 60 * 1000, label: "d" },
    {
      max: 4 * 7 * 24 * 60 * 60 * 1000,
      value: 7 * 24 * 60 * 60 * 1000,
      label: "week",
    },
    {
      max: 12 * 4 * 7 * 24 * 60 * 60 * 1000,
      value: 4 * 7 * 24 * 60 * 60 * 1000,
      label: "month",
    },
    { max: Infinity, value: 12 * 4 * 7 * 24 * 60 * 60 * 1000, label: "year" },
  ];

  for (const unit of units) {
    if (elapsed < unit.max) {
      const value = Math.floor(elapsed / unit.value);
      return `${value} ${unit.label}${value > 1 ? "s" : ""}`;
    }
  }

  return "";
};

/**
 * Creates a fake delay for a given duration.
 * 
 * @param ms - The duration of the delay in milliseconds.
 * @returns A promise that resolves after the specified duration.
 */
export const fakeDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
