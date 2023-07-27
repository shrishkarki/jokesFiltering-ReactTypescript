
import axios from 'axios';
import {  JokesEntity } from '../modals/Idetails';
// import { useState } from 'react';

// interface allDetailsObj{
//   allData:Idetails[];
// }

const customAxios = axios.create({
  baseURL: 'https://v2.jokeapi.dev/joke', 
});




export const allDetails=async(para:string)=>{
  let arr:JokesEntity[]=[];
   const res1=await customAxios.get(`/${para}idRange=1-10&&amount=10`);
   
  
   arr = arr.concat(res1.data.jokes);

  
   const res2=await customAxios.get(`/${para}idRange=11-20&&amount=10`);
   arr = arr.concat(res2.data.jokes);
  
   const res3=await customAxios.get(`/${para}idRange=21-30&&amount=10`);
   arr = arr.concat(res3.data.jokes);
 
   const res4=await customAxios.get(`/${para}idRange=31-40&&amount=10`);
   arr = arr.concat(res4.data.jokes);
  
   const res5=await customAxios.get(`/${para}idRange=41-50&&amount=10`);
   arr = arr.concat(res5.data.jokes);
  

 
 
  return arr;
   
  // const res=await customAxios.get(`/Any?idRange=0-9&&amount=10`);
  

  // return res.data.jokes

}


