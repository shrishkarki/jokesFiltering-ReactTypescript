import { Routes, Route, Navigate } from "react-router-dom";
import Details from "../FirstPageComponent/UI/Details";
import SecondDetails from "../SecondPageComponent/UI/SecondDetails";


const Routers = () => {
    return (
        <>

            <Routes>
            <Route path="/" element={<Navigate to="/pageone"/>}/>
               
                <Route path="/pageone" element={<Details />} />
                <Route path="/pagetwo" element={<SecondDetails />} />

            </Routes>
        </>
    )
}

export default Routers;