import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { StatusBar as StatusBarExpo } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useContext } from 'react';
import { RouteFocusContext } from '../contexts/RouteFocusContext';

export function HeaderBooks({router, text, hasBackButton}){

   const [isFocused, setFocused] = useContext(RouteFocusContext);

   
   if(hasBackButton){
      return (
         <View style={styles.headerContainer}>
            <StatusBarExpo style='light' backgroundColor='#000'/>
            <View style={styles.headerBack}> 
               <TouchableOpacity 
                  activeOpacity={0.4} 
                  style={[styles.headerBackBtn]}
                  onPress={ () => { router.goBack() }}  
               >
                  <FontAwesome6 name="angle-left" size={24} color="white" />         
               </TouchableOpacity>
            </View>
            <Text style={styles.headerText} numberOfLines={1}>{text}</Text>
         </View>
      )
   }
   return(
      <View style={styles.headerContainer}>
         <StatusBarExpo style='light' backgroundColor='#000'/>
         <Text style={[styles.headerText, {marginLeft: '10%'}]} numberOfLines={1}>{text}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   headerContainer: {
      marginTop: StatusBar.currentHeight,
      alignItems: 'center',
      flexDirection: 'row',
      height: 80,
      width: '100%',
      backgroundColor: '#47A538',
   },
   headerBack: {
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
      backgroundColor: "#47A538",
   },
   headerBackBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      height:'100%',
      aspectRatio: 1,
   },
   headerText: {
      width: '100%',
      textAlignVertical:'center' ,
      textAlign: 'left',
      height: "100%",
      fontSize: 20,
      fontWeight: '700',
      color: 'white',
   },

   
})