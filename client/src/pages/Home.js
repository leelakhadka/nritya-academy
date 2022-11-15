import React from "react";
import Jazz2 from "../assets/images/jazz2.jpeg"


function Home() {
    return (
        <div className="main">
            <div className="overlay"></div>
            <img src={Jazz2} className='image' />
            <div className="content">
                <h1> Nritya Academy</h1>
            </div>
        </div>
    );
}

export default Home;