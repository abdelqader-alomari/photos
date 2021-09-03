import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button style={{ position: "absolute", top: "22px", right: "20px", padding: "7px 15px", border: 'none', borderRadius: '5px' }} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;