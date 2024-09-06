import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { UserContext } from "../../../contexts/UserContext";
import { LivroCard } from "../../../components/LivroCard";

import axios from "axios";
import { LoadingScreen } from "../../../components/LoadingScreen";
 
const googleKey = 'AIzaSyCAguBVjk_msfejlvRtcpnrKsP0ztNjoto'

if(googleKey)  console.log(googleKey);
if(!googleKey) console.log("googleKey nao existe");

export default function HomePage(){

    const [bookList, setBookList] = useState(null);
    
    useEffect( () => { getBooks() }, [])
    
    let [userInfo] = useContext(UserContext);

    async function getBooks(){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=alice no país&key=${googleKey}`)
        let resBooks = res.data.items;
        let resBooksOk = [];
        await resBooks.forEach( book => {
            if(book.id && book.volumeInfo?.imageLinks?.thumbnail){
                resBooksOk.push(book);
            }
        });
        setBookList(resBooksOk);
    }

    const renderBookList = ({item}) => {
        return <LivroCard key={item.id} googleId={item.id} title={item.volumeInfo.title} imageUrl={item.volumeInfo?.imageLinks?.thumbnail.replace('http://', 'https://')} authors={item.volumeInfo?.authors}/>
    }

    if(!bookList){
        return <LoadingScreen/>
    }
    return (
        <View style={styles.screen}>
            <Text>Livros</Text>
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
   },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
