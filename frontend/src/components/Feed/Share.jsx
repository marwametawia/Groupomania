import "./share.css"
import {useState} from "react";
import axios from "axios";
export default function Share() {
    const [post, setPost]= useState("");

    function handleChange(e) {
        setPost(e.target.value)
    }

    async function handleSubmit (){
        //POST BASE_URL/
        // http://localhost:3000/api/post
        let res
        try {
            res = await axios.post("http://localhost:8080/api/post",{textContent : post})
        }catch(error){
            console.error(error)
            throw error
        }
        console.log(res)
    }

    return (
        <div className="share">
            <div className="shareContainer">
                
                    <input placeholder="Quoi de neuf ?" className="shareInput" value={post} onChange={handleChange}/>
                    <button className="shareButton" >Partager</button>

            
            </div>

        </div>
    )
}
