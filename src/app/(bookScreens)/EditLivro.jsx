import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, StatusBar, TextInput, Alert, ScrollView} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { LoadingScreen } from "../../components/LoadingScreen";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { UserContext } from "../../contexts/UserContext";
import { useChangesMade } from "../../hooks/useChangesMade";

export default function EditLivro(){
   
   const { 
      googleId,
      tempoLidoParams,
      pagLidasParams,
      pagTotaisParams,
      statusParams,
   } = useLocalSearchParams();

   const [userInfo, setUserInfo] = useContext(UserContext);

   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);
   const [seconds, setSeconds] = useState(0);

   const [pagLidas, setPagLidas] = useState(0);
   const [totalPag, setTotalPag] = useState(0);
   const [bookStatus, setBookStatus] = useState();

   const [changesMade, setChangesMade] = useChangesMade();
   
   useEffect( () => {
      setBookStatus(statusParams)
      setTotalPag(Number(pagTotaisParams));
      setPagLidas(Number(pagLidasParams));
      setSeconds(Math.floor((Number(tempoLidoParams) % 60000) / 1000)); 
      setMinutes(Math.floor((Number(tempoLidoParams) % 3600000) / 60000));
      setHours(Math.floor(Number(tempoLidoParams) / 3600000));

   }, []);

   function handleHoursInput(text){
      let convertedHours = Number(text);
      if(convertedHours != hours && !isNaN(convertedHours)){
         if(convertedHours > 1000){
            Alert.alert('Número de horas inválido', 
               'Não é possível salvar números acima de 1000 horas',
               [{
                  text: 'Ok',
                  onPress: () => {},
               }]
            )
            return setHours(999);
         }
         return setHours(convertedHours);
      }
   }

   function handleMinutesInput(text){
      let convertedMinutes = Number(text);
      if(convertedMinutes != minutes && !isNaN(convertedMinutes)){
         if(convertedMinutes >= 60){
            return setMinutes(59)
         }
         return setMinutes(convertedMinutes)
      }
   }
   function handleSecondsInput(text){
      let convertedSeconds = Number(text);
      if(convertedSeconds != seconds && !isNaN(convertedSeconds)){
         if(convertedSeconds >= 60){
            return setSeconds(59)
         }
         return setSeconds(convertedSeconds)
      }    
   }
   function handlePagLidasInput(text){
      let convertedPagLidas = Number(text);
      if(convertedPagLidas != pagLidas && !isNaN(convertedPagLidas)){
         if(convertedPagLidas >= totalPag){
            setBookStatus('Terminado');
            return setPagLidas(totalPag);
         }
         if(convertedPagLidas > 0){
            setBookStatus('Sendo lido');
         }
         return setPagLidas(convertedPagLidas)
      } 
      setBookStatus('Salvo')
      return setPagLidas(0)
   }

   async function handleSalvar(){
      let headers = {
         Authorization: 'Bearer '+userInfo.token 
      }
      let body =  {
         bookUrl: googleId
      };
      let res = await api.get('/lib/registro?bookUrl='+googleId, { headers }).catch( (err) => { console.log("handle salvar"); console.log(err) })
      let idlivro = res?.data?.registro?.idlivro;
      console.log(idlivro)

      if(!idlivro){
         res = await api.put('/lib/adicionar/existente', body, { headers }).catch( (err) => { console.log("handle salvar 2"); console.log(err) })
         idlivro = res?.data?.registro?.livro?.idlivro;
         console.log(idlivro)
      }
      if(!idlivro) return console.log('erro ao salvar 1');
      let tempoLido = (hours*3600000 + minutes * 60000 + seconds * 1000);
      body = {
         'paginasLidas': pagLidas,
         'tempoLido': tempoLido,
      }
      console.log('tempoLido: ', tempoLido, "paginas: ", pagLidas)
      res = await api.put('/lib/atualizar?id='+idlivro, body, { headers }).catch( (err) => { console.log("handle salvar 3"); console.log(err)} )
      if(res?.data?.status != 200) return console.log('erro ao salvar 2');
      setChangesMade(true);
      return router.navigate({
            pathname: '/ViewSavedBook',
            params: {
               'googleId': googleId,
            }
         })
   }

   return (
      
      <ScrollView contentContainerStyle={styles.container}> 
         <View style={[styles.containerBtns, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <TouchableOpacity
               onPress={ router.back }
               style={[styles.exitBtn]}
            >
               <View style={styles.button}>
                  <Ionicons name="close" size={30} color="#fff" />   
               </View>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => { handleSalvar() }} 
               style={[styles.confirmBtn, { height: 50, width: 140 , backgroundColor: '#068E2C'}]}
            >
               <View style={styles.button}>
                  <FontAwesome6 name="check" size={24} color="#fff" />
                  <Text 
                     numberOfLines={1}
                     style={[styles.textBtn]}
                  >Feito</Text>
               </View>
            </TouchableOpacity>
         </View>
         <View style={{flex: 4.2, width: '90%', rowGap: 25}}>
            <View style={styles.headingContainer}>
               <Text style={styles.headingText}>
                  Salvar sessão de leitura
               </Text>
               <Text style={styles.subHeadingText}>
                  Verifique o conteúdo a ser salvo
               </Text>
            </View>

            <View style={styles.infoContainer}>

               <View style={styles.infoItem}>
                  <View style={styles.infoItemImgContainer}> 
                     <Image resizeMode="center" style={styles.infoIcon} source={require('../../../assets/icons/stopwatch-green.png')}/>
                  </View>
                  <View style={styles.infoItemTextContainer}>
                     <Text style={styles.infoItemTextTitle}>Tempo de leitura</Text>
                     <View style={{
                        flexDirection: 'row',
                        width: '100%',
                     }}>
                        <TextInput
                           style={styles.infoItemText}
                           inputMode="numeric"
                           defaultValue=""
                           onChangeText={ handleHoursInput }
                           value={hours > 10? hours.toString() : '0'+hours}
                        /> 
                        <Text style={styles.infoItemText}>:</Text>
                        <View>
                           <TextInput
                              style={[styles.infoItemText]}
                              inputMode="numeric"
                              defaultValue=""
                              onChangeText={ handleMinutesInput }
                              value={minutes> 10? minutes.toString() : '0'+ minutes}
                           />
                        </View>
                        <Text style={styles.infoItemText}>:</Text>
                           <View>
                              <TextInput
                                 style={styles.infoItemText}
                                 inputMode="numeric"
                                 defaultValue=""
                                 onChangeText={ handleSecondsInput }
                                 value={seconds>10? seconds.toString() : '0'+seconds}
                              />
                           </View>
                        </View>
                     </View>
               </View>

               <View style={styles.infoItem}>
                  <View style={styles.infoItemImgContainer}> 
                     <Image resizeMode="center" style={styles.infoIcon} source={require('../../../assets/icons/bookmark-green-filled.png')}/>
                  </View>
                  <View style={styles.infoItemTextContainer}>
                     <Text style={styles.infoItemTextTitle}>Páginas lidas</Text>
                     <View style={{flexDirection: 'row'}}>
                        <TextInput
                           style={styles.infoItemText}
                           inputMode="numeric"
                           onChangeText={ handlePagLidasInput }
                           defaultValue=''
                           value={pagLidas.toString()}
                        /> 
                        <Text style={styles.infoItemText}> / {totalPag}</Text>
                     </View>
                  </View>
               </View>

               <View style={styles.infoItem}>
                  <View style={styles.infoItemImgContainer}> 
                     <Image resizeMode="center" style={styles.infoIcon} source={require('../../../assets/icons/book-open-green-4x.png')}/>
                  </View>
                  <View style={styles.infoItemTextContainer}>
                     <Text style={styles.infoItemTextTitle}>Status</Text>
                     <Text style={styles.infoItemText}>{ bookStatus }</Text>
                  </View>                  
               </View>
            </View>

            <View style={styles.statusContainer}></View>
            
         </View>
      </ScrollView>   
   )
}

