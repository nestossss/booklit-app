import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { UserContext } from "../../../contexts/UserContext";
import { LivroCard } from "../../../components/LivroCard";

import axios from "axios";
 
const googleKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

if(googleKey)  console.log(googleKey);
if(!googleKey) console.log("googleKey nao existe");

export default function HomePage(){

    const [bookList, setBookList] = useState([]);
    useEffect( () => { getBooks() }, [])
    
    let [userInfo] = useContext(UserContext);

    async function getBooks(){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=alice no país&key=${googleKey}`)
        setBookList(res.data.items);
    }

    const renderBookList = ({item}) => {
        console.log(item)
        if(item.id){
            return <LivroCard googleId={item.id} title={item.volumeInfo.title} imageUrl={item.volumeInfo?.imageLinks?.thumbnail} authors={item.volumeInfo?.authors}/>
        }
    }

    return (
        <View style={styles.screen}>
            <Text>Livros </Text>
            <FlatList 
                horizontal
                data={bookList}
                renderItem={ renderBookList }
                keyExtractor={item => item.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
   screen: {
       backgroundColor: "black",
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
