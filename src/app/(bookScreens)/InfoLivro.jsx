import { Link, router, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableHighlight, StyleSheet, ActivityIndicator, Pressable } from "react-native";

import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

import axios from "axios";
import api from "../../api/api";

import { UserContext } from "../../contexts/UserContext";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useLib } from "../../hooks/useLib";
import { useChangesMade } from "../../hooks/useChangesMade";

const googleKey = 'AIzaSyCAguBVjk_msfejlvRtcpnrKsP0ztNjoto';

export default function InfoLivro(){

   const [pressBorderColor, setPressBorderColor] = useState({borderColor: "#47A538"});
   
   function handlePressInSalvar(){
      setPressBorderColor({borderColor: '#104010'})
   }
   function handlePressOutSalvar(){
      setPressBorderColor({borderColor: "#47A538"});
   }

   const [lib, setLib] = useLib();
   const [changesMade, setChangesMade] = useChangesMade();

   const [book, setBook] = useState();
   const [isLivroSalvo, setLivroSalvo] = useState(null);

   const [livroId, setLivroId] = useState(null);
   const [pagLidas, setPagLidas] = useState(0);
   const [tempoLido, setTempoLido] = useState(0);

   const [isDescriptionExpanded, setDescriptionExpanded] = useState();
   const [userInfo] = useContext(UserContext);

   const { googleId } = useLocalSearchParams();
   
   const getBook = async (signal) => {
      let res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${googleId}`, { signal }).catch( (reason) => { console.log("getBook"); console.log(reason)});
      let volumeInfo = res?.data?.volumeInfo;
      if(volumeInfo){
         return setBook(volumeInfo);
      }
      return setBook({
         naoEncontrado: true,
      });
   }

   const getRegistro = async (signal) => {
      let res = await api.get("/lib/registro?bookUrl="+ googleId, {
         signal,
         headers: {
            Authorization: 'Bearer '+ userInfo.token,
         }
      }).catch( (err) => {console.log("getRegistro"); console.log(err)} );

      if(res?.data?.registro){ 
         console.log(tempoLido, '>', res.data.registro.tempo_lido)
         setLivroId(res.data.registro.idlivro);
         setTempoLido(res.data.registro.tempo_lido);
         setPagLidas(res.data.registro.paginas_lidas);
         return setLivroSalvo(true);
      }
      else {
         setLivroId(null);
         setLivroSalvo(false);
      }
   }


   async function adicionar(signal) {
      if(livroId == null) return;
      let body = {
         'bookUrl': googleId,
      };
      let headers = {
         Authorization: "Bearer "+ userInfo.token
      }
      
      let res = await api.put('/lib/adicionar/existente', body, { headers, signal })
      .catch( (err) => {console.log("adicionar"); console.log(err)} );
      console.log(res?.data);
      if(res?.data?.registro?.livro?.idlivro){
         setLivroId(res.data.registro.livro.idlivro);
      }   
      if(res?.status != 200 || !res){
         setLivroSalvo(false)
      }
   }

   async function deletar(signal){
      if(livroId == null) return;
      let headers = {
         Authorization: "Bearer "+ userInfo.token
      }
      let res = await api.delete(`/lib/remover?bookId=${livroId}`, { headers, signal  }).catch( err =>  {console.log("deletar 1"); console.log(err)});
      console.log(res?.data);
      if(res?.status != 200 || !res){
         setLivroSalvo(true);
      }
      setChangesMade(true);
   }

   useEffect( ()=> {
      const controller = new AbortController();
      const signal = controller.signal;

      if(isLivroSalvo != null){
         if(isLivroSalvo) adicionar(signal);
         if(!isLivroSalvo) deletar(signal);
      }
      
      return () => {
         controller.abort();
      }
   }, [isLivroSalvo]);

   async function handlePressSalvar(){
      setLivroSalvo(prev => !prev);
   }

   function handlePressLerAgora(){
      let bookImg = book?.imageLinks?.medium?
      book.imageLinks.medium : book?.imageLinks?.large?
      book.imageLinks.large  : book?.imageLinks?.small?
      book.imageLinks.small  : book?.imageLinks?.extraLarge;

      router.navigate({pathname: `/Cronometro`, params: {
         'googleId': googleId,
         'title': book.title,
         'authors': book.authors,
         'totalPagParams': book.pageCount,
         'imgUri': bookImg.replace('http://', 'https://'),
         'pagLidasParams': pagLidas,
         'tempoLidoParams': tempoLido,
      }})
   }

   useEffect( () => { 
      const controller = new AbortController();
      const signal = controller.signal;
      
      getBook(signal);
      getRegistro(signal);

      return () => {
         controller.abort();
      }
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
                        uri: (book?.imageLinks?.medium?
                        book.imageLinks.medium : book?.imageLinks?.large?
                        book.imageLinks.large  : book?.imageLinks?.small?
                        book.imageLinks.small  : book?.imageLinks?.extraLarge?
                        book.imageLinks.extraLarge : book.imageLinks.thumbnail).replace('http://', 'https://'),
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
                     onPress={ () => { 
                        handlePressSalvar()
                     }}
                     >
                     <Text numberOfLines={1} style={[styles.transparentBtnText]}>
                        { isLivroSalvo? "Livro salvo" : "Salvar"}
                     </Text> 
                  </TouchableHighlight >
                  <TouchableHighlight 
                     style={styles.greenBtn}
                     onPress={ handlePressLerAgora }
                  >
                        <Text numberOfLines={1} style={styles.greenBtnText}>
                           Ler agora
                        </Text>
                  </TouchableHighlight>
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
                  <TouchableHighlight
                     onPress={ ()  => {
                        setDescriptionExpanded(!isDescriptionExpanded)
                     }}
                  >
                     <View style={styles.descriptionTitleContainer}>
                        <Text 
                           numberOfLines={1} 
                           style={styles.descriptionTitle}
                        >
                              Descrição
                        </Text>
                        <Entypo 
                           name="chevron-left" 
                           size={24} 
                           color="white"
                           style={{
                              transform: isDescriptionExpanded? 'rotate(-90deg)': 'rotate(0deg)'
                           }} 
                        />
                     </View>
                  </TouchableHighlight>
                  <Text 
                     numberOfLines={isDescriptionExpanded? undefined : 2 }
                     style={[styles.description, {color: isDescriptionExpanded? '#fff' : '#A0A0A0'}]}
                  >
                     {book.description+'\n\n'}
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
   } 
})