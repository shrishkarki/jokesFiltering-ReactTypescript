import { SetStateAction, createContext, useState } from "react";
import { Istate } from "../../modals/Idetails";

interface contextChildrenProps{
children:React.ReactNode
}

interface datasContextInterface{
    datas:Istate,
    setDatas:React.Dispatch<SetStateAction<Istate>>
}

const defaultState={
   
        datas:{ loading: true,
         jokes: [],
         errorMsg: "",},
         setDatas:(datas:Istate)=>{}
   
} as datasContextInterface

const IndexContext=createContext<Partial<datasContextInterface>>(defaultState);
// const IndexContext=createContext<datasContextInterface | null>(null);





const IndexContextProvider: React.FC<contextChildrenProps>=({children})=>{
   

    const [datas,setDatas]=useState<Istate>({
        loading: true,
        jokes: [],
        errorMsg: "",
      });

      return(
        <IndexContext.Provider value={{datas,setDatas}}>{children}</IndexContext.Provider>
      )

}

export { IndexContext,IndexContextProvider}