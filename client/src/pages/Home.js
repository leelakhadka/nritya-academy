import React from "react";
import Jazz2 from "../assets/images/jazz2.jpeg"
import Jazz from "../assets/images/jazz.webp"
import Salsa from "../assets/images/salsa2.jpeg"

function Home() {
    return (
        <div>
            <h1 className="container">Nritya Academy</h1>

            <div className="img-container">
                <img className="img-style" src={Jazz2} />
                <img className="img-style" src={Jazz} />
                <img className="img-style" src={Salsa} />
            </div>
        </div>
    );
}

export default Home;