import { StyleSheet, View, Text, Image, FlatList, Dimensions, ScrollView } from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext } from "react";
import { Link, useFocusEffect } from "expo-router";
import { useLib } from "../../../hooks/useLib";
import { LivroItemCard } from "../../../components/LivroItemCard";
export default function Terminados(){

    const [titleFocused, setFocused] = useContext(RouteFocusContext);
    const [lib, setLib] = useLib();

    useFocusEffect( useCallback(() => {
        setFocused('Terminados');
    }, [] ) );

   
    if(lib.terminados && lib.terminados.length > 0)
        return (
            <ScrollView className="bg-screen-black" contentContainerStyle={styles.screen}>
                { lib.terminados.map( item => {
                    return <LivroItemCard info={item} type="terminado"/>
                })
                }
            </ScrollView>
    )
    return <View className="bg-screen-black flex-1 justify-center">
        <Text className="text-white text-center font-semibold text-lg">Nenhum livro terminado.</Text>
    </View>
}

const styles = StyleSheet.create({
   screen: {
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        gap: Dimensions.get('window').width*0.03,
        paddingHorizontal: Dimensions.get('window').width*0.02,
        paddingVertical: Dimensions.get('window').width*0.03
    },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
