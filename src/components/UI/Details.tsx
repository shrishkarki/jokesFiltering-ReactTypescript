import React, { useContext, useEffect, useState } from 'react';
import './Details.css';
import { Istate, JokesEntity } from '../../modals/Idetails';
import { allDetails, getDetails } from '../../services/details';
import { IndexContext } from '../ContextApi/IndexContext';
import Pagination from './Pagination';


// import { LuListPlus } from 'react-icons/lu';
import Dropdown from '../Dropdown/Dropdown';







const Details: React.FC = () => {

  const {datas,setDatas}=useContext(IndexContext);
 
  
//  console.log(datas,"details")
 console.log(datas?.jokes,"jokes");



  // const [allJokes, setAllJokes] = useState<Istate>({
  //   loading: true,
  //   jokes: [],
  //   errorMsg: "",
  // });



const [params,setParams]=useState<string>("/Any?amount=10");

  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [toggle, setTogle] = useState<boolean>(false);
  // const [userInput, setUserInput] = useState<string>("");
  // const maxWordsToShow: number = 5;
  // const [isOpen, setIsOpen] = useState<Iopen>({ jokeId: 0, status: true });


  // const itemsPerPage: number = 10;
  // const arrayWithoutUndefinedItems = allJokes.jokes.filter(item => item !== undefined);
  // const totalItems: number = arrayWithoutUndefinedItems.length;
  // const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = arrayWithoutUndefinedItems.slice(startIndex, endIndex);


  // const toggleAccordion = (id: number) => {
  //   setIsOpen({ jokeId: id, status: !isOpen.status })
  // };

  

  // const handleToggle = () => {
  //   setTogle(!toggle);
  // }


  // const changePage = (index: number) => {
  //   setCurrentPage(index + 1);
  // }

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserInput(event.target.value);
  // }


  // const handleSearch = async () => {
  //   const res: JokesEntity[] = await allDetails(`Any?contains=${userInput}&`);
  //   setAllJokes({ ...allJokes, jokes: res, loading: false })
  // }


  // const extractFirstWords = (content: string): string => {
  //   const wordsArray = content.split(' ');
  //   const firstWords = wordsArray.slice(0, maxWordsToShow).join(' ');
  //   return firstWords;
  // };




  useEffect(() => {
    const getData = async () => {
      const res: JokesEntity[] = await getDetails(params);
     
      const updatedDatas = {
        loading: false,
        jokes: res,
        errorMsg: 'hello',
      };
    
      //  setDatas({ jokes:res,loading:false,errorMsg:"hello"});


       setDatas?.(updatedDatas);
  
    
    
      
     
    }
    getData();
  }, [params]);


  return (
    <div>
      {/* {toggle && <div className='backdrop' onClick={handleToggle}></div>} */}
   <h1 className="text-3xl text-[#f6f7f8] py-8 border-b-[1px]  border-b-[#46a8cc] pl-5">Laugh-a-Day</h1>

      {datas?.loading ? <h1 className='text-slate-200 text-lg'>Loading.......</h1> : null}


      {/* pagination component */}
     
       <Pagination/>
      

        {/* pagination buttons */}

        {/* <div>
          {
            totalPages > 0 ? <ul className='flex space-x-2 bg-[#264653] w-[14%]  px-3 py-2  mt-8  text-gray-400'>
             
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} onClick={() => changePage(index)} >
                  <button className={`${currentPage === index + 1 ? "bg-[#315d6e] text-white" : null} text-sm px-2 rounded-md`}  >{index + 1}</button>
                </li>
              ))}
            </ul> : null
          }
        </div> */}

        <ul className='flex text-white space-x-6 bg-[#264653]'>
          <li className='text-xl' onClick={()=>setParams("/Any?amount=10")}>1</li>
          {/* <li className='text-xl'  onClick={()=>setParams("/Any?amount=20")}>2</li>
          <li className='text-xl' onClick={()=>setParams("/Any?amount=30")}>3</li>
          <li className='text-xl'  onClick={()=>setParams("/Any?amount=40")}>4</li>
          <li className='text-xl'  onClick={()=>setParams("/Any?amount=50")}>5</li> */}
        </ul>
      

    </div>


  )
}

export default Details;