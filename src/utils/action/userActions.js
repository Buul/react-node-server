import axios from "axios";

const URL = "http://localhost:7000";

export const getToken = () => {
  return dispatch => {
    const body = {
      email: "paulo@mail.com",
      password: "root"
    };
    axios
      .post(`${URL}/${"token"}`, body)
      .then(resp => dispatch({ type: "GET_TOKEN", payload: resp.data }));
  };
};

export default getToken;
