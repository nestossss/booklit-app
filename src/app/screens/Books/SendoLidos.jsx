import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions } from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext } from "react";
import { useFocusEffect } from "expo-router";
import { useLib } from "../../../hooks/useLib";
import { LivroItemCard } from "../../../components/LivroItemCard";
export default function SendoLidos(){
    const [titleFocused, setFocused] = useContext(RouteFocusContext);

    const [lib, setLib] = useLib()

    useFocusEffect( useCallback(() => {
        setFocused('Sendo Lidos');
    }, [] ) );

    function renderSendoLidos({item}){
        return <LivroItemCard
            key={"idsendolido:"+item.livro.bookUrl}
            type="salvo"
            info={item}
        />
    }

    if(lib.sendoLidos && lib.sendoLidos.length > 0)
        return (
            <ScrollView className="bg-screen-black" contentContainerStyle={styles.screen}>
                { lib.sendoLidos.map( item => {
                    return <LivroItemCard key={"idsendolido:"+item.livro.idlivro.toString()} info={item} type="salvo"/>
                })
                }
            </ScrollView>
    )
    return <View className="bg-screen-black flex-1 justify-center">
        <Text className="text-white text-center font-semibold text-lg">Nenhum livro sendo lido.</Text>
    </View>
    
}
const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
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
