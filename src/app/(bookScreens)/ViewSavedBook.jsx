import { Link, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView, FlatList, TouchableWithoutFeedback } from "react-native";
import { LoadingScreen } from "../../components/LoadingScreen";
import { Octicons, FontAwesome6, MaterialIcons, Entypo} from "@expo/vector-icons";
import axios from "axios";
import api from "../../api/api";
import { Note } from "../../components/Note";
import { useLib } from "../../hooks/useLib";

export default function ViewSavedBook(){
   
   const { 
      googleId
   } = useLocalSearchParams();

   const [userInfo] = useContext(UserContext);

   const [isDescriptionExpanded, setDescriptionExpanded] = useState();

   const [lib] = useLib();
   const [book, setBook] = useState(null);
   const [paginasLidas, setPaginasLidas] = useState(0);
   const [tempoLido, setTempoLido] = useState(0);
   const [notas, setNotas] = useState([]);

   
   function searchRecord(lib, bookUrl){
     if(!bookUrl) return null
     for(let i = 0; i < Object.keys(lib).length; i++){
        const records = lib[Object.keys(lib)[i]];
        const found = records.find(record => record.livro.bookUrl == bookUrl);
        if(found) console.log(found)
        if(found) return found;
     }
     return null;
   };


   const getBook = async () => {
      let res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${googleId}`).catch( (reason) => { console.log("getBook EditLivro"); console.log(reason)});
      let volumeInfo = res?.data?.volumeInfo;
      if(volumeInfo){
         return setBook(volumeInfo);
      }
      return setBook({
         naoEncontrado: true,
      });
   }
   const getRegistro = async () => {
      let record = searchRecord(lib, googleId);
      if(record){
         setNotas(record.notas);
         setPaginasLidas(record.paginasLidas);
         setTempoLido(record.tempoLido);
      }
   }

   /*
    
      title,
      authors,
      totalPag,
      pagLidas,
      imgUri,
   }
    *
    */

   function handleCronometro(){
      router.navigate({
         pathname: '/Cronometro',
         params: {
            'googleId': googleId,
            'title':book.title, 
            'authors': book.authors,
            'totalPagParams': book.pageCount,
            'pagLidasParams': paginasLidas,
            'tempoLidoParams': tempoLido,
            'imgUri': (book?.imageLinks?.medium?
            book.imageLinks.medium : book?.imageLinks?.large?
            book.imageLinks.large  : book?.imageLinks?.small?
            book.imageLinks.small  : book?.imageLinks?.extraLarge).replace('http://', 'https://'),
         }
      })
   } 

   useEffect( () => {
      getBook();
   }, [])
   
   useEffect( ()=>{
      getRegistro();
   },[lib])

   if(book == null){
      return (
         <LoadingScreen />
      )
   }
   if(book.naoEncontrado){
      return <Text>Nao encontrado</Text>
   }

   return (
      <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#111111'}}>
         <View style={styles.backgroundView}></View>
         <View style={{height: 120, width: '90%'}}>
            <Text style={styles.title}>{book.title}</Text>
         </View>
         <View style={styles.infoContainer}>
            <View style={styles.imgContainer}>
               <Image
                  style={{flex: 1, borderRadius: 20}}
                  source={{
                     uri: book?.imageLinks?.medium?
                     book.imageLinks.medium : book?.imageLinks?.large?
                     book.imageLinks.large  : book?.imageLinks?.small?
                     book.imageLinks.small  : book?.imageLinks?.extraLarge,
                  }} 
               />
            </View>
            <View style={styles.textInfoContainer}>
               <Text style={styles.textInfo}numberOfLines={2}>{book?.authors?.toString()}</Text>
               <Text style={styles.textInfo} numberOfLines={1}>{paginasLidas}/{book.pageCount}</Text>
               <Text style={styles.textInfo} numberOfLines={1}>
                  {Math.floor(tempoLido/3600000)}
                  :
                  {Math.floor((tempoLido % 3600000) / 60000).toString().padStart(2, '0')}
                  :
                  {Math.floor((tempoLido % 60000) / 1000).toString().padStart(2, '0')}
               </Text>
               <View style={styles.btnsContainer}>
                  <TouchableOpacity 
                     onPress={ handleCronometro }
                     style={styles.buttonCronometro}>
                     <MaterialIcons name="access-alarm" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { router.navigate('main/Home')}} style={styles.buttonNotas}>
                     <FontAwesome6 name="house" size={20} color="white" />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
         <View style={styles.descriptionContainer}>
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
            <Text 
               numberOfLines={isDescriptionExpanded? undefined : 2 }
               style={[styles.description, {color: isDescriptionExpanded? '#fff' : '#A0A0A0'}]}
            >
               {book.description+'\n'}
            </Text>
         </View>

         <Link href={{
            pathname: notas.length > 0? "/NoteScreen" : "/NoteEditScreen",
            params: {
               googleId: googleId.toString()
            }
         }} asChild>
            <TouchableWithoutFeedback>
               <View style={styles.noteContainer}>
                 <View className="flex-row justify-between items-center mb-6 w-full">
                   <View className="w-1/2">
                     <Text className="text-2xl font-bold text-white mb-1">Notas</Text>
                     <Text className="text-sm text-white">{notas.length} nota{notas.length !== 1 ? 's' : ''}</Text>
                   </View>
                   {/* <View className="h-10 w-10 justify-center items-center">
                     <Octicons name="filter" size={18} color="white" />
                   </View> */}
                 </View>

                 {
                  notas.length > 0? notas.map(nota => (
                     <Note googleId={googleId} canExpand={false} note={nota}/>
                   )): <View className="w-full mt-4">
                      <Text className="text-center text-white text-base font-medium">Clique para criar uma nota</Text>
                  </View> 
                 }
                 {/* <View>
                     <Text className="text-white">Salva nova</Text>
                 </View> */}
               </View>
            </TouchableWithoutFeedback>
         </Link>

      </ScrollView>   
   )
}

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   backgroundView: {
      position: 'absolute',
      width: '100%',
      height: 240,
      backgroundColor: '#47A538',
      borderBottomRightRadius: 45,
   },
   infoContainer: {
      width: '90%',
      flex: 0.4,
      flexDirection: 'row',
      columnGap: 14,
   },
   imgContainer:{
      flex: 1,
      width: '100%',
      aspectRatio: 2/3
   },
   textInfoContainer: {
      flex: 2
   },
   textInfo: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 16,
      color: '#fff'
   },
   title: {
      fontFamily: 'OpenSans_700Bold',
      fontSize: 30,
      color: '#fff',
   },
   btnsContainer: {
      height: 40,
      borderRadius: 50,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 100,
      bottom: 40,
      right: 50,
   },
   buttonCronometro: {
      flex: 1,
      borderTopLeftRadius:25,
      borderBottomLeftRadius: 25,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      borderRightWidth: 2,
      borderColor: '#fff',
   },
   buttonNotas: {
      flex: 1,
      borderTopRightRadius: 25,
      borderBottomRightRadius: 25,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
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
      marginTop: 20,
      width: '90%',
      flex: 1,
   },
   description: {
      marginTop: 15,
      flexShrink: 1
   },
   noteContainer: {
      width: "90%",
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
   }

})