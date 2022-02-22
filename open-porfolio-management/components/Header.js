import React, { useEffect, useState } from "react";
import {
    signInGoogle,
    signOutGoogle,
    getGoogleUserName,
    GoogleCheck,
} from "./Firebase";

export const Header = () => {
    const isSignedIn = GoogleCheck();

    const handleAuthClick = () => {
        if (isSignedIn) {
            signOutGoogle();
        } else signInGoogle();
    };

    return (
        <div>
            <head>Hello</head>
            <button onClick={handleAuthClick}>
                {" "}
                {isSignedIn ? "Sign Out" : "Sign In"}
            </button>
            <span>{isSignedIn ? getGoogleUserName() : ""} </span>
        </div>
    );
};
