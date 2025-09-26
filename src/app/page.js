"use client";

import { useEffect, useState } from "react";
import { Footer, Header } from "../../components/HomePage";
import { HeroSection } from "../../components/HomePage";
import MiddlePage from "../../components/HomePage/MiddlePage";
import AdvancedAnalytics from "../../components/HomePage/AdvancedAnalytics";

export default function Home() {
  const [isDarkMode, setisDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saveMode = localStorage.getItem("darkMode");
      let systemPerfersdark = false;

      try {
        systemPerfersdark = window.macthMedia(
          "(prefers-coler-schema: dark)"
        ).macthes;
      } catch (error) {
        systemPerfersdark = false;
      }

      const shouldUserDarkMode = saveMode === "false" ? false : true;

      setisDarkMode(shouldUserDarkMode);

      if (shouldUserDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error initializing theme:", error);
      setisDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  });

  const toggoleDarkMode = () =>{
    const newMode = !isDarkMode;
    applyTheme(newMode);
    setisDarkMode(newMode);

    try {
      localStorage.setItem("darkMode", newMode.toString());
    } catch (error) {
      console.error("Error saving theme preference", error);
      
    }
  }

  const applyTheme = (dark) => {
    if (typeof document === "undefined") return;

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"
      } transition-colors duration-300`}
    >
      <Header isDarkMode={isDarkMode} toggoleDarkMode={toggoleDarkMode} />
      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <MiddlePage isDarkMode={isDarkMode}/>
        <AdvancedAnalytics isDarkMode={isDarkMode}/>
        <Footer isDarkMode={isDarkMode}/>
      </main>
    </div>
  );
}
