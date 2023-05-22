import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Rejected = () => {
  const [rejected, setRejected] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/posts")
            .then((resp) => {
                setRejected(resp.data)
            })
            .catch((error) => {
                console.log(error, "error")
            })
    }, [])
  return (
    <>
     <div className="table-container">
                <div style={{ textAlign: "center" }}>
                    <h4>Rejected Tasks</h4>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rejected.filter((item) => item.status == "rejected").map(items => {
                                return (
                                    <tr key={items.id}>
                                        <td> {items.id}</td>
                                        <td>{items.task}</td>
                                        <td>{items.date}</td>
                                        <td>{items.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    </>
  )
}

export default Rejected