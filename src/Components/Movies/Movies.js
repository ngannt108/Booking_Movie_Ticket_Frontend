import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "../MovieDetail/MovieDetail";
export default function Movies() {
  return (
    <>
      <Routes>
        <Route path="/:biDanh" element={<MovieDetail />}></Route>
      </Routes>
    </>
  );
}
