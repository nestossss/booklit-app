import { StyleSheet, View, Text, FlatList } from "react-native";
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

    if(lib?.sendoLidos?.length > 0){
        return (
        <View className="bg-screen-black" style={styles.screen}>
             <FlatList 
                data={ lib.sendoLidos }
                renderItem={ renderSendoLidos }
                keyExtractor={item => item.idlivro}
            />
        </View>
        )
    }
    return <View className="bg-screen-black flex-1 justify-center">
        <Text className="text-white text-center font-semibold text-lg">Nenhum livro sendo lido.</Text>
    </View>
    
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
