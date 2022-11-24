import logo from "./logo.svg";

import Layout from "./Layout/Layout";
import Route from "./Routes/Route";
import {useEffect} from "react";
import {useNavigate} from "react-router";
function App() {
    const navigate = useNavigate()
    // useEffect(()=>{
    //     navigate("/news");
    // },[])
  return (
    <div className="App">
     <Layout>
        <Route />
     </Layout>
    </div>
  );
}

export default App;
