import React from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import "../css/SignUp.css";

function SignUp() {

    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다.")
            .required("이메일을 입력하세요."),
        username: Yup.string()
            .min(2, "이름은 최소 2글자 이상입니다.")
            .max(10, "이름은 최대 10글자 입니다.")
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                "이름에 특수문자가 포함되거나 숫자로 시작하면 안됩니다."
            )
            .required("이름을 입력하세요!"),
        password: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다.")
            .max(16, "비밀번호는 최대 16자리입니다.")
            .required("패스워드를 입력하세요.")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 특수문자를 모두 포함해야 합니다."
            ),
        password2: Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
            .required("필수 입력 값입니다."),
    });

    const submit = async (values) => {
        const {email, username, password} = values;
        try {
            await axios.post("/api/auth/signup", {
                email,
                username,
                password,
            });
            toast.success("회원가입이 완료되었습니다. 로그인하세요.");
            setTimeout(() => {
                navigate("/LogIn");
            }, 2000);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    };

    return (
        <Formik
            initialValues={{
                email: "",
                username: "",
                password: "",
                password2: "",
            }}
            validationSchema = {validationSchema}
            onSubmit = {submit}
            validateOnMount = {true}>
            {({values, handleSubmit, handleChange, errors}) => (
                <div className="signup">
                    <ToastContainer></ToastContainer>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="signup-user-form">
                            <div className="signup-title">
                                회원가입
                            </div>
                            <div className="signup-input-form">
                                <label htmlFor="email">이메일</label>
                                <div className="signup-input-container">
                                    <input
                                        className="signup-input-area"
                                        value={values.email}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="이메일을 입력하세요.">
                                    </input>
                                </div>
                            </div>
                                {/* <div className="error-message">
                                    {errors.email}
                                </div> */}
                            <div className="signup-input-form">
                                <label htmlFor="username">이름</label>
                                <div className="signup-input-container">
                                    <input
                                        className="signup-input-area"
                                        value={values.username}
                                        name="username"
                                        onChange={handleChange}
                                        placeholder="이름을 입력하세요.">
                                    </input>
                                </div>
                            </div>
                                {/* <div className="error-message">
                                    {errors.username}
                                </div> */}
                            <div className="signup-input-form">
                                <label htmlFor="password">비밀번호</label>
                                <div className="signup-input-container">
                                    <input
                                        type={"password"}
                                        className="signup-input-area"
                                        value={values.password}
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="비밀번호를 입력하세요.">
                                    </input>
                                </div>
                            </div>
                                {/* <div className="error-message">
                                    {errors.password}
                                </div> */}
                            <div className="signup-input-form">
                                <label htmlFor="password2">비밀번호 확인</label>
                                <div className="signup-input-container">
                                    <input
                                        type={"password"}
                                        className="signup-input-area"
                                        value={values.password2}
                                        name="password2"
                                        onChange={handleChange}
                                        placeholder="비밀번호를 한번 더 입력하세요.">
                                    </input>
                                </div>
                            </div>
                                {/* <div className="error-message">
                                    {errors.password2}
                                </div> */}
                            <input
                                type="submit"
                                value="회원가입"
                                className="signup-submit-btn">
                            </input>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default SignUp;