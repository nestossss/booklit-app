import 'react-native-reanimated';

import Foundation from '@expo/vector-icons/Foundation';

import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import { Link } from 'expo-router';

export default function HeaderHome(){
   return (
      <View style={styles.screen}>
         <Link href="main/Home" asChild> 
            <TouchableHighlight style={styles.navButton}>
               <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <FontAwesome name="home" size={24} color="white" />
                  <Text style={{ color: "#fff", textAlign: "center", width: "100%"}}>Home</Text>
               </View>
            </TouchableHighlight>
         </Link>
         <Link href="main/Home/Estatisticas" asChild> 
            <TouchableHighlight style={styles.navButton}>
               <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <Foundation name="graph-bar" size={24} color="white" />
                  <Text style={{ color: "#fff", textAlign: "center", width: "100%"}}>Estatisticas</Text>
               </View>
            </TouchableHighlight>
         </Link>
         <Link href="main/Home/Metas" asChild> 
            <TouchableHighlight style={styles.navButton}>
               <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <Feather name="target" size={24} color="white" />            
                  <Text style={{ color: "#fff", textAlign: "center", width: "100%"}}>Metas</Text>
               </View>
            </TouchableHighlight>
         </Link>
         <Link href="main/Home/Streak" asChild>          
            <TouchableHighlight style={styles.navButton}>
               <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <FontAwesome name="trophy" size={24} color="white"/>
                  <Text style={{ color: "#fff", textAlign: "center", width: "100%"}}>Streak</Text>
               </View>
            </TouchableHighlight>
         </Link>
      </View>
   )
}

const styles = StyleSheet.create({
   screen: {
       flexDirection: "row",
       backgroundColor: "#47A538",
       flex: 0.2,
       maxHeight: 150,
       justifyContent: "center",
       alignItems: "center",
   },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
   navButton: {
      textAlign: "center",
      flex: 1,
      alignItems: "center",
   },
})