import { useState } from 'react';
import './Form.scss'
import Button from './Button';


export default function Form({ children, onSubmit, onCancel }) {
  // Initialisation ------------------------------
  // Hooks ---------------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Handlers ------------------------------------
  const handleSubmit = () => onSubmit();
  const handleCancel = () => onCancel();
  return(
    <form className='BorderedForm'>
      <div className='FormTray'>
        {
          children
        }
      </div>

      <div  className="button">
          <Button color='rgb(58, 110, 165)' text='Submit' onClick={handleSubmit}></Button>
          <Button color='rgb(209, 69, 50)' text='Cancel' onClick={handleCancel}></Button>
      </div>
      
    </form>
  )
}

function Item({children, label, htmlFor, advice,error}) {
    // Properties ---------
    // States ---------
    // Context ---------
    // Methods ---------
    // View ---------
  return (
    <div className="FormItem">
        <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
        {
          advice && <p className="FormAdvice">{advice}</p>
        }
        {
          children
        }
        {
          error && <p className="FormError">{error}</p>
        }
    </div>
  );
}

function useForm(initialRecord, {isValid, errorMessage}) {
  // Properties ---------
  // States ---------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(initialRecord).reduce((accum, key) => ({...accum, [key]: null}),{})
  );
  // Context ---------
  // Methods ---------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value ;
    setErrors({ ...record, [name]: newValue});
    setErrors({...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]}); //118 :
  };
  // View ---------
return [record, errors, setErrors, handleChange];
}



//  Compose  Form Object --------
Form.Item = Item;
Form.useForm = useForm;