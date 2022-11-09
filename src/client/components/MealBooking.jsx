import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../LocalContext';

export default function MealBooking({id}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [guests, setGuests] = useState("");
    const{
        meals,
        setMeals,
     }=useContext(UserContext)

const maxGuests =meals
      .filter((meal) =>meal.id == id)
      .map((meal) =>meal.max_reservation)
    const reservationButton =(e)=>{
      e.preventDefault();
    const reservation = {
        meal_id: id,
        number_of_guests: guests,
        contact_phonenumber: number,
        contact_name: name,
        contact_email: email,
      };

      fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      })
        .then((response) => response.json())
        .then((reservationAdded) => {
          if (reservationAdded) {
            setName("");
            setEmail("");
            setNumber("");
            setGuests("");
            //alert("Your reservation has been added");
          }
        });
    }
return(
    <div className='form-containet'>
    <form>
  <h3>MAKE YOUR RESERVATION HERE</h3>
  <br/>
  <div>
      <input
        type="text"
        value={name}
        placeholder="contact name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      </div>
      <br/>
      <div>
      <input
        type="email"
        value={email}
        placeholder="enter email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </div>
      <br/>
      <div>
      <input
        type="text"
        value={number}
        placeholder="phone number"
        onChange={(e) => setNumber(e.target.value)} 
        required
      />
      </div>
      <br/>
      <div>
              <input
                type="number"
                placeholder="Total Guest"
                value={guests}
                min={1}
                max={maxGuests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>
      <br/>
      <br/>
      <button onClick={reservationButton}>add reservation</button>
    </form>
    </div>
)
}