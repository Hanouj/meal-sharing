import React,{ useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import MealBooking from "./MealBooking"
import { UserContext } from '../LocalContext';


export default function MealwithId (){
    let {id} =useParams();
    const{
       meals,
       setMeals,
    }=useContext(UserContext)

    useEffect(() => {
        fetch(`/api/meals/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setMeals(data);
          });
      }, []);


      return(
        <main>
            <div>
             <h2>{meals.title}</h2>
        <h3>Description: {meals.description}</h3>
        <h4> Price: {meals.price}</h4>
      </div>
      <div>
        <button>Book Reservation</button>
      </div>
      <MealBooking id={id}/>
        </main>
      )
}