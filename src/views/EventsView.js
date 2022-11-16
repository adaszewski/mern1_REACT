import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "../components/Form";

import Events from "../components/Events";

const EventsView = (props) => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState([]);

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
  }, []);

  return (
    <div className="home">
      <AddEvent eventId={eventId} setEventId={setEventId} />
      
      <Events
        events={events}
        setEvents={setEvents}
        key={events.id}
        eventId={eventId}
        setEventId={setEventId}
      />
    </div>
  );
};

export default EventsView;
