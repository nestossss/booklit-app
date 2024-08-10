import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { View, Text } from "react-native";


export default function EditLivro(){
   
   const { idLivro } = useLocalSearchParams();
   const userInfo = useContext(UserContext);

   
   return (
      <View>
         <Text numberOfLines={1} style={{width: "100%"}}>Esse é o id: {"->"} {idLivro} {"<-"} esse ali</Text>
      </View>   
   )
}