import React, { useState } from "react";

const StoreContext = React.createContext({});

export const StoreContextProvider = (props) => {
  const loggedInStatus = localStorage.getItem("token");
  const [token, setToken] = useState(!!loggedInStatus);

  const getIdToken = (receivedToken) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const contextValue = {
    loginStatus: token,
    getToken: getIdToken,
  };
  console.log(contextValue.loginStatus);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
