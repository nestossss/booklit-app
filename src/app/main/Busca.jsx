import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, StatusBar, Pressable, FlatList} from "react-native";
import { LivroItemCard } from '../../components/LivroItemCard'
const googleKey = "AIzaSyCAguBVjk_msfejlvRtcpnrKsP0ztNjoto";

export default function Busca(){
    
    const [searchParams, setSearchParams] = useState("");
    const [searchResults, setSearchResults] = useState();

    async function handleSearch(){
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}&key=${googleKey}`);
        let results = res?.data?.items;
        if(results){
            return setSearchResults(results);
        }
        return console.log("não foi achado"); 
    }

    function handleSearchErase(){
        setSearchParams("");
        setSearchResults([]);
    }

    function renderSearchResults({item}){
        if(item.id && item.volumeInfo?.imageLinks?.thumbnail && item.volumeInfo?.title && item.volumeInfo?.description){
            return <LivroItemCard
                type='default'
                info={{
                    bookUrl: item.id,
                    imgUri: item.volumeInfo.imageLinks.thumbnail,
                    temBookUrl: true,
                    totalPag: item.volumeInfo.pageCount,
                    titulo: item.volumeInfo.title,
                    sinopse: item.volumeInfo.description,
                    autores: item.volumeInfo?.authors,
                    generos: item.volumeInfo?.categories, 
                }} 
            />
        }
    }

    return (
        <View className="bg-screen-black" style={styles.screen}>
            <ScrollView style={{ minHeight: 90, maxHeight: 120, }} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <View style={{height: "100%", aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Feather style={[styles.icon]} name="search" size={24} color="gray" />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={ searchParams }
                            numberOfLines={1}
                            placeholderTextColor={styles.placeholder.color}
                            placeholder="Pesquisar livros"
                            onChangeText={ (text) => {
                                setSearchParams(text)
                            }}
                            onSubmitEditing={ handleSearch }
                        />
                    </View>
                    <Pressable style={{ height: "100%", aspectRatio: 1 ,justifyContent: 'center', alignItems: 'center'}} onPress={ handleSearchErase }>
                        <Feather style={styles.icon}name="x" size={18} color="gray" />
                    </Pressable>
                </View>  
            </ScrollView>
        <FlatList 
            className='p-2'
            data={ searchResults }
            renderItem={ renderSearchResults }
            keyExtractor={item => item.id}
        />
        </View>
        
    )
}
const styles = StyleSheet.create({
    screen: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
    searchContainer: {
        flexGrow: 1,
        alignItems: "center",
    },
    text: {  
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        borderColor: "#959595",
        borderWidth: 1.5,
        borderRadius: 15,
        height: 50,
        marginHorizontal: 10,
    },
    inputView: {
        height: "100%",
        flex: 1,
        margin: 0,
    },
    inputText: {
        color:"white",
        flex: 1,
    },
    placeholder: {
        color: "#959595",
    }, 
    icon: {
    },
})
