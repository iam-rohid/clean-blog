import { createContext, useContext, useEffect, useState } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window) {
      setDarkMode(localStorage.getItem("theme") === "dark");
    }
  }, [typeof window]);

  useEffect(() => {
    if (typeof window) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      if (darkMode) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      }
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw "ThemeProvider is not added to the root";
  }
  return context;
};
