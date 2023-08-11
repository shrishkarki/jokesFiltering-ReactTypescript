import React, { SetStateAction, useContext, useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../Dropdown/Dropdown';
import { IndexContext } from '../ContextApi/IndexContext';
import { paramsInterface } from '../../modals/Idetails';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';


interface Iopen {
  jokeId: number,
  status: boolean
}


interface PaginationProps {
  toggle: boolean
  params: paramsInterface,
  setParams: React.Dispatch<SetStateAction<paramsInterface>>,
  handleToggle: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ params, setParams, handleToggle, toggle }) => {
  const currentPage: number = params.currentPage - 1;



  const dropDownElement = useRef<HTMLTableDataCellElement>(null);



  const [dropdownHeights, setDropdownHeights] = useState<{ [key: number]: number }>({});
  // const [currentHeight, setCurrentHeight] = useState<number | null>(null);
  let counter: string = "0";



  const { datas } = useContext(IndexContext);



  const dynamicHeight = 150;
  const [userInput, setUserInput] = useState<string>("");
  const maxWordsToShow: number = 5;
  const [isOpen, setIsOpen] = useState<Iopen>({ jokeId: 0, status: false });
  const [height, setHeight] = useState(isOpen.status ? 'auto' : '0');

  // console.log("i'm at outside")

  const toggleAccordion = (id: number) => {

    // console.log("trigger accordion");

    if (isOpen.jokeId !== id) {
     
      setIsOpen({ jokeId: id, status: true })
    }
    else {
      setIsOpen({ jokeId: id, status: !isOpen.status })
    }
    // console.log(dropDownElement.current);



  };





  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }


  const handleSearch = async () => {
    const searchURL = `Any?contains=${userInput}&amount=10`;
    setParams({ ...params, apiParams: searchURL });

  }


  const extractFirstWords = (content: string): string => {
    const wordsArray = content.split(' ');
    const firstWords = wordsArray.slice(0, maxWordsToShow).join(' ');
    return firstWords;
  };





  useEffect(() => {

    console.log(dropDownElement.current, "useEffect dropdownElement.current");
    if (dropDownElement.current) {
      const divHeight = dropDownElement.current.getBoundingClientRect().height;
      setDropdownHeights({ [isOpen.jokeId]: divHeight });
    }
  }, [isOpen]);
  // console.log(dropdownHeights)







  const styles: React.CSSProperties = {

    height: `${dropdownHeights[isOpen.jokeId]}px`,


  };

  // console.log(dropdownHeights, "dropdown heights");
  // console.log(isOpen,"isOpen")
  // console.log(dropdownHeights[isOpen.jokeId], "styles");




  return (

    <>
    {console.log("inside jsx")}

    <div className='pb-10'>

       
      {/* search items with dropdown */}
      <div className='flex'>

        <div className="input-with-icon relative   w-[340px] bg-[#264653] py-1 rounded-md">
          <FaSearch className='search-icon ' />
          <input type="text" placeholder="Searh by some words" className='w-full bg-transparent pl-9 py-[0.5rem] pr-[90px] outline-none placeholder:text-xs text-sm text-[#d5dde5] focus:border-r-[#3596bb]' onChange={handleInputChange} />


          <p className='absolute right-[19px] top-[50%] -translate-y-[50%] cursor-pointer text-[#fff] pr-2 font-semibold text-xs ' onClick={handleSearch}>Search</p>

        </div>


        <div className='ml-5 bg-[#264653]  px-3 cursor-pointer rounded-md flex items-center focus:ring-blue-700 border border-[#33738c]' onClick={handleToggle}>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
            <path fill="#ffffff" d="M6 3.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.333Zm-1.887 0a2 2 0 0 1 3.774 0h4.78a.667.667 0 0 1 0 1.334h-4.78a2 2 0 0 1-3.774 0h-.78a.667.667 0 1 1 0-1.333h.78Zm5.887 4a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.333Zm-1.887 0a2 2 0 0 1 3.774 0h.78a.667.667 0 0 1 0 1.334h-.78a2.001 2.001 0 0 1-3.774 0h-4.78a.667.667 0 1 1 0-1.333h4.78Zm-2.113 4a.666.666 0 1 0 0 1.333.666.666 0 0 0 0-1.332Zm-1.887 0a2 2 0 0 1 3.774 0h4.78a.667.667 0 1 1 0 1.334h-4.78a2 2 0 0 1-3.774 0h-.78a.667.667 0 1 1 0-1.333h.78Z" />
          </svg>
        </div>
      </div>


      <div className='relative  mt-5 bg-[#264653] rounded-lg px-8 pt-3 pb-1'>


        <table className='table-fixed  text-white details w-full'>
          <thead >
            <tr className='border-b-[1px]  border-b-[#46a8cc] w-full'>
              <th className='w-[8%]'></th>
              <th className='w-[10%]'>S.No.</th>
              <th className='w-[42%]'>Jokes</th>
              <th className='w-[20%]'>Category</th>
              <th className='w-[20%]'>Type</th>

            </tr>
          </thead>


          {datas?.loading ? <LoadingSpinner /> : null}



          <tbody>


            {

              datas && datas.jokes.length > 0 ? (
                datas.jokes.map((eachItem, index) => {



                  if (currentPage === 0) {
                    counter = (index + 1).toString()
                  }
                  else {
                    if (index === 9) {
                      counter = (currentPage + 1).toString() + (index % 9).toString()
                    }
                    else {
                      counter = currentPage.toString() + (index + 1).toString()
                    }
                  }





                  return (
                    <>

                      <tr key={eachItem.id} className='border-b-[1px]  border-b-[#33738c]  text-[0.975rem] leading-[1.25rem] hover:bg-[#315d6e]' onClick={() => toggleAccordion(eachItem.id)}>

                        <td>{eachItem.id === isOpen.jokeId && isOpen.status ? <IoMdArrowDropdown size={28} /> : <IoMdArrowDropright size={28} />}</td>
                        <td ><div >{counter}</div></td>


                        {
                          eachItem.type === "single" ?

                            // (<td className='w-[10%] pr-10 transition-[height] duration-5000 whitespace-nowrap overflow-hidden text-ellipsis' style={{ height }}>
                            //         { eachItem.id === isOpen.jokeId && isOpen.status?
                            //         eachItem.joke:null
                            //       } </td>)
                            (<td className={`jokes   transition-[height] duration-1000
                             ${eachItem.id === isOpen.jokeId && isOpen.status ? `h-0` : " h-auto whitespace-nowrap overflow-hidden text-ellipsis"}`}
                              ref={eachItem.id === isOpen.jokeId && isOpen.status ? dropDownElement : null}
                              style={eachItem.id === isOpen.jokeId && isOpen.status ? styles
                               : {height:"1px"}} >

                              {eachItem.joke}

                            </td>)




                            :
                            (<td>
                              {
                                eachItem.id === isOpen.jokeId && isOpen.status ?
                                  <div className='max-h-[100px] transition-all duration-200 ease-in-out'>
                                    <p className='py-2 tracking-wider'><span className='font-bold pr-2'>Setup:</span> {eachItem.setup}</p>
                                    <p className='tracking-wider'><span className='font-bold pr-2'>Delivery:</span> {eachItem.delivery}</p>
                                  </div>
                                  : <div className='tracking-wider max-h-[20px] flex items-center ' >{extractFirstWords(eachItem.setup || " ")}.....</div>
                              }
                            </td>)
                        }



                        {/* <td className='h-[20px] pr-10 transition-[height] duration-500' ref={dropDownElement}
                          style={styles}
                        >
                          {


                            eachItem.type === "single" ? (eachItem.id === isOpen.jokeId && isOpen.status ?
                              eachItem.joke : extractFirstWords(eachItem.joke || " "))
                              :

                              (
                                eachItem.id === isOpen.jokeId && isOpen.status ?
                                  <div className='max-h-[100px] transition-all duration-200 ease-in-out'>
                                    <p className='py-2 tracking-wider'><span className='font-bold pr-2'>Setup:</span> {eachItem.setup}</p>
                                    <p className='tracking-wider'><span className='font-bold pr-2'>Delivery:</span> {eachItem.delivery}</p>
                                  </div>
                                  : <div className='tracking-wider max-h-[20px] flex items-center ' >{extractFirstWords(eachItem.setup || " ")}.....</div>
                              )
                          }

                        </td> */}



                        <td ><div >{eachItem.category} </div></td>
                        <td ><div >{eachItem.type}</div></td>


                      </tr>

                    </>
                  )


                })
              ) : null
            }

          </tbody>

        </table>
        {/* dropdownl list */}

        {toggle ? <Dropdown setParams={setParams} handleToggle={handleToggle} /> : null}
      </div>

    </div>
    </>

  )
}

export default Pagination