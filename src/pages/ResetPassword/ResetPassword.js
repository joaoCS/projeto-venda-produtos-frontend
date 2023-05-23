import React, { useState } from "react";

import api from "../../config/api.js";

import "./resetPassword.css";

export default function ResetPassword() {
    
    const [email, setEmail] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await api.post("/auth/forgot-password", { email });

            alert(response.data.message);
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    
    return(
        <div className="resetPass">
            <h1>Redefinir senha</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" onChange={(event)=>setEmail(event.target.value)}/>
                <input type="submit" />
            </form>
        </div>
    );
}