import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/SignIn.module.css";
function SignIn({ isLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      navigate("/profile");
    }
  });
  async function submitForm() {
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Logged in Successfully");
        localStorage.setItem("sessionId", data.sessionId);
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id={styles.signMainCont}>
      <div id={styles.signInnerCont}>
        <h1 id={styles.signTitle}>Sign In</h1>
        <form
          id={styles.signForm}
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.btn}
            type="button"
            onClick={submitForm}
            value="Sign In"
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
