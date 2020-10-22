import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, Redirect } from "react-router-dom";
import { firebase } from "./../../lib/firebase";

function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    error: "",
    isLoading: false,
    redirect: false,
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormdata({ ...formdata, isLoading: true });

    const email = formdata.email || undefined;
    const password = formdata.password || undefined;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (user) {
        console.log(user);
        setFormdata({ ...formdata, redirect: true, isLoading: false });
      })
      .catch(function (error) {
        setFormdata({ ...formdata, isLoading: false, error: error.message });

        console.error(error);
      });
  };

  if (formdata.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.homeLink}>
          <Link style={{ textDecoration: "none", color: "grey" }} to="/">
            Dashboard
          </Link>
        </div>
        <div className={styles.signupLink}>
          <Link style={{ textDecoration: "none", color: "grey" }} to="/signup">
            Signup &rarr;
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.loginText}>
          <h3>Here you can Login</h3>
          <h6>Welcome Back👋</h6>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label} for="email">
              {" "}
              Email
            </label>
            <input
              className={styles.input}
              placeholder="Enter email"
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <label className={styles.label} for="password">
              Password
            </label>
            <input
              className={styles.input}
              placeholder="Shh! Enter password"
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
            {formdata.error && (
              <div className={styles.error}>{formdata.error}</div>
            )}
            <button className={styles.loginButton}>
              {formdata.isLoading ? (
                <div class={styles.ldsRing}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
