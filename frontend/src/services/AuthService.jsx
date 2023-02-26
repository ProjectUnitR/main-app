import jwt_decode from "jwt-decode";
import axios from "../config/axios";

export const UserLogin = async (username, password) => {
  try {
    const loginResponse = await axios.post(
      "/user/login",
      JSON.stringify({
        username: username,
        password: password
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (loginResponse) {
      if (loginResponse.data.success === true) {
        const decoded = jwt_decode(loginResponse.data.token);
        return { success: true, token: loginResponse.data.token, role: decoded["role"], class: decoded["class"] != null ? decoded["class"] : null };
      } else {
        return { success: false, message: loginResponse.data.message };
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    return { success: false, message: err.message };
  }
};
