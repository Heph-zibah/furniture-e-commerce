/**
 * Format a date string or Date object to "DD MMM YYYY" format (e.g., "14 Oct 2022")
 * @param {string|Date} dateInput - Date string or Date object to format
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date input:", dateInput);
    return "";
  }

  // Array of month names abbreviated
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Format a date to relative time (e.g., "2 days ago", "1 month ago")
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Relative time string
 */
export function getRelativeTime(dateInput) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date input:", dateInput);
    return "";
  }

  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Get current date in "DD MMM YYYY" format
 * @returns {string} Current date formatted
 */
export function getCurrentDate() {
  return formatDate(new Date());
}
