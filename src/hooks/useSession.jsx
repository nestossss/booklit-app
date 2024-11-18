import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

function useSession(){
   return useContext(UserContext);
}


export { useSession }