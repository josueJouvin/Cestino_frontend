import { useRef, useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = useRef(isDarkMode);

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) &&window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  function handleClick() {
    toggleDarkMode.current = !toggleDarkMode.current;
    toggleDarkMode.current
      ? (localStorage.theme = "dark")
      : (localStorage.theme = "light");

    if (toggleDarkMode.current) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setIsDarkMode(toggleDarkMode.current);
  }

  return {
    isDarkMode,
    handleClick,
  };
};

export default useDarkMode;