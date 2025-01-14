import React from "react";

import ASwitch from "../framework/components/ASwitch";
import {useATheme} from "../framework/components/ATheme";

const ThemeSwitcher = () => {
  const {currentTheme, setCurrentTheme} = useATheme();

  return (
    <ASwitch
      checked={currentTheme === "dusk"}
      className="flex-grow-1"
      onClick={() =>
        setCurrentTheme(currentTheme === "dusk" ? "default" : "dusk")
      }>
      Dusk Theme
    </ASwitch>
  );
};

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;
