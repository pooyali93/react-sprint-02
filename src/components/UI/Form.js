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

function useForm(initialRecord, {isValid, errorMessage}, onSubmit,onCancel) {
  //  Initialisation --------------
  //  States ----------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(initialRecord).reduce((accum, key) => ({...accum, [key]: null}),{})
  );

  // Context ---------------------
  // Methods ---------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value ;
    console.log(newValue, "this is my new value")
    setRecord({ ...record, [name]: newValue});
    setErrors({...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]}); //118 :
  };

  const isValidRecord = (record) => {
    let isRecordValid = true;
    Object.keys(record).forEach((key) => {
      if(isValid[key](record[key])) {
        errors[key] = null;

      } else {
        errors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });
    return isRecordValid;
  }

  const handleSubmit = () => {
    isValidRecord(record) && onSubmit(record) && onCancel(); 
    setErrors({...errors});
  }
  // View ---------
return [record, errors, handleChange, handleSubmit];
}

//  Compose  Form Object --------
Form.Item = Item;
Form.useForm = useForm;