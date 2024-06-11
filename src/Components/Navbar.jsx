import React from 'react'
import logo from '../Images/logo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img className='logo' src={logo} alt="imgs" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/Home">Home<span className="sr-only">(current)</span></Link>
                            {/* <Link to="/Aboutus">About us</Link> */}
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/Completed">Completed-Tasks<span className="sr-only">(current)</span></Link>
                            {/* <Link to="/Aboutus">About us</Link> */}
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/Uncompleted">Uncompleted<span className="sr-only">(current)</span></Link>
                            {/* <Link to="/Aboutus">About us</Link> */}
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/Rejected">Rejected-Tasks<span className="sr-only">(current)</span></Link>
                            {/* <Link to="/Aboutus">About us</Link> */}
                        </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
