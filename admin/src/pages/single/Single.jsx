import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

const Single = ({ user }) => {
  const [data, setData] = useState()
  useEffect(() => {
    const fetch = async () => {
      const headers = {};
      headers.authorization = `Bearer ${user?.token}`;
      const configOptions = {
        headers,
      };
      const res = await axios.get(`/v1/employee/${user?._id}`, configOptions)
      setData(res.data?.data)
    }
    fetch()
  }, [user])
  return (
    <div className="single">
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data ? data.profilePhoto : user?.profilePhoto}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{` ${user?.firstName} ${user?.lastName}`}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{data?.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Department:</span>
                  <span className="itemValue">
                   {data?.department?.departmentName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
