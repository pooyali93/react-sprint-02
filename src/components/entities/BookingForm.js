import React, { useState, useEffect } from 'react';
import API from "../api/API";
import FormItem from '../UI/Form';


const emptyBooking = {
    VehicleId:5,
    CustomerId: 66, 
    SalesId: 0,
    DateBooked:"2022-11-27T10:10:00",
}

export default function BookingForm({initialBooking=emptyBooking}){
    // Initialisation ---------

    // 109
    const isValid = { 
      VehicleId: (vid) =>  /^\d+$/.test(vid),
      CustomerId: (cid) => /^\d+$/.test(cid),
      SalesId: (sid) => (sid > 1 ) && (sid < 5 ),

    }

    const errorMessage = {
      VehicleId: "Vehicle id must be a number",
      CustomerId: "Customer id must be a number",
      SalesId: "Sales Id in valid"
    }
    // States ---------
    const [booking, setBooking] = useState(initialBooking);
    const [errors, setErrors] = useState(
      Object.keys(initialBooking).reduce((accum, key) => ({...accum, [key]: null}),{})
    );

    const [salePerson, setSalesPerson] = useState(null);
    const [loadSalesPersonMessage, setLoadSalesPersonMessage] = useState('Loading Bookings...');
      
    
    // Handler ---------  (56:00 )
    const handleChange = (event) => {
      const { name, value } = event.target;
      const newValue =  (name === 'VehicleId') || (name === 'CustomerId') || (name === 'SalesId') ? value : value ;
      setBooking({ ...booking, [name]: newValue});
      setErrors({...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]}); //118 :
    };

    const getSales = async () => {
      const response = await API.get('/bookings/sales');
      response.isSuccess
          ? setSalesPerson(response.result)
          : setLoadSalesPersonMessage(response.message)

  }
  useEffect(() => { getSales() }, []);



    // View ---------
  return (
    <form className='BorderedForm'>
      <FormItem 
        label ="Vehicle Id"
        htmlFor="VehicleId"
        advice="Please Enter Vehicle Id"
        error={errors.VehicleId}
      >
        <input 
            type="text" 
            name="VehicleId"
            value={booking.VehicleId}
            onChange={handleChange}
        />
      </FormItem>

      <FormItem 
        label ="Customer Id"
        htmlFor="CustomerId"
        advice="Please Enter Customer Id"
        error={errors.CustomerId}
      >
        <input 
            type="text" 
            name="CustomerId"
            value={booking.CustomerId}
            onChange={handleChange}
        />
      </FormItem>
      <FormItem 
        label ="Sales Id"
        htmlFor="SalesId"
        advice="Please Enter Sales Id"
        error={errors.SalesId}
        >
        {
          !salePerson
            ? <p>{loadSalesPersonMessage}</p>
            : salePerson.length === 0
              ? <p>No salesperson found</p>
              : <select 
                  name="SalesId"
                  value={booking.SalesId}
                  onChange={handleChange}
                  >
                  
                    <option value="0" disabled>None Selected</option>
                    
                    {
                      salePerson.map((sale) => <option key={sale.SalesId} value={sale.SalesId}>{sale.SalesId}
                      </option>)
                    }
                </select>
          }
        </FormItem>

        <FormItem 
        label ="Date of Booking"
        htmlFor="DateBooked"
        placeholder="Please Enter Date of booking"
        error="Wrong Date"
      >
        <input 
            type="datetime-local"
            name="DateBooked"
            value={booking.DateBooked}
            onChange={handleChange}
        />
      </FormItem>
    </form>
  )
}
