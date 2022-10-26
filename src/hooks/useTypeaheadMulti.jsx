import { useState } from "react";

/**
 * Hook to handle validations for Multi-Typeahead components
 * @param {*} updateObject updates request values
 * @param {*} checkInput check if entered text is valid
 * @param {String} field input type
 * @param {String} defaultValues
 */
const useTypeaheadMulti = (updateObject, checkInput, field, defaultValues) => {
  const [enteredValues, setEnteredValues] = useState("");
  const [isTouched, setIsTouched] = useState(false); //state that indicates if input is touched

  /**
   * Updates state on option selection
   * @param {event} event
   */
  const valueSelectedHandler = (event) => {
    const items = event.map((item) => {
      return { id: item.id, label: item.label };
    });
    updateObject({ [field]: items });
    setEnteredValues(items);
  };

  /**
   * Updates state that indicates if input is touched
   * @param {*} event
   */
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const isValid = checkInput(enteredValues) || checkInput(defaultValues);
  const hasError = !isValid && isTouched;

  return {
    values: enteredValues,
    isValid,
    hasError,
    valueSelectedHandler,
    inputBlurHandler,
  };
};

export default useTypeaheadMulti;
