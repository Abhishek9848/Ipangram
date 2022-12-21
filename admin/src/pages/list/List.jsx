import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import Assign from "./Assign"

const List = () => {
  const headers = {};
  const [assignDepartmnet, setAssignDepartmnet] = useState({
    action: false,
    values: null,
  });
  const user = JSON.parse(localStorage.getItem("user"))
  headers.authorization = `Bearer ${user?.token}`;
  const configOptions = {
    headers,
  };
  const { data, error, loading, reFetch } = useFetch('/employee')
  const handleDelete = async (id) => {
    const res = await axios.delete(`/v1/employee/${id}`, configOptions)
    if (res.data.success) {
      toast.success(res.data.message)
      reFetch();
    }else{
      toast.error(res.data.message)
    }
  };
  const handleOpenAssignDepartment = (values) => {
    setAssignDepartmnet({
      action: true,
      values,
    });
  };
  const handleCloseAssignDepartment = (values) => {
    setAssignDepartmnet({
      action: false,
      values:null,
    });
    reFetch()
  };

  const columns = [
    {
      field: "user",
      headerName: "Profile",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.profilePhoto} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
      renderCell:(params) =>{
        return(
          <div>{params.row.department?.departmentName ? params.row.department?.departmentName : "N/A"}</div>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleOpenAssignDepartment(params.row)}>Assign Department</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ]

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable data={data.data || []} col={columns} title={'Employees'}/>
      </div>
      {
        assignDepartmnet.action && (
          <Assign open={assignDepartmnet} handleClose={handleCloseAssignDepartment} />
        )
      }
    </div>
  )
}

export default List