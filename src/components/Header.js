import React from "react";
import {Link} from "react-router-dom";
import "../css/Header.css";

function Header() {
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
                <div className="header-login">
                    <Link to={"/LogIn"} className="login-link">로그인</Link>
                </div>
                <div className="header-signup">
                    <Link to={"/SignUp"} className="signup-link">회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;