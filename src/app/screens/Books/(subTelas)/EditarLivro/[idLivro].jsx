import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { UserContext } from "../../../../../contexts/UserContext";



export default function EditarLivro(){
   
   const { id } = useLocalSearchParams();
   const userInfo = useContext(UserContext);
   
   return (
      <View> {/*  */}

      </View>   
   )
}