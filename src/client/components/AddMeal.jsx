import React, {useContext} from 'react';
import { UserContext } from '../LocalContext';
//import { useNavigate } from 'react-router-dom';

export default function AddMeal() {
  //const navigate = useNavigate();
    const{
        description,
        setDescription,
        title,
        setTitle,
        price,
        setPrice,
    }=useContext(UserContext)
    
   const buttonAddMeal =(e)=>{
    e.preventDefault();
    fetch("/api/meals", {
        method: "POST",
        body: JSON.stringify({ title, description, price }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((mealAdded) => {
          if(mealAdded){
            setTitle("");
            setDescription("");
            setPrice(0);
            alert("Meal has been added successfully to the Menu");
          }
        //  navigate('/meals', { replace: true })
        });
}
            
            return(
      <div className='form-containet'>
<form onSubmit={buttonAddMeal}>
  <h1>ADD YOUR NEW MEAL HERE</h1>
  <br/>
<div> 
    <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="title" required/>
</div>
<br/>
<div> 
    <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} placeholder="description" required/>
</div>
<br/>
<div> 
    <input type="number" onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder="price" required/>
</div>
<br/>
<button>Add meal</button>
<pre>{(JSON.stringify(`${title}, ${description}, ${price}`))}</pre>

</form>
</div>
   )

}