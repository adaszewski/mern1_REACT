import axios from "axios";
import  './Events.css'



const Event = (props) => {
  const deleteEvent = (id) => {
    axios
      .event("http://localhost:3000/json", { _id: id })
      .then((req) => {
        props.setEvents((events) => {
          return events.filter((event) => event.id !== req.data.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
  
    <table>
        <tr>
            <th >imię</th>
            <th >nazwisko</th>
            <th >kurs</th>
            <th >lokalizacja</th>
            <th >zapisano</th>
            <th >zmodyfikowano</th>
            <th >opcje</th>
        </tr>
            <td>{props.imie}</td>
            <td>{props.nazwisko}</td>
            <td>{props.kurs}</td>
            <td>{props.lokalizacja}</td>
            <td >{props.zapisano}</td>
            <td>{props.zmodyfikowano}</td>
            <td> <button className="btn-del" onClick={() => deleteEvent(props.event.id)}> Usuń event </button> </td>

</table>

      
   
           
    
  );
};

export default Event;
