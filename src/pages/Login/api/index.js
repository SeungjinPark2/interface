import axios, { HttpStatusCode } from "axios";

export const login = async (id, password, saveToken /* useLocalStorage */) => {
  // 로그인 API 호출
  const { status, data } = await axios.post(
    "/api/login",
    { username: id, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (status == HttpStatusCode.Ok) {
    saveToken(data.token);
  } else {
    throw new Error("Login failed");
  }
};

export const signup = async (id, password) => {
  const response = await axios.post(
    "/api/signup",
    { username: id, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== HttpStatusCode.Created) {
    throw new Error("Signup failed");
  }
};

export const logout = () => {
  window.localStorage.removeItem("token");
};
