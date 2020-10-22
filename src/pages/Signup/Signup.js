import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, Redirect } from "react-router-dom";
import { firebase } from "./../../lib/firebase";

function Signup() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    const confirmPassword = formdata.confirmPassword || undefined;

    if (password !== confirmPassword) {
      setFormdata({
        ...formdata,
        error: "Password Don't match",
        isLoading: false,
      });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        setFormdata({
          ...formdata,
          error: "",
          redirect: true,
          isLoading: false,
        });

        console.log(user);
      })
      .catch(function (error) {
        setFormdata({ ...formdata, error: error.message, isLoading: false });
        console.error(error);
      });
  };

  if (formdata.redirect) {
    return <Redirect to="/"></Redirect>;
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
          <Link style={{ textDecoration: "none", color: "grey" }} to="/login">
            Login &rarr;
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.loginText}>
          <h3>Here you can Signup</h3>
          <h6>Let's join us :)</h6>
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
              required
              onChange={handleChange}
            />
            <label className={styles.label} for="password">
              Confirm Password
            </label>
            <input
              className={styles.input}
              placeholder="Yeah! type secrete again"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={formdata.confirmPassword}
              required
            />
            {formdata.error && (
              <div className={styles.error}>{formdata.error}</div>
            )}
            <button type="submit" className={styles.loginButton}>
              {formdata.isLoading ? (
                <div class={styles.ldsRing}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "SIGNUP"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
