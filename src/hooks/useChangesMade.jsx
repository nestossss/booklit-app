import { useContext } from "react";
import { ChangesMadeContext } from "../contexts/ChangesMadeContext";

function useChangesMade(){
   return useContext(ChangesMadeContext);
}

export { useChangesMade }