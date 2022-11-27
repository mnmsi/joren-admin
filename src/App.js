import Layout from "./Layout/Layout";
import Route from "./Routes/Route";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router";
function App() {
    const [isAuth,setAuth] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("joren_token") ?? null
        if(token){
            setAuth(true)
            navigate("/")
        }else{
            setAuth(false)
            navigate("/login")
        }
    },[])
  return (
    <div className="App">
     <Layout>
        <Route auth={isAuth} />
     </Layout>
    </div>
  );
}

export default App;
