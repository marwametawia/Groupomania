import "./register.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
        const regexMail =
            /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        const lettersOnly = /^[a-zA-Z]+$/i;
        const validePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        e.preventDefault();
        if (
            email === "" ||
            password === "" ||
            lastName === "" ||
            firstName === ""
        ) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }
        if (!regexMail.test(email)) {
            toast.error("Veuillez entrer une adresse mail valide");
            return;
        }
        if (!lettersOnly.test(firstName)) {
            toast.error("Veuillez entrer un prénom valide");
            return;
        }
        if (!lettersOnly.test(lastName)) {
            toast.error("Veuillez entrer un nom valide");
            return;
        }
        if (!validePassword.test(password)) {
            toast.error("Le mot de passe doit contenir au minimum 8 caractères dont au moins : 1 miniscule 1 majuscule 1chiffre 1caractère spécial   ");
            return;
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
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input
                            placeholder="nom de famille"
                            className="loginInput"
                            onChange={handleLastName}
                            value={lastName}
                        />
                        <input
                            placeholder="prénom"
                            className="loginInput"
                            onChange={handleFirstName}
                            value={firstName}
                        />
                        <input
                            placeholder="Email"
                            className="loginInput"
                            onChange={handleEmail}
                            value={email}
                        />
                        <input
                            type={"password"}
                            placeholder="Mot de passe"
                            className="loginInput"
                            onChange={handlePassword}
                            value={password}
                        />
                        <button className="loginButton" type="submit">
                            Créer son compte
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
