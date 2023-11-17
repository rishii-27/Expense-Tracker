import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="mt-5">
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
    </div>
  );
};

export default Welcome;
