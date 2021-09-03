import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button style={{ position: "absolute", top: "22px", right: "20px", padding: "7px 9px", border: 'none', borderRadius: '5px' }} onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </button>
    );
};

export default LogoutButton;