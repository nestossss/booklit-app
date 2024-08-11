import { StyleSheet, View, Text } from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext } from "react";
import { useFocusEffect } from "expo-router";
 
export default function Salvos(){
    const [titleFocused, setFocused] = useContext(RouteFocusContext);

    useFocusEffect( useCallback(() => {
        setFocused('Livros Salvos');
    }, [] ) );
    return (
        <View style={styles.screen}>
            <Text> ajuda socorro - salvo</Text>
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
