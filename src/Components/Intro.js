import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Intro.scss";
import FormInput from "./FormInput";
import { auth, db } from "../firebase";
import { login } from "../features/userSlice";

const Intro = () => {
  const dispatch = useDispatch();

  const [registerOpt, setRegisterOpt] = useState(false);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = useState({
    email: "",
    password: "",
    name: "",
    last_name: "",
    title: "",
    avatar: "",
  });

  const formLoginFields = [
    {
      name: "email",
      label: "Login(email):",
      type: "email",
      placeholder: "login@login.pl",
      pattern: null,
      required: true,
      errorMsg: "login powinnien posiadać formę adresu e-mail",
    },
    {
      name: "password",
      label: "Hasło:",
      type: "password",
      placeholder: "password",
      pattern: "[A-Za-z]{3,16}",
      required: true,
      errorMsg: "hasło powinno składać się z 3-16 liter",
    },
  ];

  const formRegisterFields = [
    {
      name: "email",
      label: "Login(email)*:",
      type: "email",
      placeholder: "login@login.pl",
      pattern: null,
      required: true,
      errorMsg: "login powinnien posiadać formę adresu e-mail",
    },
    {
      name: "password",
      label: "Hasło*:",
      type: "password",
      placeholder: "password",
      pattern: "[A-Za-z]{6,16}",
      required: true,
      errorMsg: "hasło powinno składać się z 6-16 liter",
    },
    {
      name: "name",
      label: "Imię*:",
      type: "text",
      placeholder: "Imię",
      pattern: "[A-Za-z]{3,16}",
      required: true,
      errorMsg: "imię powinno składać się z 3-16 liter",
    },
    {
      name: "last_name",
      label: "Nazwisko*:",
      type: "text",
      placeholder: "Nazwisko",
      pattern: "[A-Za-z]{3,16}",
      required: true,
      errorMsg: "nazwisko powinno składać się z 3-16 liter",
    },
    {
      name: "title",
      label: "Tytuł zawodowy:",
      type: "text",
      placeholder: "np. Master of Universe",
      pattern: "[A-Za-z]{2,40}",
      required: false,
      errorMsg: "tytuł powinnien się składać się z 2-40 liter",
    },
    {
      name: "avatar",
      label: "Zdjęcie profilowe(url):",
      type: "url",
      placeholder: "www.strona.pl/foto.jpg",
      pattern: "null",
      required: false,
      errorMsg: "imię powinno składać się z 3-16 liter",
    },
  ];

  //Login input update funcion
  const onLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  //Register input update funcion
  const onRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginValues);
    if (!registerOpt) {
      //send request to db and if correct dispatch user to store
      auth
        .signInWithEmailAndPassword(loginValues.email, loginValues.password)
        .then((userAuth) => {
          
          const userRef = db.collection("users").doc(userAuth.user.uid);

          userRef.get().then((doc) => {
            if (!doc.exists) return;
            console.log("Document data:", doc.data());
            dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: doc.data().name + " " + doc.data().last_name,
                  title: doc.data().title,
                  avatar: doc.data().avatar,
                })
              );
          });
        })
        .catch((error) => alert(error.message));

      console.log(login);
    } else {
      setRegisterOpt(false);
    }
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerOpt) {
      //send data to db and dispatch user to store
      auth
        .createUserWithEmailAndPassword(
          registerValues.email,
          registerValues.password
        )
        .then((userAuth) => {
          //not needed
          userAuth.user
            .updateProfile({
              name: registerValues.name,
              last_name: registerValues.last_name,
              title: registerValues.title,
              avatar: registerValues.avatar,
            })
            .then(() => {
              // create db record for user
              db.collection("users").doc(userAuth.user.uid).set({
                name: registerValues.name,
                last_name: registerValues.last_name,
                title: registerValues.title,
                avatar: registerValues.avatar,
              });
            })
            .then(() => {
              dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName:
                    registerValues.name + " " + registerValues.last_name,
                  title: registerValues.title,
                  avatar: registerValues.avatar,
                })
              );
            });
        })
        .catch((error) => alert(error.message));
      console.log("rejestruje");
    } else {
      setRegisterOpt(true);
    }
  };

  return (
    <div className="intro__container">
      <div className="intro__login-frame frame">
        <img src="./img/logo_f.png" />
        <h1>Witaj!</h1>
        <p>
          Aplikacja powstała jako klon LinkedIn przy użyciu JS, React z Reduxem
          oraz Firebase jako backend i autentykacja użytkownika.
        </p>
        <p>Miłego klikania!</p>
        <form onSubmit={(e) => onLoginSubmit(e)} className="intro__login-form">
          {!registerOpt ? (
            <>
              {formLoginFields.map((field, id) => (
                <FormInput
                  key={id}
                  {...field}
                  value={loginValues[field.name]}
                  onChange={onLoginChange}
                />
              ))}
              <p>Możesz użyć tych danych logowania:</p>
              <p>
                login: <i>login@login.com</i>
              </p>
              <p>
                hasło: <i>password</i>
              </p>
            </>
          ) : (
            ""
          )}
          <button type="submit">Zaloguj się</button>
        </form>
        {registerOpt ? (
          <>
            <p className="accent">lub</p>
            <form
              onSubmit={(e) => onRegisterSubmit(e)}
              className="intro__register-form"
            >
              <h2>Wprowadź dane nowego użytkownika:</h2>
              {formRegisterFields.map((field, id) => (
                <FormInput
                  key={id}
                  {...field}
                  value={registerValues[field.name]}
                  onChange={onRegisterChange}
                />
              ))}
              <button type="submit">Zarejestruj się</button>
            </form>
          </>
        ) : (
          <>
            <p className="accent">lub</p>
            <button
              onClick={() => {
                setRegisterOpt(true);
              }}
            >
              Zarejestruj się
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Intro;
