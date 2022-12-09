import Form from '../UI/Form';
import useLoad from '../api/useLoad';

const emptyBooking = {
    VehicleId:1,
    CustomerId: 1, 
    SalesId: 1,
    DateBooked:"2022-10-15 20:00:00"
}

export default function BookingForm({onSubmit,onCancel, initialBooking=emptyBooking}){
    // Initialisation ---------
    const validation = {
       isValid: { 
        VehicleId: (vid) =>  /^\d+$/.test(vid),
        CustomerId: (cid) => /^\d+$/.test(cid),
        SalesId: (sid) => (sid > 0 ) && (sid < 5 ),
        DateBooked: (date) => /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/.test(date)

      },
      errorMessage: {
        VehicleId: "Vehicle id must be a number",
        CustomerId: "Customer id must be a number",
        SalesId: "Please select a salesperson",
       DateBooked:"Please enter the date"
      }
    }
    // State  ---------
    
    const [booking, errors, handleChange, handleSubmit] = Form.useForm(initialBooking, validation, onSubmit,onCancel);


    const [vehicles, , loadVehicleMessage, ] = useLoad('/vehicles');
    const [customers, , loadCustomerMessage, ] = useLoad('/users/customers/userUserTypeId');
    const [salesperson, , loadSaleMessage, ] = useLoad('/users/sales/userUserTypeId');
 
    // Handler ---------  
    // View ---------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item 
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
      </Form.Item>
      <Form.Item 
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
      </Form.Item>
      <Form.Item 
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
      </Form.Item>

      <Form.Item
        label ="Date of Booking"
        htmlFor="DateBooked"
        advice="Please Enter Date of booking"
      >
        <input 
            type="datetime"
            name="DateBooked"
            value={booking.DateBooked}
            onChange={handleChange}
        />
      </Form.Item>

      
    </Form>
  )
}
