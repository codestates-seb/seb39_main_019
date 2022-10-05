import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ authenticated, component: Component }) {
  return <>{authenticated ? Component : alert("로그인 후 사용가능합니다!")}</>;
}

export default PrivateRoute;
