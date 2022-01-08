import "./register.css";
import {useState} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Register() { const [email, setEmail]= useState("");
const [password, setPassword]= useState("");
const navigate = useNavigate()

function handleEmail(e){
    setEmail(e.target.value)
}
function handlePassword(e){
    setPassword(e.target.value)
}

async function handleSubmit(e) {
    e.preventDefault()
    if (email === "" || password === "") {
        console.warn("Les champs ne doivent pas être vides")
        return null
    }

    let res;

    try {
        res = await axios.post("http://localhost:8080/api/user/login",
            {
                email,
                password
            })
    }catch (error) {
        throw error
    }
    console.log(res.data)

    window.localStorage.setItem("token", res.data.token)
    window.localStorage.setItem("userData", JSON.stringify(res.data))
    navigate("/")
}


return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Grouposocial</h3>
                <span className="loginDescription">Share more than work</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                   <input placeholder="Nom de famille" className="loginInput" onChange={handlePassword} value={password} />
                   <input placeholder="Prénom" className="loginInput" onChange={handlePassword} value={password} />
                    <input placeholder="Email" className="loginInput" onChange={handleEmail} value={email}/>
                    <input placeholder="Mot de passe" className="loginInput" onChange={handlePassword} value={password} />
                    

                      <button className="loginButton" type="submit"> <Link to='/login'> <span>Créer son compte</span> </Link> </button> 

                    
                </form>
            </div>
        </div>
    
    </div>
)
}