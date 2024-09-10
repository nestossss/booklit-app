import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StyleSheet, View, Text, Button } from "react-native";
 
export default function User(){

    async function fazerLogout(){
        return await AsyncStorage.removeItem('booklit-auth');
    }

    return (
        <View className="bg-screen-black" style={styles.screen}>
            <Text style={styles.text}>Tela de usuario</Text>
            <Button onPress={() => {
                fazerLogout();
                router.replace('/');
            }}  title="Fazer logout"/>
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
