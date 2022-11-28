import { useEffect, useState } from "react";
import API from "../api/API";
import { FaPlus } from "react-icons/fa";
import Button from "../UI/Button";
import './MyBookings.scss'
import BookingForm from "../entities/BookingForm";

export default function MyBookings() {
    // Initialisation ---------
    const loggedinUserID = 3;
    const endpoint = `/bookings/sales/${loggedinUserID}`;
    // States ---------
    const [bookings, setBookings] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading Bookings...');
    const [showModalForm, setShowModalForm] = useState(false);

    // Context ---------
    // Methods ---------
    const apiCall = async (endpoint) => {
        const response = await API.get(endpoint);
        response.isSuccess
            ? setBookings(response.result)
            : setLoadingMessage(response.message)

    }


    const handleClick = () => {
        setShowModalForm(!showModalForm);
    };


    useEffect(() => { apiCall(endpoint) }, [endpoint]);

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
                            <p key={booking.BookingID}> {booking.VehicleMake} {booking.VehicleModel} {booking.VehicleYear} </p>
                        )
            }


            <div  className="button">
                <Button color='rgb(58, 110, 165)' iconName={<FaPlus/>} text='Add' onClick={handleClick}></Button>
            </div>
            <div className="form-container">
                
                     <BookingForm/> 
                
            </div>

        </section>
    )

}