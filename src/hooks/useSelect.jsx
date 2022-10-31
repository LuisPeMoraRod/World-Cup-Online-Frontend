import { useState } from "react";

/**
 * Hook to handle validations for Select components
 * @param {*} updateTournament updates request values
 * @param {*} checkInput check if entered text is valid
 * @param {String} field input type
 * @param {String} defaultValue
 * @returns
 */
const useSelect = (updateTournament, checkInput, field, defaultValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false); //state that indicates if input is touched

  /**
   * Updates state on option selection
   * @param {event} event
   */
  const valueSelectedHandler = (event) => {
    updateTournament({ [field]: event });
    setEnteredValue(event);
  };

  /**
   * Updates state that indicates if input is touched
   * @param {*} event
   */
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const isValid = checkInput(enteredValue) || checkInput(defaultValue);
  const hasError = !isValid && isTouched;

  return {
    value: enteredValue,
    isValid,
    hasError,
    valueSelectedHandler,
    inputBlurHandler,
  };
};

export default useSelect;
