import { StyleSheet, View, Text } from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext } from "react";
import { useFocusEffect } from "expo-router";
import { useLib } from "../../../hooks/useLib";
export default function SendoLidos(){
    const [titleFocused, setFocused] = useContext(RouteFocusContext);

    const [lib, setLib] = useLib()

    useFocusEffect( useCallback(() => {
        setFocused('Sendo Lidos');
    }, [] ) );

    return (
        <View className="bg-screen-black" style={styles.screen}>
            <Text> oi </Text>
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
