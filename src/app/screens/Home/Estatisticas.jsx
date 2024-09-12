import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Estatisticas({navigation, setFocusHeight}){

    useEffect( () => {
        const adjustHeight = navigation.addListener('focus', (e) => {
            setFocusHeight(500);
            // startAnim();
        })

        return adjustHeight
    }, []);

    return (
        <View className="bg-screen-black" style={styles.screen}>
            <Text style={styles.text} numberOfLines={1}>Bem vindo as estatisticas</Text>
        </View>
    )
}
const styles = StyleSheet.create({
   screen: {
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