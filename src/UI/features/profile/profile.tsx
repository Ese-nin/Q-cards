import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "bll/store";
import { Navigate, useNavigate } from "react-router-dom";
import avatar from "./Ellipse 45.png";
import s from "./profile.module.css";
import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { logoutTC, setNewNameTC } from "bll/reducers/auth-reducer";
import { EditableSpan } from "UI/common";
import { PATH } from "bll/Path";
import { emailSelector, isLoggedInSelector, nameSelector } from "bll/selectors";
import back from "../../../assets/icon/back.svg";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const Name = useAppSelector(nameSelector);
  const Email = useAppSelector(emailSelector);
  const navigate = useNavigate();

  const LogOutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  const changeName = useCallback(
    (name: string) => {
      dispatch(setNewNameTC(name));
    },
    [Name]
  );

  const BackToPackList = () => {
    navigate(PATH.PACK_LIST);
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <div className={s.backBlock} onClick={BackToPackList}>
        <img src={back} alt="back" />
        <span>Back to Packs List</span>
      </div>
      <div className={s.profileBlock}>
        <span className={s.personalInfo}>Personal Information</span>
        <img src={avatar} alt="avatar" className={s.imgAvatar} />
        <div>
          <EditableSpan value={Name} onChange={changeName} />
        </div>
        <span className={s.mailText}>{Email}</span>
        <Button variant="outlined" startIcon={<Logout />} onClick={LogOutHandler}>
          Log out
        </Button>
      </div>
    </>
  );
};
