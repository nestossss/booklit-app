import { StyleSheet, View, Text, Image } from "react-native";
import { RouteFocusContext } from "../../../contexts/RouteFocusContext";
import { useCallback, useContext } from "react";
import { Link, useFocusEffect } from "expo-router";
import { useLib } from "../../../hooks/useLib";
export default function Terminados(){

    const [titleFocused, setFocused] = useContext(RouteFocusContext);
    const [lib, setLib] = useLib();

    useFocusEffect( useCallback(() => {
        setFocused('Terminados');
    }, [] ) );

    if(lib.terminados && lib.terminados.length > 0)
    return (
        <View style={styles.screen}>
            {lib.terminados.length > 0? lib.terminados.map( (item) => {
                return <Link key={item.livro.bookUrl} asChild href={'/InfoLivro?googleId='+item.livro.bookUrl}>
                    <View style={styles.book}> 
                        <Image style={styles.bookImg} source={{ uri: item.livro.imgUri.replace('http://', 'https://')}}/>
                    </View>
                </Link>
            }): <Text>Nenhum livro terminado</Text>}
        </View>
    )
    return <Text> Vazio</Text>
}
const styles = StyleSheet.create({
   screen: {
       backgroundColor: "black",
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
       paddingVertical: 60,
   },
   book: {
    width: '33.33%',
    aspectRatio: 2/3,
   },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
