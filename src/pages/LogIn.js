import React from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/reducers/AuthReducer";
import "../css/LogIn.css";

function LogIn() {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다.")
      .required("이메일을 입력하세요."),
    password: Yup.string()
      .required("비밀번호를 입력하세요.")
  });

  const submit = async (values) => {
    const {email, password} = values;

    try {
      const {data} = await axios.post("http://52.78.83.72:8080/api/auth/signin", {
        email,
        password,
      });
      dispatch(setToken(data.jwt));
      const redirectUrl = searchParams.get("redirectUrl");
      toast.success("로그인 성공했습니다.");
      setTimeout(() => {
        if(redirectUrl) {
          navigate(redirectUrl);
        } else {
        navigate("/");
        }
      }, 2000);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="login">
          <ToastContainer></ToastContainer>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="login-user-form">
              <div className="login-title">로그인</div>
              <div className="login-input-form">
                <label htmlFor="email">이메일</label>
                <div className="login-input-container">
                    <input
                        className="login-input-area"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="이메일을 입력하세요.">
                    </input>
                </div>
              </div>
              <div className="login-input-form">
                <label htmlFor="password">비밀번호</label>
                <div className="login-input-container">
                    <input
                        type={"password"}
                        className="login-input-area"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요.">
                    </input>
                </div>
              </div>
              <input
                type="submit"
                value="로그인"
                className="login-submit-btn">
              </input>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default LogIn;