//
// <FontAwesome5 name={focused? 'book-open' : 'book'} size={18} color='#47A538' />,
const styles = StyleSheet.create({
   container: {
      backgroundColor: '#111111',
      paddingTop: StatusBar.currentHeight + 8,
      alignItems: 'center',
      minHeight: '100%',
      width: '100%',
      height: Dimensions.get('window').height + StatusBar.currentHeight
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
      height: 50, 
      width: 70, 
      backgroundColor: '#111111'
   },
   textBtn: {
      color: '#fff', 
      verticalAlign: 'middle', 
      width: 60, 
      textAlign: 'center'
   },
   headingText: {
      fontFamily: 'OpenSans_700Bold',
      fontSize: 36,
      color: '#47A538',
   },
   subHeadingText: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 18,
      color: '#939393',
   },
   headingContainer: {
      justifyContent: 'center',
      flex: 1,
   },
   infoContainer: {
      flex: 3,
      rowGap: 15,
      justifyContent: 'space-between'
   },
   infoItem: {
      height: '32%',
      flexDirection: 'row',
      backgroundColor: '#000',
   },
   infoItemTextContainer: {
      justifyContent: 'center',
      flex: 4,
   },
   infoItemTextTitle: {
      fontSize: 18,
      color: '#FFFFFF80'
   },
   infoItemText: {
      fontFamily: 'Nunito_700Bold',
      fontSize: 30,
      color: '#fff'
   },
   infoIcon: {
      height: 50,
   },
   infoItemImgContainer: {
      flex: 2,
      justifyContent: 'center', 
      alignItems: 'center',
   },

   statusContainer: {
      flex: 2,

   },
   statusItem:{
      flex: 1,

   }
   
})