import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "../components/Form";
import Events from "../components/Events";

const EventsView = (props) => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios
      .get("http://localhost:5000/api/event/all")
      .then((req) => {
        setEvents(req.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getEvents();
  });

  return (
    <div className="home">
      {<AddEvent />}
      <Events events={events} setEvents={setEvents} key={events.id} />;
    </div>
  );
};
export default EventsView;
