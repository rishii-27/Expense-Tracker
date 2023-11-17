import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const verifyEmailHandle = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBQGXF7XQ8qN-fY8qT8f7SuuJiwrIRZjsY`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const logoutHandle = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-end mb-2">
        <Link to="/logout" className="btn btn-dark" onClick={logoutHandle}>
          Logout
        </Link>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>Welcome to Expense Tracker</h4>
        </div>
        <div className="col-md-6 text-right">
          <span>
            Your profile is Incomplete <br />
            <Link to="/complete">Complete Now</Link>
          </span>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={verifyEmailHandle}
      >
        Verify Email
      </button>
    </div>
  );
};

export default Welcome;
