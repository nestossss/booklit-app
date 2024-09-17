import { StyleSheet, View, Text, FlatList } from "react-native";
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
        <View className="flex-1 bg-screen-black items-center justify-center py-16">
            <FlatList 
                

            />
        </View>
    )
}
const styles = StyleSheet.create({
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
