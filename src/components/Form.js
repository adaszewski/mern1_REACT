import React from "react";
import { useState } from "react";
import axios from "axios";



const AddEvent = (props) => {
  const [event, setEvent] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    setEvent(target.value);
  };

  const handleSubmitAddEvent = (e) => {
    e.preventDefault();
    let eventNew = {
      imie: "imie",
      nazwisko: "nazwisko",
      kurs: "kurs",
      lokalizacja: "lokalizacja",
    };
    if (!event) {
      return;
    }

    axios
      .post("http://localhost:3000/add:", JSON.stringify(eventNew))
      .then((req) => {
        let reqData = req.data;
        console.log(reqData);
        props.getPrevEvents();
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmitAddEvent}>
      <h2> Formularz zapisu kandydatów na szkolenie</h2>
      <label>imie</label>{" "}
      <input
        onChange={handleInputChange}
        id="imie"
        type="text"
        name="imie"
        placeholder="imię"
      />
      <br />
      <label>nazwisko</label>{" "}
      <input
        onChange={handleInputChange}
        id="nazwisko"
        type="text"
        name="nazwisko"
        placeholder="nazwisko"
      />
      <br />
      <label> kurs </label>
      <select
        onChange={handleInputChange}
        id="kurs"
        type="text"
        name="kurs"
        placeholder="wybierz kurs"
      >
        <option> HTML </option>
        <option> CSS </option>
        <option> JavaScript </option>
        <option> REACT </option>
      </select> <br />
      <label> lokalizacja </label>
      <select
        onChange={handleInputChange}
        id="lokalizacja"
        type="text"
        name="lokalizacja"
        placeholder="wybierz lokalizację"
      >
        <option> Kraków </option>
        <option> Warszawa </option>
        <option> Wrocław </option>
        <option> Gdańsk </option>
      </select><br />
      <button>Zapisz się na kurs</button>
      <br />
    </form>
  );
};

export default AddEvent;
