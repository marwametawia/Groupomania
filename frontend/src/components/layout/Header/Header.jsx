import { Person, Notifications } from "@material-ui/icons";
import "./header.css";
import Logo from "../../../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";

import {useEffect} from "react";
import axios from "axios";


export default function Header() {
    const navigate= useNavigate();
    const userData = JSON.parse(window.localStorage.getItem("userData"))
    console.log(userData)

    /*useEffect(() => {
        async function getUserData() {
            let res;
            try {
                res = await axios.get(``)
            }catch(error){
                throw error
            }
        }
    }, [tokenW])*/

    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="logo groupomania"
                        className="headerLogo"
                    />
                </Link>
            </div>
            <div className="headerCenter">
                <span className="logoName">GroupoSocial</span>
            </div>
            <div className="headerRight">
                
                <div className="headerIcons">
                    <div className="iconItems">
                        <Person />
                        {userData && (
                            <div>
                                <span>{`${userData.firstName} ${userData.lastName}`}</span>
                                <button onClick={()=>{
                                    window.localStorage.removeItem("userData")
                                    window.localStorage.removeItem("token")
                                    navigate("/login")
                                }}>Disconnect</button>
                            </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}
