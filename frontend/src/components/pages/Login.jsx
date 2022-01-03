import "./login.css"

export default function Login() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Grouposocial</h3>
                    <span className="loginDescription">Share more than work</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Mot de passe" className="loginInput" />
                        <button className="loginButton">Se connecter</button>
                        <span className="forgotPasswaord">Mot de passe oublié?</span>
                        <button className="createAccount">Créer un compte</button>

                    </div>
                </div>
            </div>
        
        </div>
    )
}
