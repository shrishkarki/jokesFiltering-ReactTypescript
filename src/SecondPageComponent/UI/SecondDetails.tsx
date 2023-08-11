import React, { useEffect, useState } from 'react';
import './SecondDetails.css';
import { Istate, JokesEntity } from '../../modals/Idetails';
import { allDetails } from '../../services/details';
import { FaSearch } from 'react-icons/fa';

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import SecondDropdown from '../SecondDropdown/SecondDropdown';

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';




interface Iopen {
    jokeId: number,
    status: boolean
}


const SecondDetails: React.FC = () => {



    const [allJokes, setAllJokes] = useState<Istate>({
        loading: true,
        jokes: [],
        errorMsg: "",
    });






    const [currentPage, setCurrentPage] = useState<number>(1);
    const [toggle, setTogle] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    const maxWordsToShow: number = 5;
    const [isOpen, setIsOpen] = useState<Iopen>({ jokeId: 0, status: false });


    const itemsPerPage: number = 10;
    const arrayWithoutUndefinedItems = allJokes.jokes.filter(item => item !== undefined);
    const totalItems: number = arrayWithoutUndefinedItems.length;
    const totalPages: number = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = arrayWithoutUndefinedItems.slice(startIndex, endIndex);


    const toggleAccordion = (id: number) => {
        if (isOpen.jokeId !== id) {
            setIsOpen({ jokeId: id, status: true })
        }
        else {
            setIsOpen({ jokeId: id, status: !isOpen.status })
        }
    };



    const handleToggle = () => {
        setTogle(!toggle);
    }


    const changePage = (index: number) => {
        setCurrentPage(index + 1);
    }

    const handlePage = (type: string) => {
        if (type === "left") {
            setCurrentPage(currentPage - 1);
        }
        if (type === "right") {
            setCurrentPage(currentPage + 1);

        }

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }


    const handleSearch = async () => {
        const res: JokesEntity[] = await allDetails(`Any?contains=${userInput}&`);
        setAllJokes({ ...allJokes, jokes: res, loading: false })
    }


    const extractFirstWords = (content: string): string => {
        const wordsArray = content.split(' ');
        const firstWords = wordsArray.slice(0, maxWordsToShow).join(' ');
        return firstWords;
    };


    useEffect(() => {



        currentPage < 1 && setCurrentPage(totalPages);


        currentPage > totalPages && setCurrentPage(1)

    }, [currentPage < 1, currentPage > totalPages])




    useEffect(() => {
        const getData = async () => {
            const res: JokesEntity[] = await allDetails("Any?");
            setAllJokes({ ...allJokes, jokes: res, loading: false })

        }
        getData();
    }, []);


    return (
        <div className={`w-full font-[Inter,sans-serif] bg-[#315d6e]  ${allJokes.loading ? "h-[100vh]" : "h-auto"}`}>
            {toggle && <div className='backdrop' onClick={handleToggle}></div>}
            <h1 className="text-3xl text-[#f6f7f8] py-8 border-b-[1px]  border-b-[#46a8cc] pl-5">Laugh-a-Day</h1>

            {/* {allJokes.loading ? <h1 className='text-slate-200 text-lg'>Loading.......</h1> : null} */}
            <div className=' mx-auto max-w-[1100px] py-8'>
                {/* <h1 className="text-3xl text-neutral-50 py-8 border-b-[1px]  border-b-[#46a8cc]">Laugh-a-Day</h1> */}

                {/* search items with dropdown */}
                <div className='flex'>

                    <div className="input-with-icon relative   w-[340px] bg-[#264653] py-1 rounded-md">
                        <FaSearch className='search-icon ' />
                        <input type="text" placeholder="Searh by some words" className='w-full bg-transparent pl-9 py-[0.5rem] pr-[90px] outline-none placeholder:text-xs text-sm text-[#d5dde5] focus:border-r-[#3596bb]' onChange={handleInputChange} />

                        <p className='absolute right-[19px] top-[50%] -translate-y-[50%] cursor-pointer text-[#fff] pr-2 font-semibold text-xs ' onClick={handleSearch}>Search</p>

                    </div>


                    <div className='ml-5 bg-[#264653]  px-3 cursor-pointer rounded-md flex items-center focus:ring-blue-700 border border-[#33738c]' onClick={handleToggle}>
                        {/* <LuListPlus className='text-xl text-white tooltip-trigger' /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="#ffffff" d="M6 3.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.333Zm-1.887 0a2 2 0 0 1 3.774 0h4.78a.667.667 0 0 1 0 1.334h-4.78a2 2 0 0 1-3.774 0h-.78a.667.667 0 1 1 0-1.333h.78Zm5.887 4a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.333Zm-1.887 0a2 2 0 0 1 3.774 0h.78a.667.667 0 0 1 0 1.334h-.78a2.001 2.001 0 0 1-3.774 0h-4.78a.667.667 0 1 1 0-1.333h4.78Zm-2.113 4a.666.666 0 1 0 0 1.333.666.666 0 0 0 0-1.332Zm-1.887 0a2 2 0 0 1 3.774 0h4.78a.667.667 0 1 1 0 1.334h-4.78a2 2 0 0 1-3.774 0h-.78a.667.667 0 1 1 0-1.333h.78Z" /></svg>
                    </div>
                </div>


                <div className='relative  mt-5 bg-[#264653] rounded-lg px-8 pt-3 pb-1'>


                    <table className='table-fixed  text-white  secondDetails w-full'>
                        <thead >
                            <tr className='border-b-[1px]  border-b-[#46a8cc] w-full'>
                                <th className='w-[8%]'>S.No.</th>
                                <th className='w-[32%]'>Jokes</th>
                                <th className='w-[20%]'>Category</th>
                                <th className='w-[20%]'>Type</th>
                                <th className='w-[20%]'></th>
                            </tr>


                        </thead>
                        {allJokes.loading ? <LoadingSpinner /> : null}



                        <tbody>





                            {
                                currentItems.length > 0 ? (
                                    currentItems.map((eachItem, index) => {


                                        return (
                                            <tr key={eachItem.id} className='border-b-[1px]  border-b-[#33738c]  text-[0.975rem] leading-[1.25rem] hover:bg-[#315d6e]' onClick={() => toggleAccordion(eachItem.id)}>
                                                <td ><div >{index + 1}</div></td>
                                                <td className='pr-80'>
                                                    {
                                                        eachItem.type === "single" ? (eachItem.id === isOpen.jokeId && isOpen.status ?
                                                            <div className='tracking-wider max-h-[100px] transition-[max-height] duration-200 ease-in-out'>{eachItem.joke}</div> :
                                                            <div className='tracking-wider max-h-[20px]'>{extractFirstWords(eachItem.joke || " ")}.....</div>) :

                                                            (
                                                                eachItem.id === isOpen.jokeId && isOpen.status ?
                                                                    <div className='max-h-[100px] transition-[max-height] duration-200 ease-in-out'>
                                                                        <p className='py-2 tracking-wider flex'><span className='font-bold pr-2'>Setup:</span> {eachItem.setup}</p>
                                                                        <p className='tracking-wider flex'><span className='font-bold pr-2'>Delivery:</span> {eachItem.delivery}</p>
                                                                    </div>
                                                                    : <div className='tracking-wider max-h-[20px]'>{extractFirstWords(eachItem.setup || " ")}.....</div>
                                                            )
                                                    }

                                                </td>

                                                <td ><div >{eachItem.category}</div></td>
                                                <td ><div >{eachItem.type}</div></td>
                                                <td>{eachItem.id === isOpen.jokeId && isOpen.status ? <IoMdArrowDropdown size={28} /> : <IoMdArrowDropright size={28} />}</td>
                                            </tr>
                                        )


                                    })
                                ) : null
                            }

                        </tbody>

                    </table>

                    {toggle ? <SecondDropdown allJokes={allJokes} setAllJokes={setAllJokes} handleToggle={handleToggle} /> : null}
                </div>


                {/* dropdownl list */}


                {/* pagination */}

                <div>
                    {
                        totalPages > 0 ? <ul className='inline-flex gap-2 bg-[#264653]   px-2 py-1 rounded-sm mt-8  text-[#adb9c7]'>

                            <li className='cursor-pointer py-1 px-1.5' onClick={() => handlePage("left")}>
                                <BiChevronLeft className='text-lg' />
                            </li>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} onClick={() => changePage(index)} >
                                    <button className={`${currentPage === index + 1 ? "bg-[#3586a5] text-white rounded" : null} cursor-pointer py-1 px-3 text-sm`}  >{index + 1}</button>
                                </li>
                            ))}

                            <li className='cursor-pointer py-1 px-1.5' onClick={() => handlePage("right")}>
                                <BiChevronRight className='text-lg' />
                            </li>
                        </ul> : null
                    }
                </div>
            </div>

        </div>


    )
}

export default SecondDetails;