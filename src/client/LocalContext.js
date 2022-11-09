import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});
export const UserProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxReservation, setMaxReservation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    console.log("rendreing");
    setIsLoading(true);
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMeals(data);
        } else {
          setError();
        }
      })
      .then(() => {
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <UserContext.Provider
      value={{
        meals,
        setMeals,
        isLoading,
        setIsLoading,
        isLoaded,
        setIsLoaded,
        error,
        setError,
        title,
        setTitle,
        description,
        setDescription,
        maxReservation,
        setMaxReservation,
        price,
        setPrice,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
