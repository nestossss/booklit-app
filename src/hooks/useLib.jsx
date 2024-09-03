import { useContext, useEffect } from "react";
import { LibContext } from "../contexts/LibContext";
import { UserContext } from "../contexts/UserContext"
import api from "../api/api";
import { useChangesMade } from "./useChangesMade";

function useLib(){

   const [changesMade, setChangesMade] = useChangesMade();

   const [userInfo] = useContext(UserContext);   
   const [lib, setLib] = useContext(LibContext);

   useEffect( () => {
      saveLib();
   }, [changesMade])

   async function saveLib(){
      if(changesMade){
         let receivedLib = await fetchLib();
         if(!receivedLib)
            return false
         setLib(receivedLib);
         setChangesMade(false);
      }
   }
   
   async function fetchLib(){
      try{
         let res = await api.get('/lib/', {
            headers: {
               Authorization: 'Bearer '+userInfo.token,
            }
         })
  
         let terminados = [];
         let sendoLidos = [];
         let salvos = [];
     
         res.data.biblioteca.forEach( (registro) => {
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
         console.log(err);
         return false
      }
   }

   return [lib, setLib];
}


export { useLib }