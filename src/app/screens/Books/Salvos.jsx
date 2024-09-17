import { StyleSheet, View, Text, FlatList} from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "expo-router";
import { LivroHomeCard } from "../../../components/LivroHomeCard";

import { useLib } from "../../../hooks/useLib";
 
export default function Salvos(){

    const [titleFocused, setFocused] = useContext(RouteFocusContext);
    const [lib, setLib] = useLib();

    function renderSalvos({item}){
        return <LivroHomeCard
            key={"idsalvo:"+item.livro.bookUrl}
            googleId={item.livro.bookUrl}
            title={item.livro.titulo} 
            imageUrl={item.livro.imgUri.replace('http://', 'https://')} 
            authors={item.livro?.autores}
        />
    }
  
    useFocusEffect( useCallback(() => {
        setFocused('Livros Salvos');
        console.log('olha so ')
    }, [] ) );
    
    return (
        <View className="bg-screen-black" style={styles.screen}>
            <Text> Livros Salvos </Text>
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
       paddingVertical: 60,
   },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
