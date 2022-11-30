import { useEffect, useState } from "react";
import API from "../api/API";
import { FaPlus } from "react-icons/fa";
import Button from "../UI/Button";
import './MyBookings.scss'
import BookingForm from "../entities/BookingForm";
import Panel from "../UI/Panel";


export default function MyBookings() {
    // Initialisation ---------
    const loggedinUserID = 3;
   // const endpoint
    const endpoint = '/bookings'
    // States ---------
    const [bookings, setBookings] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading Bookings...');
    const [showNewBookingForm, setShowNewBookingForm] = useState(false);

    // Context ---------
    // Methods ---------
    const getBookings = async () => {
        const response = await API.get(`/bookings`);
        response.isSuccess
            ? setBookings(response.result)
            : setLoadingMessage(response.message)

    }
    useEffect(() => { getBookings() }, []);

    const handleAdd = () => setShowNewBookingForm(true);
    const handleDismissAdd = () => setShowNewBookingForm(false);

    const handleSubmit = async(booking) => {
        const response = await API.post(endpoint, booking);
        return response.isSuccess
            ? getBookings()  || true
            : false;
    }


   

    // View ---------
    return (

        <section>
            <h1>My Bookings</h1>
            {
                !bookings
                    ? <p>{loadingMessage}</p>
                    : bookings.length === 0
                        ? <p>You have no booking</p>
                        : bookings.map((booking) =>
                        <Panel>
                            <p key={booking.BookingID}> {booking.VehicleMake} {booking.VehicleModel} {booking.VehicleYear} </p>
                            </Panel>
                            )  
            }

            <div  className="button">
                <Button color='rgb(58, 110, 165)' iconName={<FaPlus/>} text='Add' onClick={handleAdd} onSubmit={handleSubmit}></Button>
            </div>
            <div className="form-container">
                {
                    showNewBookingForm && <BookingForm onDismiss={handleDismissAdd}/> 
                }
            </div>

        </section>
    )

}