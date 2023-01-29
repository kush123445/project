import react from 'react';
import {Redirect} from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import welcome from '../imag/snake.gif';

function Tpper()
{
  const [empfname, setfname] = useState("");
  const [emplname, setlname] = useState("");
  const [empemail, setemail] = useState("");
  const [empphoto, setempphoto] = useState("");

  useEffect(() => {
     
    const empemail=localStorage.getItem("email")
console.log(empemail)

   
    axios.post('http://localhost:5000/profile',{ empemail:empemail})
      .then(response => {
        console.log(response);
        setfname(response.data.empfname)
        setlname(response.data.emplname)
        setemail(response.data.empemail)
        setempphoto(response.data.image)




      })
      .catch((error) => {
        console.log(error);
      })
  })

  // const history=useHistory();
  const navigate=useNavigate();
    
  const a="cf"
    const b="ss";
    const c="sd"
      
    function handleSubmit()
    {
      //history.push('/add')
      navigate("/add")
    }
    function handle()
    {
      //history.push('/delete')
      navigate("/delete")
    }
    return(
      <div class="d-flex flex-column justify-content-between ">
        <div class="d-flex" style={{width:"100vw"}} >
        
      






<div  class="d-flex flex-row justify-content-between w-50">
      <div class=" border-0  mr-5" >
      <img src={`http://localhost:5000/${empphoto}`} class="card-img-top rounded-circle  " style={{width:"260px" ,height:"260px", border: '7px solid 	#C0C0C0',  boxShadow:" 3px 4px #888888",objectFit: "cover"}} alt="..."></img>
      </div>
        <div class="card  w-50 ml-3 border-0">
  <div class="card-header d-flex  justify-content-center  " style={{ color: "red", fontWeight:"bolder" }}>
   WELCOME !!
  </div>
  <ul class="list-group list-group-flush d-flex       justify-content-center">
    <li class="list-group-item d-flex  border-0     justify-content-center"  style={{ color: "green" ,fontWeight:"bolder"}}>{empfname}</li>
    <li class="list-group-item  d-flex    border-0    justify-content-center" style={{ color: "blue",fontWeight:"bolder" }}>{emplname}</li>
    <li class="list-group-item  d-flex   border-0     justify-content-center" style={{ color: "brown",fontWeight:"bolder" }}>{empemail}</li><br></br>

  </ul>
  
</div>

</div>



<div class="d-flex flex-row justify-content-center  align-items-center">
<button type="button" class="btn btn-primary btn-lg btn-block"  onClick={handleSubmit}>ADD YOUR PLACE</button>
<button type="button" class="btn btn-secondary btn-lg btn-block"onClick={handle}>DELETE YOUR PLACE</button>
</div>




</div>

<div class="mt-3"style={{height:"300px" , weidth:"100px"  , backgroundColor:"white", backgroundImage: `url(${welcome})`}}>
 
</div>
</div>




        

        
    );
}
export default Tpper;