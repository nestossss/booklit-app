import { StyleSheet, View, Text } from "react-native";
 
export default function Metas(){
    return (
        <View style={styles.screen}>
            <Text style={styles.text} numberOfLines={1}>Bem vindo a Metas</Text>
        </View>
    )
}
const styles = StyleSheet.create({
   screen: {
       backgroundColor: "black",
       flex: 1,
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