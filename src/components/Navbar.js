import React from "react";
import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header class="masthead mb-auto">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Rank Group</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/countries">Countries</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/cards">Cards</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Layout;