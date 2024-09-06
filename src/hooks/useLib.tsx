import { useContext, useEffect } from "react";
import { LibContext } from "../contexts/LibContext";
import { UserContext } from "../contexts/UserContext"
import api from "../api/api";
import { useChangesMade } from "./useChangesMade";
import { Library } from "../contexts/LibContext";

function useLib(): [Library, React.Dispatch<React.SetStateAction<Library>>]{

   const [changesMade, setChangesMade] = useChangesMade();
   const [userInfo] = useContext(UserContext);   
   const [lib, setLib]: [Library, React.Dispatch<React.SetStateAction<Library>>] | undefined= useContext(LibContext);

   useEffect( () => {
      const controller = new AbortController();
      const signal = controller.signal;

      saveLib(signal);
      console.log(changesMade)

      return () => {
         controller.abort();
      }
   }, [changesMade])

   async function saveLib(signal){
      if(changesMade){
         let receivedLib = await fetchLib(signal);
         if(!receivedLib) return false;
         setLib(receivedLib);
         console.log("lib atualizda");
         setChangesMade(false);
         console.log(lib);
      }
   }
   
   async function fetchLib(signal){
      try{
         let res = await api.get('/lib/', {
            signal,
            headers: {
               Authorization: 'Bearer '+userInfo.token,
            }
         })
  
         let terminados = [];
         let sendoLidos = [];
         let salvos = [];
     
         res.data.biblioteca.forEach( (registro: any) => {
            if(registro.paginasLidas >= registro.livro.totalPag){
               terminados.push(registro);
            }  
            if(registro.paginasLidas == 0){
               salvos.push(registro);
            }
            if(registro.paginasLidas > 0 && registro.paginasLidas < registro.livro.totalPag){
               sendoLidos.push(registro);
            }
         });

         return {
            salvos,
            terminados,
            sendoLidos,
         }
      } catch(err){
         console.log("fetch lib");
         console.log(err);
         return false
      }
   }
   return [lib, setLib];
}


export { useLib }