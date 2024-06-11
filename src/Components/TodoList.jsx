import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TodoList = () => {

    const current = new Date();
    const currentDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const [bgColor, setBgColor] = useState({
        backgroundColor: "",
        Textcolor: "",
        headingcolor: ""
    });
    const [getList, setGetList] = useState([])
    const [data, setData] = useState(
        {
            userid: "",
            name: "",
            task: "",
            date: "",
            status: "uncompleted"
        }
    )
    const [updateData, setUpdaTEData] = useState(
        {
            task: "",
            date: "",
            status: ""
        }
    )
    console.log(currentDate, "current date")

    const Datasubmit = () => {
        
        if (data.task == "" || data.date == "" ) {
            toast("Please fill all fields")
        }
        else {
            axios.post("http://localhost:3001/posts", data)
                .then((res) => {
                    console.log(res)
                    toast.success("Task Submited Successfully")
                    ShowList()
                    setData(
                        {
                            userid: 1,
                            task: "",
                            date: "",
                            status: "uncompleted"
                        }
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const ShowList = () => {
        axios.get("http://localhost:3001/posts")
            .then((res) => {
                console.log(res)
                localStorage.setItem("New", JSON.stringify(res.data))
                if (res.data == "" || res.data == null) {
                    toast("No Task is in To Do List ")
                    setGetList(res.data)
                }
                else {
                    setGetList(res.data)
                }

            })
            .catch((err) => {
                console.log(err, "error")
            })
    }
    const deleteItems = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(resp => {
                console.log(resp)
                toast("Task Delete")
                ShowList()
            })
            .catch(error => {
                console.log(error, "error")
            })

    }
    const updateitem = () => {
        axios.put(`http://localhost:3001/posts/${updateData.id}`, updateData)
            .then((resp) => {
                console.log(resp)
                toast("Data Update SUccessfully")
                ShowList()
            });
    }
    useEffect(() => {
        ShowList()
    }, [])
    return (
        <>
            <div style={{ backgroundColor: `${bgColor.backgroundColor}`, color: `${bgColor.Textcolor}` }}>
                <ToastContainer />
                <div className='Moon'>
                    <button onClick={() => setBgColor({ ...bgColor, backgroundColor: "black", Textcolor: "white", headingcolor: "black" })}><i className="fa-solid fa-moon"></i></button>
                    <button onClick={() => setBgColor({ ...bgColor, backgroundColor: "white", Textcolor: "Black" })}><i className="fa-solid fa-sun"></i></button>
                </div>
                <h3 className='Heading'>Todo-List</h3>
                <div className='Inputs-table'>
                    <div className="col-lg-4 inputs" style={{ color: `${bgColor.Textcolor}` }}>
                        <label htmlFor="exampleInputEmail1" className="form-label">Task:</label>
                        <textarea type="text" value={data.task} onChange={(e) => setData({ ...data, task: e.target.value })} className="form-control" required placeholder='Enter a task...'></textarea>
                    </div>
                    <div className="col-lg-4 inputs">
                        <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: `${bgColor.Textcolor}` }}>Date To DO:</label>
                        <input type="date" value={data.date} className="form-control" id="exampleInputPassword1" onChange={(e) => setData({ ...data, date: e.target.value })} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className='SubmitBtn mt-3' onClick={Datasubmit}>Submit</button>
                    </div>
                </div>
                <div>
                    <div className="table-container">
                        <div style={{ textAlign: "center" }}>
                            <h4> List of  Tasks</h4>
                        </div>
                        <table>
                            <thead style={{ textAlign: "center", color: `${bgColor.headingcolor}`, backgroundColor: `${bgColor.backgroundColor}` }}>
                                <tr >
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getList.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {items.id}</td>
                                                <td>{items.task}</td>
                                                <td>{items.date}</td>
                                                <td>{items.status}</td>
                                                <td style={{ textAlign: "center" }}> <button className='Deletebtn' onClick={() => deleteItems(items.id)}><i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>  <button className='Editbtn' data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                    onClick={() => setUpdaTEData({
                                                        task: items.task,
                                                        name: items.name,
                                                        date: items.date,
                                                        id: items.id,
                                                        status: items.status
                                                    })}
                                                >
                                                        <i className="fas fa-edit"></i> </button> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Modal */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Update User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="col-lg-12">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Task</label>
                                    <input type="text" value={updateData.task} onChange={(e) => setUpdaTEData({ ...updateData, task: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Date To DO</label>
                                    <input type="date" value={updateData.date} className="form-control" id="exampleInputPassword1" onChange={(e) => setUpdaTEData({ ...updateData, date: e.target.value })} />
                                </div> <br />
                                <div className="col-lg-12" style={{ border: "2px solid black" }}>
                                    <label htmlFor="exampleInputPassword1" className="form-label"> Current Status</label> <br />
                                    <label htmlFor="exampleInputPassword1" className="form-label">Completed</label>
                                    <input type="radio" value="completed" name="status" onChange={(e) => setUpdaTEData({ ...updateData, status: e.target.value })} /> <br />
                                    <label htmlFor="exampleInputPassword1" className="form-label">Rejected</label>
                                    <input type="radio" value="rejected" name="status" onChange={(e) => setUpdaTEData({ ...updateData, status: e.target.value })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className=" SubmitBtn btn btn-secondary addBtn" data-bs-dismiss="modal">Close</button>
                                <button type="button" className=" SubmitBtn btn btn-primary addBtn" data-bs-dismiss="modal" onClick={() => updateitem()}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList