import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "./Group 753.png";
import { useAppSelector } from "bll/store";
import s from "./header.module.css";
import { NavLink } from "react-router-dom";
import { avatarSelector, isLoggedInSelector, nameSelector } from "bll/selectors";
import { PATH } from "bll/Path";
import { SuperButton } from "../c2-SuperButton/SuperButton";

export default function MenuAppBar() {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const Name = useAppSelector(nameSelector);
  const Avatar = useAppSelector(avatarSelector);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <img src={logo} alt="logo" />
          <div className={s.tempDiv}>
            <NavLink to={PATH.LOGIN} className={({ isActive }) => (isActive ? s.active : "")}>
              Login
            </NavLink>
            <NavLink to={PATH.REG} className={({ isActive }) => (isActive ? s.active : "")}>
              Register
            </NavLink>
            <NavLink to={PATH.FORGOT} className={({ isActive }) => (isActive ? s.active : "")}>
              ForgotPassPage
            </NavLink>
            <NavLink to={PATH.CHECK_MAIL} className={({ isActive }) => (isActive ? s.active : "")}>
              checkMail
            </NavLink>
            <NavLink to={PATH.NEW_PASS} className={({ isActive }) => (isActive ? s.active : "")}>
              CreateNewPass
            </NavLink>
            <NavLink to={PATH.PACK_LIST} className={({ isActive }) => (isActive ? s.active : "")}>
              packlist
            </NavLink>
            <NavLink to={PATH.PACK_PAGE} className={({ isActive }) => (isActive ? s.active : "")}>
              packPage
            </NavLink>
            <NavLink
              to={PATH.PACK_PAGE_EMPTY}
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Empty
            </NavLink>
          </div>

          {isLoggedIn && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <NavLink to={PATH.PROFILE} className={({ isActive }) => (isActive ? s.active : "")}>
                {Name}
              </NavLink>
              <img src={Avatar} alt="avatar" className={s.imgAvatar} />
            </span>
          )}
          {isLoggedIn || (
            <>
              <NavLink to={PATH.LOGIN}>
                <SuperButton>Sign in</SuperButton>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
