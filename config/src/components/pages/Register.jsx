import "./register.css";
import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const navigate = useNavigate();

    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    function handleFirstName(e) {
        setFirstName(e.target.value);
    }
    function handleLastName(e) {
        setLastName(e.target.value);
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (email === "" || password === "" || lastName === "" || firstName === "") {
            console.warn("Les champs ne doivent pas être vides");
            return null;
        }

        let res;

        try {
            res = await axios.post("http://localhost:8080/api/user/signup", {
                firstName,
                lastName,
                email,
                password,

            });
        } catch (error) {
            throw error;
        }
        console.log(res.data);

        toast.success("Account successfully created !");


        navigate("/login");
    }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Grouposocial</h3>
                    <span className="logoDescription">
                        Share more than work
                    </span>
                </div>
                <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                <input placeholder="nom de famille" className="loginInput" onChange={handleLastName} value={lastName}/>
                <input placeholder="prénom" className="loginInput" onChange={handleFirstName} value={firstName}/>
                        <input placeholder="Email" className="loginInput" onChange={handleEmail} value={email}/>
                        <input type={'password'} placeholder="Mot de passe" className="loginInput" onChange={handlePassword} value={password} />
                        <button className="loginButton" type="submit">Créer son compte</button>


                    </form>
                </div>
            </div>
        </div>
    );
}
