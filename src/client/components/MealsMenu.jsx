import React, {useContext} from 'react';
import { UserContext } from '../LocalContext';
import BorderMenu from './BorderMenu';
import { Link } from 'react-router-dom';

export default function Menu() {
    const {
      meals,
    }=useContext(UserContext)
    console.log(meals)
  
     return (
      <>
      <div className='menu-h-p'>
      <h3>How it works</h3>
      <p>Take a seat, Get comfy. Soak up the atmosphere. <br/> Absorb the menus & place your order at the bar</p>
      </div>
      <h5 className='menu-header'>FOOD CATEGORY</h5>
      <hr />
      <div>
       
<ul className='menu-ul'>
  {meals.map((meal)=>{
    return(
       < BorderMenu key={meal.id} >
       <div className='menu-price'>
     <li >{meal.title}</li>
     <p>{meal.price}kr</p>
     <Link to={`/meals/${meal.id}`}>
     <button>reserve Here</button>
     </Link>
     </div>
     <p>{meal.description}</p>
  
     </BorderMenu>
    )
      
  })}
</ul>
      </div>
</>
    )
}