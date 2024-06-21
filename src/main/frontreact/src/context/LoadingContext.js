import React, { createContext, useContext, useState } from "react";
import '../main/main.css';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && (
        <div className="loading-container">
          
          <img src={process.env.PUBLIC_URL + '/imgs/loading4.gif'} alt="loading" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
