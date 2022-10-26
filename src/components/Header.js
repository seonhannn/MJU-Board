import React, {useEffect, useState} from "react";
import {jwtUtils} from "../utils/jwtUtils";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {setToken} from "../redux/reducers/AuthReducer";
import "../css/Header.css";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if(jwtUtils.isAuth(token)) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [token]);
    const logout = async () => {
        await dispatch(setToken(""));
        alert("로그아웃 되었습니다.");
        navigate("/");
    }
    return (
        <div className="header">
            <div className="header-logo">
                <img src="https://www.mju.ac.kr/sites//mjukr/images/main/logo_wh.png" alt="logo"></img>
            </div>
            <div className="header-title">
                <Link to={"/"} className="header-link">
                    <h2>명지대학교 동아리 사이트</h2>
                </Link>
            </div>
            <div className="header-user">
                {isAuth ? (
                    <>
                        <div className="header-logout">
                            <Link to={"#"} className="logout">로그아웃</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="header-login">
                            <Link to={"/LogIn"} className="login-link">로그인</Link>
                        </div>
                        <div className="header-signup">
                            <Link to={"/SignUp"} className="signup-link">회원가입</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;