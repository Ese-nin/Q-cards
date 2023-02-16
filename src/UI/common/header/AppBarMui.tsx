import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "./Group 753.png";
import defaultAvatar from "UI/pages/profile/Ellipse 45.png";
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
          {isLoggedIn && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <NavLink to={PATH.PROFILE} className={({ isActive }) => (isActive ? s.active : "")}>
                {Name}
              </NavLink>
              <img src={Avatar ? Avatar : defaultAvatar} alt="avatar" className={s.imgAvatar} />
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
