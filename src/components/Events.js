import axios from "axios";
import "./Events.css";

import Moment from "react-moment";
import "moment-timezone";

const Events = (props) => {
  const handleDelete = (id) => {
 
    axios
      .delete("http://localhost:5000/api/event/del/"+id)
      .then((req) => {
        let reqData = req.data;
        console.log(reqData);
      })

  //     .catch((error) => {
  //       console.error(error);
  //     });
   }; 

  return (
    <table>
      <thead>
        <tr>
          <th>imię</th>
          <th>nazwisko</th>
          <th>kurs</th>
          <th>lokalizacja</th>
          <th>zapisano</th>
          <th>zmodyfikowano</th>
          <th>opcje</th>
        </tr>
      </thead>
      <tbody>
        {props.events.map((event) => {
          return (
            <tr key={event._id}>
              <td>{event.imie}</td>
              <td>{event.nazwisko}</td>
              <td>{event.kurs}</td>
              <td>{event.lokalizacja}</td>
              <td>
                <Moment
                  parse="YYYY-MM-DD-T-hh:mm:ss.0100"
                  format="YYYY-MM-DD HH:mm"
                  utc
                  local
                >
                  {event.zapisano}{" "}
                </Moment>
              </td>

              <td>
               { event.zmodyfikowano? <Moment
                  parse="YYYY-MM-DD-T-hh:mm:ss.oooo"
                  format="YYYY-MM-DD HH:mm"
                  utc
                  local
                >
                  {event.zmodyfikowano}
                </Moment>:"-" } 
              </td>
              <td>
                <button name="submit" onClick=  { () => handleDelete(event._id) } > usuń </button>
                <button name="submit" onClick={handleDelete} > modyfikuj </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Events;
