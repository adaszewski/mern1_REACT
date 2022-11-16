import React from "react";
import { useState } from "react";
import axios from "axios";

const AddEvent = (props) => {
  const [eventForm, setEventForm] = useState({
    imie: props.eventId.imie,
    nazwisko: props.eventId.nazwisko,
    kurs: props.eventId.kurs,
    lokalizacja: props.eventId.lokalizacja,
  });

  const [errors, setErrors] = useState({
    imie: "",
    nazwisko: "",
    kurs: "",
    lokalizacja: "",
  });

  const [signMessage, setSignMessage] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setEventForm({
      ...eventForm,
      [name]: target.value,
    });
  };

  const validate = () => {
    let validError = {
      imie: false,
      nazwisko: false,
      kurs: false,
      lokalizacja: false,
    };
    if (eventForm.imie.trim().length < 3) {
      validError.imie = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          imie: "Pole imię powinno zawierać minimum 3 znaki",
        };
      });
    } else if (!/[a-zA-Z]+$/.test(eventForm.imie.trim())) {
      validError.imie = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          imie: "Pole imię może zawierać tylko litery",
        };
      });
    } else {
      validError.imie = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, imie: "" };
      });
    }

    if (eventForm.nazwisko.trim().length < 3) {
      validError.nazwisko = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          nazwisko: "Nazwisko powinna zawierać minimum 3 znaki",
        };
      });
    } else if (!/[a-zA-Z]+$/.test(eventForm.nazwisko.trim())) {
      validError.nazwisko = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          nazwisko: "Pole nazwisko może zawierać  jedynie litery",
        };
      });
    } else {
      validError.nazwisko = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, nazwisko: "" };
      });
    }

    if (!/[a-zA-Z]+$/.test(eventForm.kurs.trim())) {
      validError.kurs = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          kurs: "Musisz wybrać jeden z dostępnych kursów",
        };
      });
    } else {
      validError.kurs = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, kurs: "" };
      });
    }

    if (!/[a-zA-Z]+$/.test(eventForm.lokalizacja.trim())) {
      validError.lokalizacja = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          lokalizacja: "Musisz wybrać jedną z dostępnych lokalizacji",
        };
      });
    } else {
      validError.lokalizacja = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, lokalizacja: "" };
      });
    }

    return (
      !validError.imie &&
      !validError.nazwisko &&
      !validError.kurs &&
      !validError.lokalizacja
    );
  };

  const handleSubmitAddEvent = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    let newEvent = {
      imie: eventForm.imie,
      nazwisko: eventForm.nazwisko,
      kurs: eventForm.kurs,
      lokalizacja: eventForm.lokalizacja,
    };

    axios
      .post("http://localhost:5000/api/event/add", newEvent)
      .then((req) => {
        let reqData = req.data;
        setEventForm({
          imie: "",
          nazwisko: "",
          kurs: "",
          lokalizacja: "",
        });
        setSignMessage(
          `Użytkownik ${eventForm.imie} ${eventForm.nazwisko}  został zapisany na kurs`
        );
        console.log(reqData);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const modEvent = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    let modEvent = {
      imie: eventForm.imie,
      nazwisko: eventForm.nazwisko,
      kurs: eventForm.kurs,
      lokalizacja: eventForm.lokalizacja,
    };

    axios
      .put("http://localhost:5000/api/event/"+(props.eventId.id), modEvent)
      .then((req) => {
        let reqData = req.data;
        setEventForm({
          imie: "",
          nazwisko: "",
          kurs: "",
          lokalizacja: "",
        });
        setSignMessage(
          `Użytkownik ${eventForm.imie} ${eventForm.nazwisko}  został zapisany na kurs`
        );
        console.log(reqData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3> {signMessage} </h3>
      {props.eventId ? (
        <h2> Formularz zapisu kandydatów na szkolenie</h2>
      ) : (
        <h2> korekta</h2>
      )}
      <form onSubmit={handleSubmitAddEvent}>
        <label>imie</label>{" "}
        <input
          onChange={handleInputChange}
          id="imie"
          type="text"
          name="imie"
          placeholder="imię"
          // defaultValue={props.eventId.imie}
          defaultValue={props.eventId.imie}
        />
        <br />
        <label>nazwisko</label>{" "}
        <input
          onChange={handleInputChange}
          id="nazwisko"
          type="text"
          name="nazwisko"
          placeholder="nazwisko"
          defaultValue={props.eventId.nazwisko}
        />
        <br />
        <label> kurs </label>
        <select
          onChange={handleInputChange}
          id="kurs"
          type="text"
          name="kurs"
          placeholder="wybierz kurs"
          defaultValue={props.eventId.kurs}
        >
          <option> - wybierz kurs </option>
          <option value="HTML"> HTML </option>
          <option value="CSS"> CSS </option>
          <option value="JavaSript"> JavaScript </option>
          <option value="REACT"> REACT </option>
        </select>{" "}
        <br />
        <label> lokalizacja </label>
        <select
          onChange={handleInputChange}
          id="lokalizacja"
          type="text"
          name="lokalizacja"
          placeholder="wybierz lokalizację"
          defaultValue={props.eventId.lokalizacja}
        >
          <option> - wybierz lokalizację </option>
          <option> Kraków </option>
          <option> Warszawa </option>
          <option> Wrocław </option>
          <option> Gdańsk </option>
        </select>
        <br />
        <button>Zapisz się na kurs</button>
        <button onClick={() => modEvent(props.eventId.id)} >skoryguj kurs</button>
        <br />
      </form>
      <p> {errors.imie} </p>
      <p> {errors.nazwisko} </p>
      <p> {errors.kurs} </p>
      <p> {errors.lokalizacja} </p>
    </div>
  );
};

export default AddEvent;
