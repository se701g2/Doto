import React from "react";
import "./Login.css";

const DotoTitle = () => {
    return (
        <div className="ml-48 p-4">
            <span className="text-6xl font-bold font"> Doto </span>
        </div>
    );
};

const BlueBubble = () => {
    return (
        <div className="h-full mr-16" style={{ borderRadius: "0px 79px 0px 0px", backgroundColor: "#3700b3" }}>
            <div className="flex flex-col ml-32 mt-10">
                <div>
                    <span className="text-white font-bold text-5xl">Your life</span>
                </div>
                <div>
                    <span className="text-white text-5xl font-light">Planned for you</span>
                </div>
                <div className="google-btn-container">
                    <a href="/auth/google">
                        <div className="google-btn">
                            <div className="google-icon-wrapper">
                                <img
                                    className="google-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    alt="signin"
                                />
                            </div>
                            <p className="btn-text">
                                <b>Log in with Google</b>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

const PurpleBubble = () => {
    return <div className="w-1/3 mt-64" style={{ borderRadius: "79px 0px 0px 0px", backgroundColor: "#8d6cd9" }} />;
};

const Login = () => {
    return (
        <div className="flex flex-row bg-white w-full overflow-hidden">
            <div className="flex flex-col h-screen w-2/3 mt-32">
                <DotoTitle />
                <BlueBubble />
            </div>
            <PurpleBubble />
        </div>
    );
};

export default Login;
