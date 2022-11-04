import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "../components/Form";
import Event from "../components/Events";



const Events = (props) => {
    const [events, setevents] = useState([])


    const getEvents = () => {
        axios.post("http://localhost:3000/json")
            .then((req) => {
                setevents(req.data);
                console.log(req.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }

      useEffect(() => {
        getEvents()
    }, 
    );

   
    return (


        <div className="home">
            {<AddEvent />} 
            {<Event />}
            
            <div className="eventsList">
                {events.map((events) => {
                        return <Event event={events} setevents={setevents} key={events.id}/>;
                })}

            </div>
        </div >
    )
}
export default Events; 