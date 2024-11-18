import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { UserContext } from "../../../contexts/UserContext";
import { LivroHomeCard } from "../../../components/LivroHomeCard";

import axios from "axios";
import { LoadingScreen } from "../../../components/LoadingScreen";
 
const googleKey = 'AIzaSyCAguBVjk_msfejlvRtcpnrKsP0ztNjoto'

if(googleKey)  console.log(googleKey);
if(!googleKey) console.log("googleKey nao existe");

const livrosRecomendados = [
    "q82uCgAAQBAJ",
    "pkE3EAAAQBAJ",
    "WM1wDwAAQBAJ",
    "MAGj10-NuK8C",
    "UGIC7N0Op2MC",
    "3wohEJsBaI0C",
    "NZZWEAAAQBAJ",
    "sbybDwAAQBAJ",
    "axofEAAAQBAJ",
    "MAqQDwAAQBAJ"
];

export default function HomePage(){

    const [bookList, setBookList] = useState(null);
    const [staticBookList, setStaticBooks] = useState(null);
    
    useEffect( () => { getBooks(); /*fetchStaticBooks()*/}, [])
    
    let [userInfo] = useContext(UserContext);

    
    async function getBooks(){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=livro&key=${googleKey}&orderBy=relevance`)
        let resBooks = res.data.items;
        let resBooksOk = [];
        await resBooks.forEach( book => {
            if(book.id && book.volumeInfo?.imageLinks?.thumbnail && book.volumeInfo?.description){
                resBooksOk.push(book);
            }
        });
        setBookList(resBooksOk);
    }

    async function fetchStaticBooks() {
        const results = [];
        for (const title of livrosRecomendados) {
            try {
                const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${title}&key=${googleKey}`);
                const book = res.data
                if(book) {
                    results.push(book);
                    console.log(book.id)
                }
            } catch (error) {
                console.error(`Erro ao buscar "${title}":`, error);
            }
        }
        setStaticBooks(results);
    }


    const renderBookList = ({item, index}) => {
        return <LivroHomeCard index={index} key={item.id} googleId={item.id} title={item.volumeInfo.title} imageUrl={item.volumeInfo?.imageLinks?.thumbnail.replace('http://', 'https://')} authors={item.volumeInfo?.authors}/>
    }

    if(!bookList){
        return <LoadingScreen/>
    }
    return (
        <View className="bg-screen-black justify-center items-center" >
            {/* <Text className="w-11/12 text-xl text-white font-semibold mb-4 mt-4">Recomendações do Booklit</Text>
            <FlatList
                className="w-11/12"
                horizontal
                data={staticBookList}
                renderItem={ renderBookList }
                keyExtractor={item => item.id}
            /> */}

            <Text className="w-11/12 text-xl text-white font-semibold mb-8 mt-8">Sem mais recomendações</Text>
        </View>
    )
}
