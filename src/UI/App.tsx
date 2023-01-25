import React, { useEffect } from "react";
import "./App.css";
import { ErrorAlert, Header, Loading } from "./common";
import { Navigate, Route, Routes } from "react-router-dom";
import { Profile } from "./pages/profile/profile";
import { LoginPage } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { useAppDispatch, useAppSelector } from "bll/store";
import { initializeProfileTC } from "bll/reducers/auth-reducer";
import { CircularProgress } from "@mui/material";
import { ForgotPassPage } from "./pages/forgotPassword/forgotPassword";
import { CheckEmail } from "./pages/forgotPassword/checkEmail";
import { CreateNewPass } from "./pages/forgotPassword/createNewPass";
import { PackList } from "./pages/cards/PacksList";
import { PackPage } from "./pages/cards/PacksPage";
import { PATH } from "bll/Path";
import { PackPageEmpty } from "./pages/cards/PacksPageEmpty";
import { appStatusSelector, isInitializedSelector } from "../bll/selectors";
import { Learn } from "./pages/learn/learn";

export const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(isInitializedSelector);
  const status = useAppSelector(appStatusSelector);

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
        <Route path={PATH.LEARN_PAGE} element={<Learn />} />
        <Route path={"*"} element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};
