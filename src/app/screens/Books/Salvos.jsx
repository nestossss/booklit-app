import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions} from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "expo-router";
import { LivroHomeCard, LivroItemCard } from "../../../components/LivroItemCard";

import { useLib } from "../../../hooks/useLib";
 
export default function Salvos(){

    const [titleFocused, setFocused] = useContext(RouteFocusContext);
    const [lib, setLib] = useLib();

    function renderSalvos({item}){
        return <LivroItemCard
            key={"idsalvo:"+item.livro.bookUrl}
            type="salvo"
            info={item}
        />
    }
  
    useFocusEffect( useCallback(() => {
        setFocused('Livros Salvos');
    }, [] ) );
    
    if(lib.salvos && lib.salvos.length > 0)
        return (
            <ScrollView className="bg-screen-black" contentContainerStyle={styles.screen}>
                { lib.salvos.map( item => {
                    return <LivroItemCard key={"idsalvo:"+item.livro.idlivro.toString()} info={item} type="salvo"/>
                })
                }
            </ScrollView>
    )
    return <View className="bg-screen-black flex-1 justify-center">
        <Text className="text-white text-center font-semibold text-lg">Nenhum livro salvo.</Text>
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
