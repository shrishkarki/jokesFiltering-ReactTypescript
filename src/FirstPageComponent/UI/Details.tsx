import React, { useContext, useEffect, useState } from 'react';
import './Details.css';
import {  JokesEntity, paramsInterface } from '../../modals/Idetails';
import {  getDetails } from '../../services/details';
import { IndexContext } from '../ContextApi/IndexContext';
import Pagination from './Pagination';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';





const Details: React.FC = () => {

  const { datas, setDatas } = useContext(IndexContext);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [toggle, setTogle] = useState<boolean>(false);





  const [params, setParams] = useState<paramsInterface>({
    currentPage: 1,
    apiParams: "/Any?amount=10"
  });


  const handleParams = (index: number) => {
    setParams({ ...params, currentPage: index });
  }




  const handlePage = (type: string) => {
    if (type === "left") {
      setParams({ ...params, currentPage: params.currentPage - 1 })


    }
    if (type === "right") {
      setParams({ ...params, currentPage: params.currentPage + 1 })

    }

  }

  useEffect(() => {


    params.currentPage < 1 && setParams({ ...params, currentPage: 5 });

    params.currentPage > 5 && setParams({ ...params, currentPage: 1 });

  }, [params.currentPage])




  const handleToggle = () => {
    setTogle(!toggle);
  }





  useEffect(() => {
    const getData = async () => {
      setDatas?.({loading:true,jokes:[],errorMsg:""})
      const res: JokesEntity[] = await getDetails(params.apiParams);

      const updatedDatas = {
        loading: false,
        jokes: res,
        errorMsg: '',
      };

    

      setDatas?.(updatedDatas);





    }
    getData();
  }, [params]);


  return (


    <div className={`w-full font-[Inter,sans-serif] bg-[#315d6e]  ${datas?.loading?"h-[100vh]":"h-auto"}`} >
      {toggle && <div className='backdrop' onClick={handleToggle}></div>}
      <div>
        <h1 className="text-3xl text-[#f6f7f8] py-8 border-b-[1px]  border-b-[#46a8cc] pl-5">Laugh-a-Day</h1>

       

      </div>

     
   
      <div className='mx-auto max-w-[1100px] py-8'>
   
        <Pagination params={params} setParams={setParams} handleToggle={handleToggle} toggle={toggle} />

      {    datas?.loading?null:  <div>
          <ul className='inline-flex items-center justify-center bg-[#264653]  px-2 py-1 text-sm rounded-sm gap-2 text-[#adb9c7]'>
            <li className='cursor-pointer py-1 px-1.5' onClick={() => handlePage("left")}>
              <BiChevronLeft className='text-lg' />
            </li>

            {Array.from({ length: 5 }, (_, index) => (
              <li className={`${params.currentPage === index + 1 ? "bg-[#3586a5] text-white rounded" : null} cursor-pointer py-1 px-3 `} onClick={() => handleParams(index + 1)} key={index}>{index + 1}</li>
            ))}
            <li className='cursor-pointer py-1 px-1.5' onClick={() => handlePage("right")}>
              <BiChevronRight className='text-lg' />
            </li>
          </ul>


        </div>}

      </div>
      

    </div>


  )
}

export default Details;