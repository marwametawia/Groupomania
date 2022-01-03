import { Person, Notifications } from "@material-ui/icons";
import "./header.css";
import Logo from "../../../assets/icon.png";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link to="/">
                    <img
                        src="<Logo/>"
                        alt="logo groupomania"
                        className="headerLogo"
                    ></img>
                </Link>
            </div>
            <div className="headerCenter">
                <span className="logoName">GroupoSocial</span>
            </div>
            <div className="headerRight">
                <span className="headerLink">Homepage</span>
                <div className="headerIcons">
                    <div className="iconItems">
                        <Person />
                    </div>
                </div>
            </div>
        </div>
    );
}
