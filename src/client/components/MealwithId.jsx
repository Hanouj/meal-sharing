import React,{ useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import MealBooking from "./MealBooking"

export default function MealwithId (){
  const [meal, setMeal] = useState();
  const [isLoading, setIsLoading] = useState(true);

   let {id} =useParams();
   const params = useParams();
console.log(params);

    useEffect(() => {
      setIsLoading(true)
        fetch(`/api/meals/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setMeal(data);
            setIsLoading(false)
          
          });
          
      }, []);

      return(

        <main className="reservation">
            <div>
            {isLoading ?  <p>Loading...</p>: <>
            <h2>Meal: {meal.title}</h2>
        <h3>Description: {meal.description}</h3>
        <h4> Price: {meal.price}</h4>
            </>}       
            
      </div>
      <div>
      <MealBooking id={id}/>
      </div>

        </main>
      )
    
}