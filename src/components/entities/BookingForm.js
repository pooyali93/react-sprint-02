import React, { useState, useEffect } from 'react';
 import API from "../api/API";
import FormItem from '../UI/Form';
import Button from "../UI/Button";

const emptyBooking = {
    VehicleId:1,
    CustomerId: 1, 
    SalesId: 1,
}

export default function BookingForm({onDismiss,onSubmit, initialBooking=emptyBooking}){
    // Initialisation ---------

    // 109
    const isValid = { 
      VehicleId: (vid) =>  /^\d+$/.test(vid),
      CustomerId: (cid) => /^\d+$/.test(cid),
      SalesId: (sid) => (sid > 0 ) && (sid < 5 ),
      // DateBooked: (date) => /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/.test(date)

    }

    const errorMessage = {
      VehicleId: "Vehicle id must be a number",
      CustomerId: "Customer id must be a number",
      SalesId: "Please select a salesperson",
      // DateBooked:"Please enter the date"
    }
    // States ---------
    const [booking, setBooking] = useState(initialBooking);
    const [errors, setErrors] = useState(
      Object.keys(initialBooking).reduce((accum, key) => ({...accum, [key]: null}),{})
    );

   const [vehicles, setVehicles] = useState(null);
   const [loadVehicleMessage, setLoadVehicleMessage] = useState('Loading Vehicles...');
   const getVehicles = async () => {
     const response = await API.get('/vehicles');
     response.isSuccess
         ? setVehicles(response.result)
          : setLoadVehicleMessage(response.message)

   }
   useEffect(() => { getVehicles() }, []);

   const [customers, setCustomers] = useState(null);
   const [loadCustomerMessage, setLoadCustomerMessage] = useState('Loading customers...');
   const getCustomers = async () => {
     const response = await API.get('/users/customers/userUserTypeId');
     response.isSuccess
         ? setCustomers(response.result)
          : setLoadCustomerMessage(response.message)

   }
   useEffect(() => { getCustomers() }, []);  

   
  

   const [salesperson, setSalesperson] = useState(null);
   const [loadSaleMessage, setLoadSaleMessage] = useState('Loading Salesperson...');

  const getSalesperson = async () => {
    const response = await API.get('/users/sales/userUserTypeId');
    response.isSuccess
        ? setSalesperson(response.result)
        : setLoadSaleMessage(response.message)

   }
   useEffect(() => { getSalesperson() }, []);
      
    
    
    // Handler ---------  
    const handleChange = (event) => {
      const { name, value } = event.target;
      const newValue = value ;
      setBooking({ ...booking, [name]: newValue});



      setErrors({...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]}); //118 :
    };

    const isValidBooking = (booking) => {
      let isBookingValid = true;
      Object.keys(booking).forEach((key) => {
        if(isValid[key](booking[key])) {
          errors[key] = null;

        } else {
          errors[key] = errorMessage[key];
          isBookingValid = false;
        }
      });
      return isBookingValid;
    }

    const handleCancel = () => onDismiss();

    const handleSubmit = (e) => {
     e.preventDefault();
      isValidBooking(booking) && onSubmit(booking) && onDismiss(); 
      setErrors({...errors});
    }

    // View ---------
  return (
    <form className='BorderedForm'>

      <FormItem 
        label ="Vehicle"
        htmlFor="VehicleId"
        advice="Please Enter Vehicle Id"
        error={errors.VehicleId}
      >
        {
          !vehicles
            ?<p>{loadVehicleMessage}</p>
            : vehicles.length ===0
              ? <p>No Vehicles found</p>
              : <select
                name="VehicleId"
                value={booking.VehicleId}
                onChange={handleChange}
                >
                <option value="0" disabled>None Selected</option>
                {
                  vehicles.map((vehicle) => <option key={vehicle.VehicleId} value={vehicle.VehicleId}>{vehicle.VehicleMake} {vehicle.VehicleModel} - {vehicle.VehicleYear} £{vehicle.VehiclePrice}</option>)
                }
              </select>
        }
      </FormItem>
      <FormItem 
        label ="Customer"
        htmlFor="CustomerId"
        advice="Please Enter Customer Id"
        error={errors.CustomerId}
      >
        {
          !customers
            ?<p>{loadCustomerMessage}</p>
            : customers.length ===0
              ? <p>No customers found</p>
              : <select
                name="CustomerId"
                value={booking.CustomerId}
                onChange={handleChange}
                >
                <option value="0" disabled>None Selected</option>
                {
                  customers.map((customer) => <option key={customer.CustomerId} value={customer.UserId}>{customer.userFirstName} {customer.userSurname}</option>)
                }
              </select>
        }
      </FormItem>
      <FormItem 
        label ="Saleperson"
        htmlFor="SalesId"
        advice="Please Enter Sales Id"
        error={errors.SalesId}
        >
         {
          !salesperson
            ?<p>{loadSaleMessage}</p>
            : salesperson.length ===0
              ? <p>No salesperson found</p>
              : <select
                name="SalesId"
                value={booking.SalesId}
                onChange={handleChange}
              >
                <option value="0" disabled>None Selected</option>
                {
                  salesperson.map((sale) => <option key={sale.SalesId} value={sale.UserId}>{sale.userFirstName} {sale.userSurname}</option>)
                }
              </select>
        }
        </FormItem>

        {/* <FormItem 
        label ="Date of Booking"
        htmlFor="DateBooked"
        advice="Please Enter Date of booking"
        error={errors.DateBooked}
      >
        <input 
            type="datetime"
            name="DateBooked"
            value={booking.DateBooked}
            onChange={handleChange}
        />
      </FormItem> */}

      <div  className="button">
          <Button color='rgb(58, 110, 165)' text='Submit' onClick={handleSubmit}></Button>
          <Button color='rgb(209, 69, 50)' text='Cancel' onClick={handleCancel}></Button>
      </div>
    </form>
  )
}
