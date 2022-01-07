import "./profile.css"
import Header from "../layout/Header/Header"

export default function Profile() {
    return (
        <> 
        <Header />
       <button className="logOut">Deconnexion</button>
       <button className="modifyProfile">Modifier mon profil</button>
       <button className="deleteAccount" onClick={()=>{
                                    window.localStorage.removeItem("userData")
                                    window.localStorage.removeItem("token")
                                    navigate("/login")
                                }}>Supprimer mon compte </button>
        </>
    )
}
