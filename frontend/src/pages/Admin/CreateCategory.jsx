import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "./../../components/Form/CategoryForm.jsx";
import { Button, Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [ name, setName ] = useState("");
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")

  // Form Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} category created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data?.message || "Failed to create category!");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong in input form"
      );
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something Went Wrong while getting category!"
      );
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatedName})
      if(data.success){
        toast.success(`${updatedName} category updated`)
        setSelected(null)
        setUpdatedName("")
        setOpen(false)
        getAllCategory()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  // Delete Category
  const handleDelete = async (pid) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pid}`)
      if(data.success){
        toast.success(`category deleted`)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }



  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick = {() => {setOpen(true) ; setUpdatedName(c.name) ; setSelected(c)}}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={() => {handleDelete(c._id)}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel = {() => setOpen(false)} footer={null} open={open}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
