import "./profile.css";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { MainLayout } from "../layout/MainLayout";
import { useJWT } from "../../hooks/useJWT";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
useAuthenticatedUser;

export default function Profile() {
    const navigate = useNavigate();
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userIdToRemove, setUserIdToRemove] = useState("");
    const [userId, setUserId] = useState("");
    const token = useJWT();
    const isAdmin = useAuthenticatedUser().isAdmin;
    //const userData = JSON.parse(window.localStorage.getItem("userData"))

    useEffect(() => {
        async function getProfile() {
            let res;
            try {
                res = await axios.get(
                    `http://localhost:8080/api/user/${userData.userId}/`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                throw error;
            }
            console.log(res);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setUserId(res.data.id);
            console.log(firstName);
            console.log(lastName);
            console.log(userId);
        }

        if (!token || token === "") {
            navigate("/login");
        } else {
            getProfile();
        }
    }, [token]);
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    function handleUserIdToRemove(e) {
        setUserIdToRemove(e.target.value);
    }
    async function deleteAccount(id) {
        let res;
        try {
            res = await axios.delete(`http://localhost:8080/api/user/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            throw error;
        }
        toast.success("Account successfully deleted !");

        {
            !isAdmin ? navigate("/register") : null;
        }
    }
    async function changePassword(id, password) {
        let res;
        const validePassword =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        if (!validePassword.test(password)) {
            toast.error(
                "Le mot de passe doit contenir au minimum 8 caractères dont au moins : 1 miniscule 1 majuscule 1chiffre 1caractère spécial   "
            );
            return;
        }
        else {
        try {
            res = await axios.put(
                `http://localhost:8080/api/user/${id}`,
                {
                    password: password,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            throw error;
        }
        toast.success("You can use your new password!");
        window.localStorage.removeItem("userData");
        window.localStorage.removeItem("token");
        navigate("/login");
    }}

    return (
        <MainLayout>
            <div className="content">
            <input
                placeholder="changer mon mot de passe"
                className="changePassword"
                onChange={handlePassword}
                value={password}
            />
            <button
                className="profileButton"
                onClick={() => {
                    changePassword(userId, password);
                   
                }}
            >
                nouveau mot de passe
            </button>
            <button
                className="profileButton"
                onClick={() => {
                    deleteAccount(userId);
                    window.localStorage.removeItem("userData");
                    window.localStorage.removeItem("token");
                    navigate("/login");
                }}
            >
                Supprimer mon compte{" "}
            </button>
            {isAdmin ? (
                <div>
                    <input
                        placeholder="entrer l'ID de l'user à supprimer"
                        className="userToRemove"
                        onChange={handleUserIdToRemove}
                        value={userIdToRemove}
                    />
                    <button
                        className="profileButton"
                        onClick={() => {
                            deleteAccount(userIdToRemove);
                        }}
                    >
                        supprimer le compte d'un utilisateur{" "}
                    </button>
                </div>
            ) : null}
            </div>
        </MainLayout>
    );
}
