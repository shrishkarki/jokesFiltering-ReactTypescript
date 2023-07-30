import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';



import { IoIosArrowDown } from 'react-icons/io';
import { Icategorysearch, Istate, Itoggle, JokesEntity } from '../../modals/Idetails';
import { allDetails } from '../../services/details';


interface checkboxItems {
  [key: string]: boolean
}

interface FilterItem {
  name: string;
  items: string[];

}


interface DropdownProps {
  allJokes: Istate;
  setAllJokes: React.Dispatch<React.SetStateAction<Istate>>;
  handleToggle: () => void;
}

const filterList: FilterItem[] = [
  { name: "Category", items: ['Miscellaneous', 'programming', 'dark', 'poon', 'Spooky', 'Christmas'] },
  { name: "Flags", items: ["nsfw", "religious", "political", "racist", "sexist", "explicit"] },
  { name: "Type", items: ["Single", "twopart"] },
];

const Dropdown: React.FC<DropdownProps> = ({ allJokes, setAllJokes, handleToggle }) => {

  const [showListItem, setShowListItem] = useState<Itoggle>({});
  const [checkedItems, setCheckedItems] = useState<checkboxItems>({});
  const [searchCategory,setSearchCategory]=useState<Icategorysearch>({});
  const checkedFilterList: FilterItem[] = [...filterList];



  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedItems({ ...checkedItems, [id]: checked });
  }



  const handleListToggle = (whichFilterItem:string) => {
    setShowListItem({...showListItem, [whichFilterItem]:!showListItem[whichFilterItem] });
  }


  const clearCheckedItems=()=>{
    const updatedCheckedItems:checkboxItems={};
   
    for (const key in checkedItems) {
      
      updatedCheckedItems[key] = false;
    }

    setCheckedItems(updatedCheckedItems);
  
  }

 




  const filtered: FilterItem[] = checkedFilterList.map((filterItem) => {
    return {
      name: filterItem.name,
      items: filterItem.items.filter((item) => checkedItems[item]),
    };
  });



  const handleFilterData = async () => {
    const category = filtered[0].items.join(',');
    const Flags = filtered[1].items.join(',');
    const type = filtered[2].items.join(',');
    handleToggle();    
    const res: JokesEntity[] = await allDetails(`${category}?blacklistFlags=${Flags}&type=${type}&`);
    console.log(res)
    setAllJokes({ ...allJokes, jokes: res, loading: false });
  }


  return (
    <>
      <div className='dropdown absolute top-0 left-11 bg-[#315d6e] outline-1 outline outline-[#46a8cc] px-4 z-10'>
        <div>
    <h3 className='py-2 border-b-[1px] text-white text-sm font-semibold  border-b-[#46a8cc]'>Filters</h3>
        </div>

        {/* filters */}
        <div className='md:grid grid-cols-2 gap-4'>

          {filterList.map((eachDropdown, index) => {
            return (
              <div key={index}>
                <h4 className='text-white text-sm  font-medium py-2 flex items-center pl-2 cursor-pointer' onClick={()=>handleListToggle(eachDropdown.name)}><IoIosArrowDown /> &nbsp; {eachDropdown.name}</h4>
                {!showListItem[eachDropdown.name] ?(
                <div className='flex items-center'>
                  <div className="input-with-icon relative w-[340px] bg-[#33738C] py-2 border-none rounded-md outline-1 outline outline-[#46a8cc] ">
                    <FaSearch className='search-icon' />
                    <input type="text" placeholder="Searh by some words" id={eachDropdown.name} className='bg-transparent pl-10 outline-none text-[#d5dde5]' onChange={(e)=>setSearchCategory({[eachDropdown.name]:e.target.value})} onBlur={(e)=>setSearchCategory({[eachDropdown.name]:""})} value={searchCategory[eachDropdown.name]}/>

                    <p className='absolute right-0 top-[50%] -translate-y-[50%] cursor-pointer text-white px-3 py-[6px] font-medium border-l border-white'><IoIosArrowDown /> </p>

                  </div>
                </div>):null}

                {!showListItem[eachDropdown.name] ?

                  <ul className='filter-list space-y-2 text-[#E5DBD5] py-3 pl-3 '>

                    {
                      eachDropdown.name===Object.keys(searchCategory)[0]? eachDropdown.items.filter((eachItem)=>{
                          return eachItem.toLowerCase().includes(searchCategory[eachDropdown.name].toLowerCase())
                      }).map((eachListItem,index)=>{
                        return (

                          <li key={index}><input type='checkbox' id={eachListItem}  checked={checkedItems[eachListItem]} onChange={handleCheckboxChange} /> <label htmlFor={eachListItem}>{eachListItem}</label></li>
  
  
                        )
                      }):eachDropdown.items.map((eachListItem, index) => {
                        return (
  
                          <li key={index}><input type='checkbox' id={eachListItem}  checked={checkedItems[eachListItem]} onChange={handleCheckboxChange} /> <label htmlFor={eachListItem}>{eachListItem}</label></li>
  
  
                        )
                      })
                    }

                    

                    {/* {eachDropdown.items.map((eachListItem, index) => {
                      return (

                        <li key={index}><input type='checkbox' id={eachListItem}  checked={checkedItems[eachListItem]} onChange={handleCheckboxChange} /> <label htmlFor={eachListItem}>{eachListItem}</label></li>


                      )
                    })} */}
                  </ul>: null}



              </div>
            )
          })}







        </div>



        <div className='border-t-[1px]   border-t-[#46a8cc]'>

          <div className='py-4 text-sm space-x-3 flex justify-end '>
            <button className='text-[#abdef1] hover:underline font-semibold' onClick={clearCheckedItems}>Clear Filters</button>
            <button className='text-[#f6f7f8] bg-[#ee6932] py-1 px-[5px] rounded font-semibold hover:bg-[#e7855a]' type='submit' onClick={handleFilterData}>Apply Filters</button>
          </div>

        </div>



      </div>

    </>
  )
}

export default Dropdown;