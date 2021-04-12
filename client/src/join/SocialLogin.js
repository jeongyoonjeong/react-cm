import React from "react";

const SocialLogin = () => {
    return (
        <div>
            <h5>소셜 로그인</h5>
            <div className="social">
                <div className="icon-holder">
                    <i className="fab fa-google"></i>
                </div>
                <div className="icon-holder">
                    <i className="fab fa-facebook-square"></i>
                </div>
                <div className="icon-holder">
                    <i className="fab fa-twitter"></i>
                </div>
                <div className="icon-holder">
                    <i className="fab fa-github"></i>
                </div>
            </div>
        </div>
    );
}
export default SocialLogin;