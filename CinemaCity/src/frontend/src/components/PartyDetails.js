import {Link} from "react-router-dom";
import React from "react";

const PartyDetails=()=>
{
    return (
        <div>
            <header
                style={{
                    backgroundColor: "#283548",
                    color: "#fff",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h1 style={{ margin: 0 }}>CinemaHome</h1>
                <div>
                    <Link to="/">
                        <button
                            style={{
                                backgroundColor: "#D9D9D9",
                                border: "none",
                                color: "black",
                                padding: "15px 32px",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "16px",
                                margin: "4px 2px",
                                cursor: "pointer"
                            }}
                        >
                            Sign out
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
};
export default PartyDetails;