import "./category.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { toast } from 'react-toastify'
import Datatable from "../../components/datatable/Datatable"
import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import EditCategory from "./EditCategory"
import AddCategory from "./AddCategory"

const Category = () => {
  const headers = {};
  const user = JSON.parse(localStorage.getItem("user"))
  headers.authorization = `Bearer ${user?.token}`;
  const configOptions = {
    headers,
  };
  const { data, error, loading, reFetch } = useFetch('/category')
  const handleDelete = async (id) => {
    const res = await axios.delete(`/v1/category/${id}`, configOptions)
    if (res.data.success) {
      toast.success(res.data.message)
      reFetch();
    }
  };
  const [editCategories, setEditCategories] = useState({
    action: false,
    values: null,
  });
  const [addCategories, setAddCategories] = useState(false);

  const handleOpenEditCategories = (values) => {
    setEditCategories({
      action: true,
      values,
    });
  };
  const handleOpenAddCategories = () => {
    setAddCategories(true);
  };

  const handleCloseEditCategories = () => {
    setEditCategories({
      action: false,
      values: null,
    });
    reFetch()
  };
  const handleCloseAddCategories = () => {
    setAddCategories(false);
    reFetch()
  };
  const columns = [

    {
      field: "name",
      headerName: "Category name",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleOpenEditCategories(params.row)}>Update</div>
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
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <Datatable data={data.data || []} col={columns} title={'Categories'} add={handleOpenAddCategories} />
      </div>
      {
        editCategories.action && (
          <EditCategory open={editCategories} handleClose={handleCloseEditCategories} />
        )
      }
      {
        addCategories && (
          <AddCategory open={addCategories} handleClose={handleCloseAddCategories} />
        )
      }
    </div>
  )
}

export default Category