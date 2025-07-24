import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemePreference = "light" | "dark" | "system";

type ThemeContextType = {
  theme: "light" | "dark";
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_PREFERENCE_KEY = "themePreference";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const deviceTheme = useDeviceColorScheme();

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem(
          THEME_PREFERENCE_KEY
        );
        if (
          savedPreference === "light" ||
          savedPreference === "dark" ||
          savedPreference === "system"
        ) {
          setThemePreference(savedPreference);
        }
      } catch (error) {
        console.error("Failed to load theme preference", error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  const updateThemePreference = async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
      setThemePreference(preference);
    } catch (error) {
      console.error("Failed to save theme preference", error);
    }
  };

  // Determine the actual theme to use
  const theme =
    themePreference === "system" ? deviceTheme || "light" : themePreference;

  const isDarkMode = theme === "dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themePreference,
        setThemePreference: updateThemePreference,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
