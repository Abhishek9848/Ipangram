import "./department.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {toast } from 'react-toastify'
import Datatable from "../../components/datatable/Datatable"
import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import EditDepartment from "./EditDepartment"
import AddDepartment from "./AddDepartment"

const Department = () => {
  const headers = {};
  const user = JSON.parse(localStorage.getItem("user"))
  headers.authorization = `Bearer ${user?.token}`;
  const configOptions = {
    headers,
  };
  const { data, error, loading,reFetch } = useFetch('/department')
  const handleDelete = async (id) => {
    const res = await axios.delete(`/v1/department/${id}`, configOptions)
    if(res.data.success){
      toast.success(res.data.message) 
      reFetch();
    }
  };
  const [editDepartment, setEditDepartment] = useState({
    action: false,
    values: null,
  });
  const [addDepartment, setAddDepartment] = useState(false);

  const handleOpenEditDepartment = (values) => {
    setEditDepartment({
      action: true,
      values,
    });
  };
  const handleOpenAddDepartment = () => {
    setAddDepartment(true);
  };

  const handleCloseEditDepartment = () => {
    setEditDepartment({
      action: false,
      values: null,
    });
    reFetch()
  };
  const handleCloseAddDepartment = () => {
    setAddDepartment(false);
    reFetch()
  };
  const columns = [
    
    {
      field: "departmentName",
      headerName: "Department name",
      width: 230,
    },
    {
      field: "categoryName",
      headerName: "Category name",
      width: 230,
      renderCell:(cell)=>{
        return (
          <div>
            {cell.row.categoryName == null ? "N/A" : cell.row.categoryName?.name }
          </div>
        )
      }
    },
    {
      field: "location",
      headerName: "Location",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <div className="viewButton" onClick={()=>handleOpenEditDepartment(params.row)}>Update</div>
            
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
        <Datatable data={data.data || []} col={columns} title={'Departments'} add={handleOpenAddDepartment} />
      </div>
      {
        editDepartment.action && (
          <EditDepartment open={editDepartment} handleClose={handleCloseEditDepartment} />
        )
      }
      {
        addDepartment && (
          <AddDepartment open={addDepartment} handleClose={handleCloseAddDepartment} />
        )
      }
    </div>
  )
}

export default Department