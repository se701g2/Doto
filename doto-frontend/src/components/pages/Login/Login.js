import React from "react";
import "./Login.css";

const DotoTitle = () => {
    return (
        <div className="p-4" style={{ marginLeft: "7rem" }}>
            <span className="text-6xl font-bold font"> Doto </span>
        </div>
    );
};

const BlueBubble = () => {
    const url =
        process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://doto-backend.azurewebsites.net";
    return (
        <div className="h-full sm:mr-16 lg:mr-32" style={{ borderRadius: "0px 79px 0px 0px", backgroundColor: "#3700b3" }}>
            <div className="flex flex-col ml-32 mt-10">
                <div>
                    <span className="text-white font-bold text-5xl">Your life</span>
                </div>
                <div>
                    <span className="text-white text-5xl font-light mr-2">Planned for you</span>
                </div>
                <div className="google-btn-container mt-2">
                    <a href={url + "/auth/google"}>
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
    return <div className="md:w-1/3 md:mt-64" style={{ borderRadius: "79px 0px 0px 0px", backgroundColor: "#8d6cd9" }} />;
};

const Login = () => {
    return (
        <div className="flex flex-row bg-white w-full overflow-hidden max-h-screen">
            <div className="flex flex-col h-screen md:w-2/3 md:mt-32">
                <DotoTitle />
                <BlueBubble />
            </div>
            <PurpleBubble />
        </div>
    );
};

export default Login;
