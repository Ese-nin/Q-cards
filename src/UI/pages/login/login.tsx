import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "bll/store";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

import { useFormik } from "formik";
import { loginTC, setHaveAccountAC } from "bll/reducers/auth-reducer";
import s from "../register/register.module.css";
import s2 from "../cards/tables/TablesPackList.module.css";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputWithEyeIcon } from "../register/InputWithEyeIcon/InputWithEyeIcon";
import { PATH } from "../../../bll/Path";
import { isLoggedInSelector } from "bll/selectors";

type LoginFormikErrorsType = {
  email?: string;
  password?: string;
};

const validate = (values: LoginFormikErrorsType) => {
  const errors: LoginFormikErrorsType = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 or more chars";
  }
  return errors;
};

export const LoginPage = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate,
    onSubmit: (values) => {
      const { email, password, rememberMe } = values;
      dispatch(loginTC(email, password, rememberMe));
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const haveAccountHandler = () => {
    dispatch(setHaveAccountAC(false));
    navigate(PATH.REG);
  };

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div className={s.regContainer}>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
        <h2 className={s.regFormTitle}>Sign in</h2>

        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl margin={"normal"}>
              <InputLabel>Email</InputLabel>
              <Input {...formik.getFieldProps("email")} />
            </FormControl>
            {formik.errors.email && formik.touched.email && (
              <div style={{ color: "crimson" }}>{formik.errors.email}</div>
            )}

            <FormControl margin={"normal"}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                endAdornment={
                  <InputWithEyeIcon
                    showPassword={showPassword}
                    handleClickShowPassword={handleClickShowPassword}
                  />
                }
              />
            </FormControl>
            {formik.errors.password && formik.touched.password && (
              <div style={{ color: "crimson" }}>{formik.errors.password}</div>
            )}

            <FormControlLabel
              label={"rememberMe"}
              control={<Checkbox {...formik.getFieldProps("rememberMe")} />}
            />
            <NavLink
              to="/forgot"
              style={{ display: "flex", justifyContent: "end", margin: "10px" }}
            >
              Forgot Password?
            </NavLink>
            <Button
              style={{ borderRadius: "30px", marginTop: "20px" }}
              type={"submit"}
              variant={"contained"}
              color={"primary"}
            >
              Sign In
            </Button>
          </FormGroup>
        </form>
      </FormControl>
      <div>
        <span>Don't have an account?</span>
      </div>
      <button className={s2.btnNamePagePack} onClick={haveAccountHandler}>
        Sign Up
      </button>
    </div>
  );
};
