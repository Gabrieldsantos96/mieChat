import { useContext } from "react";
import userContext from "../contexts/userContext";

export default function useData(){
    return useContext(userContext);    
}