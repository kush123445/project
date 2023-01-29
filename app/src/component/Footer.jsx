import react from 'react';
import back from '../imag/sm.gif';

function Footer(){
    return(
       <div className=' mb-0  fixed-bottom'>
           <footer style={{height:"3em"}} > 
           
<nav class="navbar navbar-light  justify-content-center   bg-dark  mt-3 mr-4 " style={{backgroundImage: `url(${back})`, backgroundRepeat: "no-repeat" ,  backgroundSize: "cover"}}>

  
  <span class="navbar-text text-white  mt-1 ml-3 ">
 Best Place To Find your Place .  .  .  .  we are here dont worry!
 
  </span>
  
</nav>

</footer>

       </div>

    );
}

export default Footer;