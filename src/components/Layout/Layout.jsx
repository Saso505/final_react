/* eslint-disable */

import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Layout() {
  return (
    <div className={style.container}>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
