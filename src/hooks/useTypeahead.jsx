import React, { useState } from "react";

/**
 * Hook to handle validations for Typeahead components
 * @param {*} updateObject updates request values
 * @param {*} checkInput check if entered text is valid
 * @param {String} field input type
 * @param {String} defaultValue
 * @param {Object} dataset array of possible options
 */
const useTypeahead = (
  updateObject,
  checkInput,
  field,
  defaultValue,
  dataset
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false); //state that indicates if input is touched

  /**
   * Updates state on option selection
   * @param {event} event
   */
  const valueSelectedHandler = (event) => {
    if (event.length > 0) {
      updateObject({ [field]: event[0] });
      setEnteredValue(event[0]);
    }
  };

  /**
   * Updates state that indicates if input is touched
   * @param {*} event
   */
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const isValid =
    checkInput(enteredValue, dataset) || checkInput(defaultValue, dataset);
  const hasError = !isValid && isTouched;

  return {
    value: enteredValue,
    isValid,
    hasError,
    valueSelectedHandler,
    inputBlurHandler,
  };
};

export default useTypeahead;
