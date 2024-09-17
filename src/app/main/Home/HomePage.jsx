import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { UserContext } from "../../../contexts/UserContext";
import { LivroHomeCard } from "../../../components/LivroHomeCard";

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

    const renderBookList = ({item, index}) => {
        return <LivroHomeCard index={index} key={item.id} googleId={item.id} title={item.volumeInfo.title} imageUrl={item.volumeInfo?.imageLinks?.thumbnail.replace('http://', 'https://')} authors={item.volumeInfo?.authors}/>
    }

    if(!bookList){
        return <LoadingScreen/>
    }
    return (
        <View className="bg-screen-black justify-center items-center" >
            <Text className="w-11/12 text-xl text-white font-semibold mb-4 mt-4">recomendacoes</Text>
            <FlatList
                className="w-11/12"
                horizontal
                data={bookList}
                renderItem={ renderBookList }
                keyExtractor={item => item.id}
            />

            <Text className="w-11/12 text-xl text-white font-semibold mb-4 mt-4">recomendacoes</Text>
            <FlatList
                className="w-11/12"
                horizontal
                data={bookList}
                renderItem={ renderBookList }
                keyExtractor={item => item.id}
            />

            <Text className="w-11/12 text-xl text-white font-semibold mb-4 mt-4">recomendacoes</Text>
            <FlatList
                className="w-11/12"
                horizontal
                data={bookList}
                renderItem={ renderBookList }
                keyExtractor={item => item.id}
            />
        </View>
    )
}
