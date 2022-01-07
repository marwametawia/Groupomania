import Header from "../layout/Header/Header";
import Feed from "../Feed/Feed";

export default function Home ({token}){
    
    return (
        <>
            <Header />
            <Feed token={token}/>
        </>
    )
    
}