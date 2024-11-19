import { Link, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Animated} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

import { UserContext } from "../../contexts/UserContext";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useLib } from "../../hooks/useLib";

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

function Cronometro(){
   let { 
      googleId,
      title,
      authors,
      imgUri,
      totalPagParams,
      pagLidasParams,
      tempoLidoParams,
   } = useLocalSearchParams();

   const [lib, setLib] = useLib();

   const [isPaused, setIsPaused] = useState(true);
   const readingTime = useRef(tempoLidoParams? Math.floor(Number(tempoLidoParams)): 0);
   const intervalId = useRef(0);

   const [seconds, setSeconds] = useState(0);
   const [minutes, setMinutes] = useState(0);
   const [hours, setHours] = useState(0);

   const [totalPag, setTotalPag] = useState(0);
   const [pagLidas, setPagLidas] = useState(0);

   const [recordExists, setRecordExists] = useState();

   useEffect( () => {
      setTotalPag(Number(totalPagParams));
      setPagLidas(Number(pagLidasParams));
      setSeconds(Math.floor((Number(tempoLidoParams) % 60000) / 1000)); 
      setMinutes(Math.floor((Number(tempoLidoParams) % 3600000) / 60000));
      setHours(Math.floor(Number(tempoLidoParams) / 3600000));

   }, []);

   function handlePause() {
      let currentIsPaused = !isPaused;
      setIsPaused(!isPaused);

      if(!currentIsPaused){
         console.log(isPaused);
         let timer = setInterval(() => {
            readingTime.current = readingTime.current+100;
            if(readingTime.current % 1000 != 0){
               setSeconds(Math.floor((readingTime.current % 60000) / 1000)); 
               setMinutes(Math.floor((readingTime.current % 3600000) / 60000));
               setHours(Math.floor(readingTime.current / 3600000));
            }
         }, 100);
         intervalId.current = timer;
      } else {
         clearInterval(intervalId.current);
      }
    }

    useEffect( () => {
      let record = searchRecord(lib, googleId);
      if(!record) return setRecordExists(false);
      return setRecordExists(true);
    }, [])

   return (
      <View style={[styles.container, { backgroundColor: isPaused? '#111111': '#47A538'  }]}>
         <View style={[styles.containerBtns, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <TouchableOpacity
               onPress={ () => {
                  clearInterval(intervalId.current);
                  router.back();
               } } 
               style={[styles.exitBtn, {height: 50, width: isPaused? 140 : 70, backgroundColor: isPaused? '#47A538':'#068E2C'}]}
            >
               <View style={styles.button}>
                  <Text 
                     numberOfLines={1}
                     style={[{display: isPaused? 'flex': 'none'}, styles.textBtn]}
                  >
                     Sair
                  </Text>
                  <Ionicons name="close" size={30} color="#fff" />   
               </View>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => {
                  router.navigate({
                     pathname: '/EditLivro',
                     params: {
                        'googleId': googleId,
                        'pagLidasParams': pagLidas,
                        'pagTotaisParams': totalPag,
                        'tempoLidoParams': readingTime.current,
                        'statusParams': pagLidas == 0? "Salvo" : pagLidas >= totalPag? 'Terminado': "Sendo lido"
                     }
                  })
                  clearInterval(intervalId.current);
                  setTimeout( () => setIsPaused(true), 1000)
               }} 
               style={[styles.confirmBtn, { height: 50, width: isPaused? 70 :  140 , backgroundColor: isPaused? '#47A538':'#068E2C'}]}
            >
               <View style={styles.button}>
                  <FontAwesome6 name="check" size={24} color="#fff" />
                  <Text 
                     numberOfLines={1}
                     style={[styles.textBtn, { display: isPaused? 'none': 'flex'}]}
                  >Feito</Text>
               </View>
            </TouchableOpacity>
         </View>
         
         <View style={{flex: 3, justifyContent: 'center'}}>
            <View style={styles.timeContainer}>
               <Text 
                  numberOfLines={1}
                  style={[styles.textTime, { color: isPaused?'#47A538' : '#fff'}]}
               >
                  {hours < 10? '0'+hours : hours}:{minutes < 10? '0'+minutes: minutes}:{seconds < 10? '0'+seconds: seconds} </Text>
               <Text 
                  numberOfLines={1}
                  style={[styles.textPause, { color: isPaused? '#939393': '#fff'}]}
                  >
                  {isPaused? 'Esperando...' : 'Leitura...'}
               </Text>
               <TouchableOpacity
                  style={ styles.pauseContainer }
                  onPress={ () => { handlePause() } }
               >
                  <View style={[styles.pauseCircle, { 
                     borderColor: isPaused? '#47A53859' : '#068E2C59', 
                     backgroundColor: isPaused? '#47A538' : '#068E2C' 
                  }]}>
                     {
                        isPaused?
                        <FontAwesome6 name="play" size={60} color="#fff"/>
                        :
                        <FontAwesome6 name="pause" size={60} color='#fff' />
                     }
                  </View>
               </TouchableOpacity>
            </View>
         </View>
         <View style={{width: '100%', flex: 1.2, justifyContent: 'flex-end', alignItems: 'center', marginBottom: Dimensions.get('window').width * 0.05}}>         
            <View style={[styles.overviewContainer, { backgroundColor: isPaused? '#00000050' : '#39B96C59', borderColor: isPaused? '#00000000': '#39B96C'}]}>
               <View style={styles.overviewImgContainer}>
                  <Image 
                   source={{
                      uri: imgUri,
                   }} 
                   style={{width: '100%', height: '100%', borderRadius: 10}}/> 
               </View>
               <View style={{flex: 2}}>
                  <Text
                     numberOfLines={2}
                     style={styles.overviewTitle}   
                  >
                     {title}
                  </Text>
                  <Text 
                     numberOfLines={1}
                     style={[styles.overviewAuthors,  {color: isPaused? '#939393': '#235838'  }]}
                  >
                     {authors?.toString().toUpperCase()}
                  </Text>
                  <Text
                     numberOfLines={1}
                     style={[styles.overviewPages, {color: isPaused?'#939393': '#235838' }]}
                  >  
                     {pagLidas}/{totalPag}
                  </Text>
               </View>
               
               <Link 
                  href={{
                     pathname: "/NoteEditScreen",
                     params: {                 
                        googleId,    
                     }  
               }}
                  asChild
                  disabled={!recordExists}
               >
                  <TouchableOpacity>
                     <View className={"w-12 h-12 absolute bottom-1 right-1 justify-center items-center rounded-full "+ (isPaused? "bg-main-green":"bg-[#068e2c]")}>
                        <Image className="w-[25] h-[29]" source={require('../../../assets/icons/note-icon.png')}/>
                     </View>
                  </TouchableOpacity>
               </Link>
            </View>
         </View>
      </View>
   )
}

export default Cronometro; 

const styles = StyleSheet.create({
   container: {
      paddingTop: StatusBar.currentHeight + 8,
      alignItems: 'center',
      flex: 1,
   },
   timeContainer: {
      alignItems: 'center',
      rowGap: 20,
   },
   containerBtns: {
      flex: 0.5,
      width: '100%',
      flexDirection: 'row',
   },
   button: {
      flexDirection: 'row',
   },
   confirmBtn: {
      alignItems: 'center', 
      justifyContent: 'center', 
      borderTopLeftRadius: 25, 
      borderBottomLeftRadius: 25
   },
   exitBtn: {
      alignItems: 'center', 
      justifyContent: 'center', 
      borderTopRightRadius: 25, 
      borderBottomRightRadius: 25
   },
   textBtn: {
      color: '#fff', 
      verticalAlign: 'middle', 
      width: 60, 
      textAlign: 'center'
   },
   textTime: {
      fontFamily: 'Nunito_700Bold',
      fontSize: 45,
      textAlign: 'center',
   },
   textPause: {
      fontSize: 15,
      fontFamily: 'OpenSans_600SemiBold',
      textAlign: 'center',
   },
   pauseContainer: {
      width: 140,
      height: 140,
   },
   pauseCircle: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 70,
      borderWidth: 18,
   },

   overviewContainer: {
      columnGap: 18,
      width: '90%',
      padding: 14,
      shadowColor: '#000000',
      shadowOffset: {
         width: 4,
         height: 4,
      },
      shadowOpacity: 0.9,
      shadowRadius: 1,
      borderWidth: 1,
      flexDirection: 'row',
      borderRadius: 15,
   },
   overviewImgContainer: {
      flex: 1,
      aspectRatio: 2/3
   },
   overviewTitle: {
      fontFamily: 'OpenSans_700Bold',
      fontSize: 20,
      color: '#fff',
   },
   overviewAuthors: {

   },
   overviewPages:{
   },
})