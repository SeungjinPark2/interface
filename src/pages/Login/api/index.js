import { HttpStatusCode } from "axios";
import { axioser } from "../../../axioser";

export const login = async (id, password, saveToken /* sessionStorage */) => {
  // 로그인 API 호출
  const { status, data } = await axioser().post("/api/auth/login", {
    username: id,
    password,
  });

  if (status == HttpStatusCode.Ok) {
    saveToken(data.token);
  } else {
    throw new Error("Login failed");
  }
};

export const signup = async (id, password, firstName, lastName) => {
  const { status } = await axioser().post("/api/auth/signup", {
    username: id,
    password,
    firstName,
    lastName,
  });

  if (status !== HttpStatusCode.Created) {
    throw new Error("Signup failed");
  }
};

export const logout = () => {
  window.sessionStorage.removeItem("token");
};
