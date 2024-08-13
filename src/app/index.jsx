import 'react-native-reanimated'

import { StyleSheet, Text, View, TouchableHighlight, Image, ImageBackground} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import HomeScreen from './main/Home';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingScreen } from '../components/LoadingScreen';

const index = () => {

    let [userInfo, setUserInfo] = useContext(UserContext);

    let [isLoggedIn, setLoggedIn] = useState();
    
    useEffect( () => {
        checkIfUserIsLogged();
    }, [])

    async function checkIfUserIsLogged(){
        let userDataString = await AsyncStorage.getItem('booklit-auth');
        if(userDataString == null) return setLoggedIn(false);
        let userData = JSON.parse(userDataString);
        setUserInfo(userData);
        setLoggedIn(true);
    }

    return (
        <>
            {
            isLoggedIn == undefined?
                <LoadingScreen />
            :
            isLoggedIn? 
                <Redirect href={'main/Home'}/>
            :
            <View style={styles.baseScreen}>
            <StatusBar backgroundColor="#000" style="light"/>
            <ImageBackground style={{flex: 3,  alignItems: "center", justifyContent: "flex-end" }} resizeMode="cover" source={require("../../assets/backgrounds/logoback.png")}>
                    <LinearGradient
                        colors={['transparent' , '#000000']}
                        style={styles.background}
                    />
                    <Image source={require("../../assets/images/logo.png")}/>
            </ImageBackground>
            <View style={{ flex: 4, padding: 30 }}>
                <Text style={[styles.bemVindo, {marginTop: "8%"}]} numberOfLines={2}>Bem-vindo(a) ao {"\n"} booklit</Text>
                <View style={{flex: 2, justifyContent: "space-between"}}>
                    <Link href="./Login" asChild>
                        <TouchableHighlight style={styles.botaoVerde} underlayColor="#0C3D0A">
                            <Text style={styles.textoBotao}>Fazer Login</Text>
                        </TouchableHighlight>
                    </Link>
                    <Link style={{marginBottom:"10%"}} href="./Signin"  asChild>
                        <TouchableHighlight>
                            <Text style={styles.textoCriarConta}>ou <Text style={{color: "#0066dd"}}> Criar uma nova conta</Text> </Text>
                        </TouchableHighlight>
                    </Link>
                </View>
            </View>
        </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    baseScreen: {
        flex: 1,
        backgroundColor: "#000",
    },
    bemVindo: {
        flex: 1,
        color: "#fff",
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
    },
    botaoVerde: {
        height: 55,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 15,
    }, 
    botaoBranco: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
    },
    textoBotao: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
    },
    textoCriarConta: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "400",
        textAlign: "center",
    },
    brandLogo:{},
    background:{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
    }, 
})




export default index;