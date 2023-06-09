import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top  navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fw-bolder " to="#">HeadlineHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link  fw-bold" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="general">General</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="health">Health</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="science">Science</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="sports">Sports</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="technology">Technology</Link>
                        </li>

                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Action</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled">Disabled</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}