import React, { useState, useEffect } from "react";

import TestService from "../services/test.service.js";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        TestService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                console.log(error)
                const _content =
                    (error.response && error.response.data && error.response.data.code) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Home;