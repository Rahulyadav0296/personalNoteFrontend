export const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "low":
      return "#28a745"; // Green for low priority
    case "medium":
      return "black"; // Yellow for medium priority
    case "high":
      return "#dc3545"; // Red for high priority
    default:
      return "#000"; // Default color (black) if priority is unknown
  }
};

// Optionally, you can also add a background color for better contrast
export const getPriorityBackgroundColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "low":
      return "#d4edda"; // Light green background for low priority
    case "medium":
      return "#fff3cd"; // Light yellow background for medium priority
    case "high":
      return "#f8d7da"; // Light red background for high priority
    default:
      return "#f8f9fa"; // Default light background
  }
};
