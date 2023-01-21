import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./common";
import { Navigate, Route, Routes } from "react-router-dom";
import { Profile } from "./features/profile/profile";
import { LoginPage } from "./features/login/login";
import { Register } from "./features/register/register";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { initializeProfileTC } from "../bll/reducers/auth-reducer";
import { CircularProgress } from "@mui/material";
import { Loading } from "./common";
import { ForgotPassPage } from "./features/forgotPassword/forgotPassword";
import { CheckEmail } from "./features/forgotPassword/checkEmail";
import { CreateNewPass } from "./features/forgotPassword/createNewPass";
import { ErrorAlert } from "./common";
import { PackList } from "./features/cards/PacksList";
import { PackPage } from "./features/cards/PacksPage";
import { PATH } from "../bll/Path";
import { PackPageEmpty } from "./features/cards/PacksPageEmpty";

export const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const status = useAppSelector((state) => state.app.appStatus);

  useEffect(() => {
    dispatch(initializeProfileTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorAlert />
      <Header />
      {status === "loading" && <Loading />}
      <Routes>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={"/"} element={<Navigate to={"/profile"} />} />
        <Route path={PATH.REG} element={<Register />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH["404"]} element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path={PATH.FORGOT} element={<ForgotPassPage />} />
        <Route path={PATH.CHECK_MAIL} element={<CheckEmail />} />
        <Route path={PATH.NEW_PASS} element={<CreateNewPass />} />
        <Route path={PATH.PACK_LIST} element={<PackList />} />
        <Route path={PATH.PACK_PAGE} element={<PackPage />} />
        <Route path={PATH.PACK_PAGE_EMPTY} element={<PackPageEmpty />} />
        <Route path={"*"} element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};
