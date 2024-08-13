import { Link, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableHighlight, StyleSheet, ActivityIndicator } from "react-native";

import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

import axios from "axios";
import api from "../../../api/api";

import { UserContext } from "../../../contexts/UserContext";
import { LoadingScreen } from "../../../components/LoadingScreen";

const googleKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function InfoLivro(){

   const [pressBorderColor, setPressBorderColor] = useState({borderColor: "#47A538"});
   
   function handlePressInSalvar(){
      setPressBorderColor({borderColor: '#104010'})
   }
   function handlePressOutSalvar(){
      setPressBorderColor({borderColor: "#47A538"});
   }

   const [book, setBook] = useState();
   const [isLivroSalvo, setLivroSalvo] = useState(null);
   const [livroId, setLivroId] = useState(0);
   const [isDescriptionExpanded, setDescriptionExpanded] = useState();
   const [userInfo] = useContext(UserContext);

   const { googleId } = useLocalSearchParams();

   
   const getBook = async () => {
      let res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${googleId}`).catch( (reason) => { console.log(reason)});
      let volumeInfo = res?.data?.volumeInfo;
      if(volumeInfo){
         return setBook(volumeInfo);
      }
      return setBook({
         naoEncontrado: true,
      });
   }
   const getRegistro = async () => {
      let res = await api.get("/lib/registro?bookUrl="+ googleId, {
         headers: {
            Authorization: 'Bearer '+ userInfo.token,
         }
      }).catch( (err) => { console.log(err)} );

      if(res?.data?.registro){ 
         setLivroId(res.data.registro.idlivro);
         return setLivroSalvo(true);
      }
      setLivroId(null);
      setLivroSalvo(false);

   }

   async function handlePressSalvar(){
      let headers = {
         Authorization: "Bearer "+ userInfo.token
      }

      if(!isLivroSalvo){
         let body = {
            'bookUrl': googleId,
         }
         let res = await api.put('/lib/adicionar/existente', body, { headers });
         if(res?.data?.registro?.livro?.idlivro){
            setLivroId(res.data.registro.livro.idlivro)
         }
         if(res?.data?.status != 200)
            return setLivroSalvo(false);
         return setLivroSalvo(true);   
      }
      if(livroId){
         await api.delete(`/lib/remover?bookId=${livroId}`, {
            headers: headers,
         }).catch( err => console.log(err));
      }
      return setLivroSalvo(false)  
   }

   useEffect( () => { 
      getBook();
      getRegistro();
   }, [googleId])
   
   if(isLivroSalvo == null  || !book){
      return <LoadingScreen />
   }
   if(book?.naoEncontrado){
      return (
         <View style={styles.loadingScreen}> 
            <Text style={{ color: 'white'}}>Livro não encontrado</Text>
         </View>
      )
   }
   return (
         <ScrollView contentContainerStyle={styles.containerScreen} style={styles.screen}>
            <View style={styles.infoContainer}>
               <View style={[styles.imgThumnail]}>
                  <Image style={styles.image}
                     source={{
                        uri: book?.imageLinks?.medium?
                        book.imageLinks.medium : book?.imageLinks?.large?
                        book.imageLinks.large  : book?.imageLinks?.small?
                        book.imageLinks.small  : book?.imageLinks?.extraLarge?
                        book.imageLinks.extraLarge : ""
                  }}/>
               </View>

               <View style={styles.backgroundView}></View>
               
               <Text numberOfLines={1} style={styles.title}>
                  {book.title}
               </Text>
               <Text numberOfLines={1} style={styles.authors}>
                  {book.authors[0]}
               </Text>

               <View style={styles.btnsContainer}>
                  <TouchableHighlight 
                     onPressIn={ handlePressInSalvar }
                     onPressOut={ handlePressOutSalvar }
                     activeOpacity={0.5}
                     style={[styles.transparentBtn, pressBorderColor]}
                     onPress={ () => { handlePressSalvar()} }
                     >
                     <Text numberOfLines={1} style={[styles.transparentBtnText]}>
                        { isLivroSalvo? "Livro salvo XD" : "Salvar"}
                     </Text> 
                  </TouchableHighlight >
                  <Link replace href={`/InfoLivro/${googleId}`} asChild>
                     <TouchableHighlight 
                        style={styles.greenBtn}
                     >
                           <Text numberOfLines={1} style={styles.greenBtnText}>
                              Ler agora
                           </Text>
                     </TouchableHighlight>
                  </Link>
               </View>
               <View style={styles.pageCountContainer}>
                  <Feather 
                     style={styles.iconPage}
                     name='align-left'
                     color='white'
                     size={24}
                  />
                  <Text numberOfLines={1} style={styles.pageCount}>
                     {book.pageCount} Páginas
                     </Text>
               </View>
               <View style={styles.descriptionContainer}>
                  <View style={styles.descriptionTitleContainer}>
                     <Text numberOfLines={1} style={styles.descriptionTitle}>Descrição</Text>
                     <TouchableHighlight
                        onPress={ ()  => { setDescriptionExpanded(!isDescriptionExpanded)}}
                     >
                        <Entypo 
                           name="chevron-left" 
                           size={24} 
                           color="white"
                           style={{
                              transform: isDescriptionExpanded? 'rotate(-90deg)': 'rotate(0deg)'
                           }} />
                     </TouchableHighlight>
                  </View>
                  <Text 
                     numberOfLines={isDescriptionExpanded? 100 : 2 }
                     style={styles.description}
                  >
                     {book.description}
                  </Text>
               </View>
            </View>
         </ScrollView>
   )
}

const styles = StyleSheet.create({
   containerScreen: {
      flexGrow: 1,
      width: "100%", 
   },
   screen: {
      flex: 1,
      backgroundColor: "#408000",
      width: "100%",
   },
   infoContainer: {
      flex: 1,
      backgroundColor: '#000',
      paddingTop: 50,
      alignItems: 'center'
   },
   backgroundView : {
      position: 'absolute',
      zIndex: -1,
      width: "100%",
      aspectRatio: 1.8,
      backgroundColor: "#408000",
   },
   imgThumnail: { 
      zIndex: 1,
      width: 180,
      aspectRatio: 2/3,
   },
   image: {
      zIndex: 1,
      borderRadius: 10,
      width: "100%",
      height: "100%",
   },
   title: {
      width: "80%",
      textAlign: "center",
      marginTop: 20,
      fontSize: 18,
      color: "#fff",
   },
   authors: {
      marginTop: 3,
      fontSize: 14,
      width: "50%",
      textAlign: 'center',
      color: "#A8A8A8"
   },
   btnsContainer: {
      marginTop: 30,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
   },
   transparentBtn: {
      justifyContent: 'center',
      width: "44%",
      aspectRatio: 10/3,
      borderRadius: 15,
      borderWidth: 2.5,
   },
   transparentBtnText: {
      textAlign: 'center',
      width: '100%',
      fontSize: 17,
      fontWeight: "500",
      color: "#47A538"
   },
   greenBtn: {
      justifyContent: 'center',
      width: "44%",
      borderRadius: 15,
      backgroundColor: "#47A538",
   },
   greenBtnText: {
      textAlign: 'center',
      fontSize: 17,
      width: '100%',
      fontWeight: '700',
      color: "#111111"
   },
   pageCountContainer: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems:'center',
      minWidth: 120,
      width: "30%",
      flexDirection: "row",
   },
   iconPage: {
      width: 24,
      height: 24,
   },
   pageCount: {
      textAlignVertical: 'center',
      textAlign: 'right',
      flex: 1,
      color: '#fff',
      fontSize: 16,
   },
   descriptionTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   descriptionTitle:{
      flex: 1,
      color: '#fff',
      fontSize: 20,
      fontWeight: '700',
   },
   descriptionContainer: {
      marginTop: 10,
      width: '90%',
   },
   description: {
      marginTop: 15,
      color: 'white',

   } 
})