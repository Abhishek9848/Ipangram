import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [user, setUser] = useState()
  console.log("sidebar user--", user)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null)
  }, [])
  const navigate = useNavigate()
  const handleClick = async () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Ipangram</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>

          <p className="title">LISTS</p>
          {user?.role === "manager" &&
            <>
              <Link to="/employee" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Employees</span>
                </li>
              </Link>
              <Link to="/departments" style={{ textDecoration: "none" }}>
                <li>
                <AccountTreeIcon className="icon" />
                  <span>Departments</span>
                </li>
              </Link>
              <Link to="/category" style={{ textDecoration: "none" }}>
                <li>
                <CategoryIcon className="icon" />
                  <span>Category</span>
                </li>
              </Link>
            </>
          }

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleClick}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
