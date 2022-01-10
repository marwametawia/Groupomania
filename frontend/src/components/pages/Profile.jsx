import "./profile.css"
import Header from "../layout/Header/Header"
import { Person, Notifications } from "@material-ui/icons";


import { Link, useNavigate } from "react-router-dom";

import {useEffect, useState} from "react";
import axios from "axios";

export default function Profile() {

    const navigate= useNavigate();
    const userData = JSON.parse(window.localStorage.getItem("userData"))
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userId, setUserId] = useState("")
    const tokenW = window.localStorage.getItem("token");
    //const userData = JSON.parse(window.localStorage.getItem("userData"))
   

    useEffect(() => {
        async function getProfile() {
            let res;
            try {
                res = await axios.get(`http://localhost:8080/api/user/${userData.userId}/`, {
                    headers: {
                        authorization: `Bearer ${tokenW}`,
                    },
                });
            } catch (error) {
                throw error;
            }
            console.log(res)
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setUserId(res.data.id)
            console.log(firstName)
            console.log(lastName)
            console.log(userId)
        }

        if (!tokenW || tokenW === "") {
            navigate("/login");
        } else {
            getProfile();
        }
    }, [tokenW]);


    async function deleteAccount(id) {
        let res
        try {
            res = await axios.delete(
                `http://localhost:8080/api/user/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${tokenW}`,
                    },
                }
            );
        } catch (error) {
            throw error;
        }
    }

    return (
        <> 
        <Header firstName = {firstName}  lastName={lastName} />
       
       <button className="modifyProfile">Modifier mon mot de passe</button>
       <button className="deleteAccount" onClick={()=>{
                                    deleteAccount(userId)
                                    window.localStorage.removeItem("userData")
                                    window.localStorage.removeItem("token")
                                    navigate("/login")
                                }}>Supprimer mon compte </button>
        </>
    )
}
