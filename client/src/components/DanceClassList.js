import React from "react";
import DanceClass from "./DanceClass";

function DanceClassList({ dance_classes, singleDanceClass }) {


    const dance_class_components = dance_classes.map(dance_class => <DanceClass key={dance_class.id} dance_class={dance_class} singleDanceClass={singleDanceClass} />);

    return (
        <div className='danceClass'>
            <h1> Dance Classes</h1>
            <main>
                <ul className='danceClassListings'>
                    {dance_class_components}
                </ul>
            </main>
        </div>
    )
}

export default DanceClassList;