const tintColorLight = '#6A5ACD'; // Primary purple
const tintColorDark = '#9D8FFF';

export default {
  light: {
    primary: '#6A5ACD', // Primary purple
    primaryLight: '#E7E5F8', // Light purple for backgrounds
    secondary: '#20B2AA', // Teal
    secondaryLight: '#E2F5F4', // Light teal
    accent: '#FF69B4', // Pink
    accentLight: '#FFE6F2', // Light pink
    success: '#4CAF50', // Green
    warning: '#FFC107', // Amber
    error: '#F44336', // Red
    background: '#FFFFFF', // White
    card: '#F8F9FA', // Very light gray
    text: '#333333', // Dark gray
    textDim: '#737373', // Medium gray
    border: '#E0E0E0', // Light gray
    tint: tintColorLight,
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#9D8FFF', // Lighter purple for dark mode
    primaryLight: '#3A3459', // Dark purple
    secondary: '#4EBEAE', // Lighter teal for dark mode
    secondaryLight: '#24454B', // Dark teal
    accent: '#FF8DC7', // Lighter pink for dark mode
    accentLight: '#4A2E3E', // Dark pink
    success: '#66BB6A', // Lighter green for dark mode
    warning: '#FFCA28', // Lighter amber for dark mode
    error: '#EF5350', // Lighter red for dark mode
    background: '#121212', // Very dark gray
    card: '#1E1E1E', // Dark gray
    text: '#EEEEEE', // Off-white
    textDim: '#AAAAAA', // Light gray
    border: '#333333', // Medium gray
    tint: tintColorDark,
    tabIconDefault: '#444444',
    tabIconSelected: tintColorDark,
  },
};