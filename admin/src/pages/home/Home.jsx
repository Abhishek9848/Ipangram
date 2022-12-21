import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useEffect,useState } from "react";
import Single from "../single/Single";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null)
  }, [])
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Single user ={user}/>
      </div>
    </div>
  );
};

export default Home;
