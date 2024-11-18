import { StyleSheet, View, Text, FlatList} from "react-native";
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
    
    return (
        <View className="bg-screen-black" style={styles.screen}>
             <FlatList 
                data={ lib.salvos }
                renderItem={ renderSalvos }
                keyExtractor={item => item.idlivro}
            />
        </View>
    )
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
