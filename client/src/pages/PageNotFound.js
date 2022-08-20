import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="page-not-found">
            <h1>Page Not Found :/</h1>
            <h3>
                <Link to="/"> Go to the Home Page </Link>
            </h3>
        </div>
    );
}

export default PageNotFound;