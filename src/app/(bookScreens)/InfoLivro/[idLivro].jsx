import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { View, Text, ScrollView, Image, TouchableHighlight } from "react-native";
import axios from "axios";

export default function InfoLivro(){

   const [book, setBook] = useState();

   const { idLivro } = useLocalSearchParams();
   const userInfo = useContext(UserContext);
   
   const getBook = async () => {
      let res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${idLivro}`);
      let volumeInfo = res?.data?.volumeInfo;
      console.log(volumeInfo);
      setBook(volumeInfo);
   }

   useEffect( () => { 
      getBook();
   }, [idLivro])

   return (
      <>
         {
         !book ?
         <Text>Loading...</Text> 
         :
         <ScrollView>
            <View>
               <View>
                  <Image source={{
                     uri: book?.imageLinks?.medium?
                     book.imageLinks.medium : book?.imageLinks?.large?
                     book.imageLinks.large  : book?.imageLinks?.small?
                     book.imageLinks.small  : book?.imageLinks?.extraLarge?
                     book.imageLinks.extraLarge : ""
                  }}/>
               </View>
               <Text>{book.title}</Text>
               <Text>{book.authors[0]}</Text>
               <View>
                  <TouchableHighlight>
                     <View>
                        <Text style={{color: "white"}}>salvar </Text> 
                     </View>
                  </TouchableHighlight>
                  <TouchableHighlight>
                     <View>
                        <Text>ler agora </Text>
                     </View>
                  </TouchableHighlight>
               </View>
               <Text>{book.pageCount}</Text>
            </View>
            <View>
               <View> 
                  <View>
                     <Text>Descrição</Text>
                     <TouchableHighlight>
                        <Text></Text>
                     </TouchableHighlight>
                  </View>
                  <Text>{book.description}</Text>
               </View>
            </View>
         </ScrollView>
         }   
      </>
   )
}