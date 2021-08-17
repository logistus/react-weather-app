import React, { useContext } from "react";
import {ThemeContext} from "./Provider";
import Switch from "react-switch";
import { RiLightbulbFill, RiLightbulbLine } from "react-icons/all";

const ThemeSwitch = () => {
  const { setTheme, mode } = useContext(ThemeContext);
  return (
    <Switch
      checked={mode === "light" ? true : false}
      onChange={setTheme}
      className="switch"
      onColor="#3B48EB"
      checkedIcon={<RiLightbulbFill style={{ marginTop: '6px', marginLeft: '9px', color: 'yellow'}} />}
      uncheckedIcon={<RiLightbulbLine style={{ marginTop: '5px', marginLeft: '6px', color: 'white'}} />}
    />
  );
}

export default ThemeSwitch;