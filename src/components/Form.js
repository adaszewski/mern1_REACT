import React from "react";
import { useState } from "react";
import axios from "axios";

const AddEvent = (props) => {
  const [eventForm, setNewEvent] = useState({
    imie: "",
    nazwisko: "",
    kurs: "",
    lokalizacja: "",
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

    setNewEvent({
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
          imie: "Nazwa użytkownika powinna zawierać minimum 3 znaki",
        };
      });
    } else if (!/^[^\s]*$/.test(eventForm.imie.trim())) {
      validError.imie = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          imie: "Pole imię nie może być puste",
        };
      });
    } else {
      validError.imie = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, imie: "" };
      });
    }
    if (!/^[^\s]*$/.test(eventForm.nazwisko.trim())) {
      validError.nazwisko = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          nazwisko: "Pole nazwisko nie może być puste",
        };
      });
    } else {
      validError.nazwisko = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, nazwisko: "" };
      });
    }
    if (!/^[^\s]*$/.test(eventForm.kurs.trim())) {
      validError.kurs = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          kurs: "Musisz wybrać jeden z dostępmnych kursów",
        };
      });
    } else {
      validError.kurs = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, kurs: "" };
      });

      if (!/^[^\s]*$/.test(eventForm.lokalizacja.trim())) {
        validError.kurs = true;
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            lokalizacja: "Musisz wybrać jedną z dostępmnych lokalizacji",
          };
        });
      } else {
        validError.lokalizacja = false;
        setErrors((prevErrors) => {
          return { ...prevErrors, lokalizacja: "" };
        });
      }
    }
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
          setSignMessage(
            `Użytkownik ${eventForm.imie}" "${eventForm.nazwisko}  został zapisany na kurs`
          );
          console.log(reqData);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <div>
        <h2> Formularz zapisu kandydatów na szkolenie</h2>
        {signMessage}
        <form onSubmit={handleSubmitAddEvent}>
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
            <option> - wybierz lokalizację </option>
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
          >
            <option> - wybierz lokalizację </option>
            <option> Kraków </option>
            <option> Warszawa </option>
            <option> Wrocław </option>
            <option> Gdańsk </option>
          </select>
          <br />
          <button>Zapisz się na kurs</button>
          <br />
        </form>
        <p> !${errors.imie} </p>
        <br></br>
        <p> !${errors.nazwisko} </p> <br></br>
        <p> !${errors.kurs} </p>
        <br></br>
        <p> !${errors.lokalizacja} </p>
      </div>
    );
  };
};

export default AddEvent;
