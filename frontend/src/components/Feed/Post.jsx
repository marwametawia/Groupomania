import "./post.css"

export default function Post({textContent}) {
    return (
        <div className="post">
           <div className="postContainer">
               <div className="postTop">
                   <div className="postTopLeft">
                       <img className="postProfileImg"></img>
                       <span className="postUserName"></span>
                       <span className="postDate"></span>
                   </div>
               </div>
               <div className="postCenter">

                    <span className="postText">{textContent}</span>
               </div>
               <div className="postBottom">
                   <span className="postCommentsNumber"></span>
               </div>
           </div>
        </div>
    )
}
