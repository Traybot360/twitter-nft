import { useState } from "react";
/**
 *
 * @param defaultValues the default values of the sliders/radios
 * @returns state variable and state setter
 */
const useOptions = (defaultValues: any) => {
  const [values, setValues] = useState(defaultValues);
  /**
   *
   * @param name is the name of the variable in state to change
   * @param value is the new value of the variable
   */
  const setOptions = (name: string, value: string): void => {
    setValues({ ...values, [name]: value });
  };

  return [values, setOptions];
};

export default useOptions;
