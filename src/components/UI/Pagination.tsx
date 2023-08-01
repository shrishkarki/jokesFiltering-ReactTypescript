import React,{useContext, useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../Dropdown/Dropdown';
import { IndexContext } from '../ContextApi/IndexContext';

interface Iopen {
    jokeId: number,
    status: boolean
  }
  
const Pagination:React.FC = () => {
    const {datas}=useContext(IndexContext);
    console.log(datas?.jokes,"page jokes");

    const [toggle, setTogle] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    const maxWordsToShow: number = 5;
    const [isOpen, setIsOpen] = useState<Iopen>({ jokeId: 0, status: true });



    const toggleAccordion = (id: number) => {
        setIsOpen({ jokeId: id, status: !isOpen.status })
      };
    
      
    
      const handleToggle = () => {
        setTogle(!toggle);
      }
    
    
    //   const changePage = (index: number) => {
    //     setCurrentPage(index + 1);
    //   }
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
      }
    
    
    //   const handleSearch = async () => {
    //     const res: JokesEntity[] = await allDetails(`Any?contains=${userInput}&`);
    //     setAllJokes({ ...allJokes, jokes: res, loading: false })
    //   }
    
    
      const extractFirstWords = (content: string): string => {
        const wordsArray = content.split(' ');
        const firstWords = wordsArray.slice(0, maxWordsToShow).join(' ');
        return firstWords;
      };
  return (
    <div className=' mx-auto max-w-[1250px] py-10'>
    {/* <h1 className="text-3xl text-neutral-50 py-8 border-b-[1px]  border-b-[#46a8cc]">Laugh-a-Day</h1> */}

    {/* search items with dropdown */}
    <div className='flex'>

      <div className="input-with-icon relative   w-[340px] bg-[#264653] py-1 rounded-md">
        <FaSearch className='search-icon ' />
        <input type="text" placeholder="Searh by some words" className='w-full bg-transparent pl-9 py-[0.5rem] pr-[90px] outline-none placeholder:text-xs text-sm text-[#d5dde5] focus:border-r-[#3596bb]' onChange={handleInputChange} />

        {/* <p className='absolute right-[19px] top-[50%] -translate-y-[50%] cursor-pointer text-[#fff] pr-2 font-semibold text-xs '  onClick={handleSearch}>Search</p> */}

      </div>


      <div className='ml-5 bg-[#264653]  px-3 cursor-pointer rounded-md flex items-center focus:ring-blue-700 border border-[#33738c]' onClick={handleToggle}>
        {/* <LuListPlus className='text-xl text-white tooltip-trigger' /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="#ffffff" d="M6 3.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.333Zm-1.887 0a2 2 0 0 1 3.774 0h4.78a.667.667 0 0 1 0 1.334h-4.78a2 2 0 0 1-3.774 0h-.78a.667.667 0 1 1 0-1.333h.78Zm5.887 4a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.333Zm-1.887 0a2 2 0 0 1 3.774 0h.78a.667.667 0 0 1 0 1.334h-.78a2.001 2.001 0 0 1-3.774 0h-4.78a.667.667 0 1 1 0-1.333h4.78Zm-2.113 4a.666.666 0 1 0 0 1.333.666.666 0 0 0 0-1.332Zm-1.887 0a2 2 0 0 1 3.774 0h4.78a.667.667 0 1 1 0 1.334h-4.78a2 2 0 0 1-3.774 0h-.78a.667.667 0 1 1 0-1.333h.78Z"/></svg>
      </div>
    </div>


    <div className='relative  mt-5 bg-[#264653] rounded-lg px-8 pt-3 pb-1'>


      <table className='table-fixed  text-white '>
        <thead >
        <tr className='border-b-[1px]  border-b-[#46a8cc]'>
            <th className='w-[10%]'>S.No.</th>
            <th className='w-[15%]'>Jokes</th>
            <th className='w-[10%]'>Category</th>
            <th className='w-[10%]'>Type</th>
          </tr>
        </thead>


        <tbody>


          {
            datas?.jokes?.length > 0 ? (
              datas?.jokes.map((eachItem,index) => {
               

                return (
                  <tr key={eachItem.id} className='border-b-[1px]  border-b-[#33738c]  text-[0.975rem] leading-[1.25rem] hover:bg-[#315d6e]' onClick={() => toggleAccordion(eachItem.id)}>
                  <td ><div >{index+1}</div></td>
                  <td>
                    { 
                    eachItem.type==="single" ?(eachItem.id === isOpen.jokeId && isOpen.status ?
                    <div className='tracking-wider max-h-[100px] transition-[max-height] duration-200 ease-in-out'>{eachItem.joke}</div> :
                    <div className='tracking-wider max-h-[20px]'>{extractFirstWords(eachItem.joke || " ")}.....</div>):

                    (
                      eachItem.id === isOpen.jokeId && isOpen.status ?
                      <div className='max-h-[100px] transition-[max-height] duration-200 ease-in-out'>
                        <p className='py-2 tracking-wider flex'><span className='font-bold pr-2'>Setup:</span> {eachItem.setup}</p>
                        <p  className='tracking-wider flex'><span className='font-bold pr-2'>Delivery:</span> {eachItem.delivery}</p>
                        </div>
                         : <div className='tracking-wider max-h-[20px]'>{extractFirstWords(eachItem.setup || " ")}.....</div>
                    )
                  }

                  </td>

                  <td ><div >{eachItem.category}</div></td>
                  <td ><div >{eachItem.type}</div></td>
                </tr>
                )
                

              })
            ) : null
          }

        </tbody>

      </table>
       {/* dropdownl list */}

      {/* {toggle ? <Dropdown allJokes={allJokes} setAllJokes={setAllJokes} handleToggle={handleToggle} /> : null} */}
    </div>
    </div>

  )
}

export default Pagination