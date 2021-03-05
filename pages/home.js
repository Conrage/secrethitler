import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
var def;

function Home(){
    
    const router = useRouter();
    const {auth, name, gameName} = useSelector((state) => state.user);
    console.log(auth + ", " + name + ", " + gameName)
    if(auth){
        return <div>
            {name}
            <div>{auth}</div>
            <div>{gameName}</div>
            </div>
            
    }else{
        router.push('/')
    }
    
}

export default Home;

