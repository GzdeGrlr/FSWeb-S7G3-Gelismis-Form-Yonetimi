import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("E-mail is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  terms: yup.mixed().oneOf([true], "You must accept the terms of service"),
});

function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [kayitliUyeler, setKayitliUyeler] = useState();

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const checkFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        // Hata yoksa buraya geliyordu
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // burada event.target.value dediğimizde state'a yazmıyor, yazıp unutuyor gibi.
    //const value =event.target.value
    //const name = event.target.name
    const valuetoUse = type === "checkbox" ? checked : value;

    checkFormErrors(name, valuetoUse);
    setForm({
      ...form,
      [name]: valuetoUse,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/api/user", form)
      .then((res) => {
        setKayitliUyeler(res.data.id);

        setForm({
          name: "",
          email: "",
          password: "",
          terms: "",
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div style={{ color: "red" }}>
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.terms}</div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#C8F4F9",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "5px 0",
        }}
      >
        <p>
          <label htmlFor="name">Name: </label> <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your mail"
            value={form.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="terms">Terms of Service </label>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
        </p>
        <p>
          <input type="submit" disabled={disabled} />
        </p>
      </form>
      <div>
        <h3>Kayıtlı Kullanıcı</h3>
        {kayitliUyeler && (
          <div
            style={{
              backgroundColor: "#FBE5C8",
              maxWidth: "600px",
              margin: "20px auto",
              padding: "5px 0",
            }}
          >
            <p> User is created : {kayitliUyeler}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;