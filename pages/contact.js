import React from "react";
import styles from "../styles/contact.module.css";
import { useState } from "react";

const Contact = (props) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, desc);
    const data = { name, email, phone, desc };

    fetch("http://localhost:3000/api/postcontact/", {
      method: "POST", //or PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Succsess:", data);
        alert("thanks for contacting us");
        setname("");
        setemail("");
        setphone("");
        setdesc("");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  const handleChange = (e) => {
    // console.log(e, "change");
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "desc") {
      setdesc(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className={styles.input}
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={styles.input}
            id="email"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            className={styles.input}
            id="phone"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <textarea
            className={styles.input}
            name="desc"
            value={desc}
            onChange={handleChange}
            id="desc"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
