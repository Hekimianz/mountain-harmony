import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/Register.module.css";
import registration from "../assets/registration.png";

function Register({ isLogged }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);

  useEffect(() => {
    if (isLogged) {
      navigate("/profile");
    }
  }, [isLogged, navigate]);

  function validateForm() {
    if (password === confirmedPass) {
      return true;
    }
    return false;
  }
  async function submitForm() {
    try {
      const response = await fetch(
        "https://mountain-harmony-api.onrender.com/user/register",
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            username: username,
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Registered Successfully");
        localStorage.setItem("sessionId", data.sessionId);
        navigate("/profile");
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmedPass("");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id={styles.registerMainCont}>
      <div id={styles.registerInnerCont}>
        <h1 id={styles.registerTitle}>Register</h1>
        <img src={registration} alt="tea shop" id={styles.registerImg} />
        <p id={styles.registerText}>
          Register now to embark on a delightful journey through the world of
          exquisite teas and exclusive offers.
        </p>
        <form
          name="register"
          id={styles.registerForm}
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              submitForm();
            } else {
              setPasswordErr(true);
              console.log("Passwords do not match");
            }
          }}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={passwordErr ? styles.invalidInput : null}
            />
          </div>
          <div className={styles.confPass}>
            <label htmlFor="passwordConf">Confirm Password</label>
            <input
              id="passwordConf"
              name="passwordConf"
              type="password"
              placeholder="confirm password"
              value={confirmedPass}
              onChange={(e) => {
                setConfirmedPass(e.target.value);
              }}
              className={passwordErr ? styles.invalidInput : null}
            />
          </div>
          {passwordErr ? (
            <div className={styles.inputErrCont}>
              <p className={styles.inputErr}>Passwords do not match!</p>
            </div>
          ) : null}
          <div className={styles.btnCont}>
            <input type="submit" value="Register" className={styles.btn} />
          </div>
        </form>
        <p className={styles.signIn}>
          Already have an account? <Link to="/sign-in">Sign in here!</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
