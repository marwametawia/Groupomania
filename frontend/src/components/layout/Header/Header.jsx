import { Person, Notifications } from "@material-ui/icons";
import "./header.css";
import Logo from "../../../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import {Toaster} from 'react-hot-toast';

import {useEffect, useState} from "react";
import axios from "axios";
import {useAuthenticatedUser} from '../../../hooks/useAuthenticatedUser';



export default function Header({firstName, lastName}) {

    const userData = useAuthenticatedUser();
    const navigate = useNavigate();
    return (
        <div className="headerContainer">
            <Toaster/>
            <div className="headerLeft">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="logo groupomania"
                        className="headerLogo"
                    />
                </Link>
            </div>

            <div className="headerRight">


                <div className="headerUserName">{`${userData.firstName} ${userData.lastName}`}</div>
                    <Link to="/profile"><Person />  </Link>
                        {userData && (



                                <button className="disconnectButton" onClick={()=>{

                                    window.localStorage.removeItem("userData")
                                    window.localStorage.removeItem("token")
                                   navigate("/login")
                                }}>Se deconnecter</button>


                    )}


            </div>
        </div>
    );
}
