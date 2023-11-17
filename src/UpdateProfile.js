import React, { useEffect, useState } from "react";

const UpdateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log("Full Name:", fullName);
    console.log("Profile Photo URL:", profilePhotoUrl);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBQGXF7XQ8qN-fY8qT8f7SuuJiwrIRZjsY`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: fullName,
          photoUrl: profilePhotoUrl,
          deleteAttribute: ["DISPLAY_NAME"],
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    // Set formSubmitted to true after form submission
    setFormSubmitted(true);
  };

  useEffect(() => {
    // Fetch data only when the form is submitted
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBQGXF7XQ8qN-fY8qT8f7SuuJiwrIRZjsY`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    // Reset formSubmitted to false after fetching data
    setFormSubmitted(false);
  }, [formSubmitted]);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePhotoUrl">Profile Photo URL:</label>
          <input
            type="url"
            className="form-control"
            id="profilePhotoUrl"
            value={profilePhotoUrl}
            onChange={(e) => setProfilePhotoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
