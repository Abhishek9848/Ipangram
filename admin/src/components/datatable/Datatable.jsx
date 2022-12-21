import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from '../../hooks/useFetch'
import { Button } from "@mui/material";

const Datatable = ({data , col , title ,add}) => {
  console.log("data --" , data)
  // const [data, setData] = useState(userRows);
  

  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   {
  //     field: "user",
  //     headerName: "User",
  //     width: 230,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellWithImg">
  //           <img className="cellImg" src={params.row.profilePhoto} alt="avatar" />
  //           {params.row.username}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: "firstName",
  //     headerName: "First name",
  //     width: 230,
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Last name",
  //     width: 230,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     width: 230,
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           <Link to="/users/test" style={{ textDecoration: "none" }}>
  //             <div className="viewButton">View</div>
  //           </Link>
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleDelete(params.row._id)}
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ]
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {add && <Button variant='contained' onClick={add}>Add new</Button>}
  </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={col}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId = {row => row._id}
      />
    </div>
  );
};

export default Datatable;
