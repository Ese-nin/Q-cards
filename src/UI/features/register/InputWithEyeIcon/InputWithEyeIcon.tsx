import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type InputWithEyePropsType = {
  showPassword: boolean;
  handleClickShowPassword: () => void;
};

export const InputWithEyeIcon: React.FC<InputWithEyePropsType> = ({
  showPassword,
  handleClickShowPassword,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
