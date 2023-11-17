import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBQGXF7XQ8qN-fY8qT8f7SuuJiwrIRZjsY`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    )
      .then((res) => {
        res.json();
        if (res.ok) {
          setAlert(true);
        }
      })
      .then((data) => {
        console.log(data);
        setEmail("");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Forgot Password</h3>
            {alert && (
              <div className="alert alert-success" role="alert">
                Password link sent on your registered Email Id
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {alert ? (
                <button
                  type="button"
                  className="btn btn-primary btn-block mt-2"
                  disabled
                >
                  Send Link
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                >
                  Send Link
                </button>
              )}
            </form>
            <div className="text-center mt-3">
              <Link to="/">Remember your password? Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
