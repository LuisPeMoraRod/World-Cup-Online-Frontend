import React, { useState } from "react";

const useMultiValue = (updateTournament, checkInput, field, currentItems) => {
  const [isTouched, setIsTouched] = useState(false); //state that indicates if input is touched

  const addItem = (item) => {
    updateTournament({ [field]: [...currentItems, item] });
  };

  const deleteItem = (deletedItems, items) => {
    const updatedItems = items.filter((item) => item !== deletedItems);
    updateTournament({ [field]: updatedItems });
  };

  /**
   * Updates state that indicates if input is touched
   * @param {*} event
   */
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const isValid = checkInput(currentItems);
  const hasError = !isValid && isTouched;
  const style = hasError ? "invalid-multi" : ""; //syling for error

  return {
    isValid,
    hasError,
    addItem,
    deleteItem,
    inputBlurHandler,
    style,
  };
};

export default useMultiValue;
