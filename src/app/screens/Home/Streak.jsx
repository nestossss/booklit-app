import { StyleSheet, View, Text } from "react-native";
 
export default function Streak(){
    return (
        <View style={styles.screen}>
            <Text style={styles.text} numberOfLines={1}>Bem vindo a Streak</Text>
        </View>
    )
}
const styles = StyleSheet.create({
   screen: {
       backgroundColor: "black",
       flex: 2,
       justifyContent: "center",
       alignItems: "center",
       paddingVertical: 60,
   },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})