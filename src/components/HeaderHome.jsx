import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { StatusBar as StatusBarExpo } from 'expo-status-bar';

export function HeaderHome({text}){

   return (
      <View style={styles.headerContainer}>
         <StatusBarExpo style='light' backgroundColor='#000'/>
         <Text style={styles.headerText} numberOfLines={1}>{text}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   headerContainer: {
      paddingTop: StatusBar.currentHeight,
      alignItems: 'center',
      flexDirection: 'row',
      height: 100,
      width: '100%',
      backgroundColor: '#47A538',
   },
   headerText: {
      marginLeft: 25, 
      width: '100%',
      textAlignVertical:'center' ,
      textAlign: 'left',
      height: "100%",
      fontSize: 22,
      fontWeight: '700',
      color: 'white',
   },

   
})