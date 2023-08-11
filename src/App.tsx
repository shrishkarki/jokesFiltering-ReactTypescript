// import React from 'react';
// import Details from './FirstPageComponent/UI/Details';
// import SecondDetails from './SecondPageComponent/UI/SecondDetails';



import Routers from './Router/Router';
import {NavLink,useLocation} from 'react-router-dom';
import { navlink } from './URL/Url';

import './App.css';


function App() {
  const location = useLocation();
  return (
    <div className=' w-full '>
      <div className='flex'>
   <aside className='bg-[#264653]   text-center'>
      <div className='flex flex-col items-center  mt-32 font-[Inter,"DMSans",sans-serif] space-y-2'>

        {navlink.map((eachItem,index)=>{
           return <NavLink key={index} to={eachItem.path} className={`${location.pathname===eachItem.path?'bg-[#33738c]':null}  w-[200px] p-3 hover:bg-[#33738c] text-sm font-medium  text-[#d5dde5] hover:text-[#dcf1f9] cursor-pointer`} > {eachItem.display}</NavLink>
        })}
      {/* <NavLink to="/pageone" className={`${location.pathname==='/pageone'?'bg-[#33738c]':null}  w-[200px] p-3 hover:bg-[#33738c] text-sm font-medium  text-[#d5dde5] hover:text-[#dcf1f9] cursor-pointer`} > Page One</NavLink>
        <NavLink to="/pagetwo"  className={`${location.pathname==='/pagetwo'?'bg-[#33738c]':null}  w-[200px] p-3 hover:bg-[#33738c] text-sm font-medium  text-[#d5dde5] hover:text-[#dcf1f9] cursor-pointer`}> Page Two</NavLink> */}
      </div>
    </aside>

    <Routers/>
    {/* <Details/> */}
    {/* <SecondDetails/> */}

      </div>
      

    </div>
  );
}

export default App;
