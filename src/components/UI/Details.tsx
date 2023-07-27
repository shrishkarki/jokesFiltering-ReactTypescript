import React, { useEffect, useState } from 'react';
import './Details.css';
import { Istate, JokesEntity } from '../../modals/Idetails';
import { allDetails } from '../../services/details';
import { FaSearch } from 'react-icons/fa';

import { LuListPlus } from 'react-icons/lu';
import Dropdown from '../Dropdown/Dropdown';









const Details: React.FC = () => {



  const [allJokes, setAllJokes] = useState<Istate>({
    loading: true,
    jokes: [],
    errorMsg: "",
  });





  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toggle,setTogle]=useState<boolean>(false);
  const [userInput,setUserInput]=useState<string>("");


  const itemsPerPage: number = 10;
  const arrayWithoutUndefinedItems = allJokes.jokes.filter(item => item !== undefined);
  const totalItems: number = arrayWithoutUndefinedItems.length;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = arrayWithoutUndefinedItems.slice(startIndex, endIndex);




  const handleToggle=()=>{
      setTogle(!toggle);
  }

  const changePage = (index: number) => {
    setCurrentPage(index + 1);
  }

  const handleInputChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
setUserInput(event.target.value);
  }
  const handleSearch=async()=>{
 
    const res: JokesEntity[] = await allDetails(`Any?contains=${userInput}&`);
    console.log(res);
    setAllJokes({ ...allJokes, jokes: res, loading: false })

  }
  



  useEffect(() => {
    const getData = async () => {
      const res: JokesEntity[] = await allDetails("Any?");
      setAllJokes({ ...allJokes, jokes: res, loading: false })

    }
    getData();
  }, []);


  return (
    <>

      {allJokes.loading ? <h1 className='text-slate-200 text-lg'>Loading.......</h1> : null}
      <div className='mx-auto max-w-[1000px] py-10 relative'>
        <h1 className="text-3xl text-neutral-50 py-8 ">Laugh-a-Day</h1>

        {/* search items with dropdown */}
        <div className='flex items-center'>

          <div className="input-with-icon relative w-[340px] bg-[#264653] py-3 rounded-md">
            <FaSearch className='search-icon ' />
            <input type="text" placeholder="Searh by some words" className='bg-transparent pl-10 outline-none text-[#d5dde5]' onChange={handleInputChange} />

            <p className='absolute right-0 top-[50%] -translate-y-[50%] cursor-pointer text-white pr-2 font-medium' onClick={handleSearch}>Search</p>

          </div>
          <div className='ml-5 bg-[#264653] py-2 px-2 cursor-pointer rounded-md ' onClick={handleToggle}>
            <LuListPlus className='text-3xl text-white tooltip-trigger' />
          </div>
        </div>


        <div className=' text-center mt-5 bg-[#264653] rounded-lg px-8'>


          <table className='table-fixed  text-white '>
            <thead className=''>
              <tr className='border-b-[1px]  border-b-[#46a8cc]'>
                <th className='w-[10%]'>S.No</th>
                <th className='w-[30%]'>Jokes</th>
                <th className='w-[10%]'>Category</th>
                <th className='w-[10%]'>Type</th>
              </tr>
            </thead>


            <tbody>


              {
                currentItems.length > 0 ? (
                  currentItems.map((eachItem) => {
                    console.log(eachItem);
                  

                    return eachItem.type === 'single' ?
                      <tr key={eachItem.id} className='border-b-[1px]  border-b-[#8f9fa5]  '>
                        <td className=''><div>{eachItem.id}</div></td>
                        <td className=''><div>{eachItem.joke}</div></td>
                        <td className=''><div>{eachItem.category}</div></td>
                        <td className=''><div>{eachItem.type}</div></td>
                      </tr>:
                       <tr key={eachItem.id} className='border-b-[1px]  border-b-[#8f9fa5]'>
                        <td className=''><div>{eachItem.id}</div></td>
                        <td className=''><div>{eachItem.setup}</div></td>
                        <td className=''><div>{eachItem.category}</div></td>
                        <td className=''><div>{eachItem.type}</div></td>
                      </tr>

                  })
                ) : null
              }

            </tbody>

          </table>


        </div>


       {/* dropdownl list */}
    { toggle? <Dropdown allJokes={allJokes} setAllJokes={setAllJokes} handleToggle={handleToggle}/> :null}

        {/* pagination */}

        <div>
          {
            totalPages > 0 ? <ul className='flex space-x-3 bg-[#264653] px-3 py-2  mt-8 w-[21%] text-gray-400'>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} onClick={() => changePage(index)} >
                  <button className={`${currentPage === index + 1 ? "bg-[#315d6e] text-white" : null} text-xl px-2 rounded-md`}  >{index + 1}</button>
                </li>
              ))}
            </ul> : null
          }
        </div>
      </div>

    </>


  )
}

export default Details;