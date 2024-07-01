import { createContext } from "react";

export const ThemeContext = createContext({
  // Set the default theme and setter.
  appTheme: "light",
  setTheme: null,
});
