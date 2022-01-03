import "./register.css";

export default function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Grouposocial</h3>
                    <span className="loginDescription">
                        Share more than work
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Nom de famille" className="registerInput" />
                        <input placeholder="Prénom" className="registerInput" />
                        <input placeholder="Email" className="registerInput" />
                        <input placeholder="Mot de passe" className="loginInput" />
                        

                        <button className="signUp">Créer son compte</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
