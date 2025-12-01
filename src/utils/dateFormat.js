export const dateAndTimeFormat = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day}${daySuffix(day)} ${month}, ${year} at ${time}`;
};

// Function to determine the day suffix (e.g., "st", "nd", "rd", "th")
const daySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
