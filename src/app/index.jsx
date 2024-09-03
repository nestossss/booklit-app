import 'react-native-reanimated'

import { Text, View, TouchableHighlight, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect, SplashScreen } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingScreen } from '../components/LoadingScreen';
import { OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold, OpenSans_700Bold, OpenSans_800ExtraBold, useFonts } from "@expo-google-fonts/open-sans";
import { Nunito_700Bold } from '@expo-google-fonts/nunito';

const index = () => {

    const [userInfo, setUserInfo] = useContext(UserContext);
    const [isLoggedIn, setLoggedIn] = useState();
    
    useEffect( () => {
        checkIfUserIsLogged();
    }, [])

    const [fontsLoaded] = useFonts({  
        OpenSans_400Regular,
        OpenSans_700Bold,
        OpenSans_500Medium,
        OpenSans_600SemiBold,
        OpenSans_700Bold,
        OpenSans_800ExtraBold,
        Nunito_700Bold,
     })
    if(!fontsLoaded) SplashScreen.preventAutoHideAsync();
    if(fontsLoaded) SplashScreen.hideAsync();

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
            (isLoggedIn == undefined || !fontsLoaded)?
                <LoadingScreen/>
            :
            isLoggedIn? 
                <Redirect href={'main/Home'}/>
            :
            <View className="flex-1 bg-black ">
            <StatusBar backgroundColor="#000" style="light"/>
            <ImageBackground 
                className="items-center justify-start" style={{flex: 3}} 
                resizeMode="cover" 
                source={require("../../assets/backgrounds/logoback.png")}
            >
                    <LinearGradient
                        className="bg-transparent h-80 absolute left-0 right-0 bottom-0"
                        colors={['transparent' , '#000000']}
                    />
                    <Image className="top-12 w-40" resizeMode='center' source={require('../../assets/icons/1-bola.png')}/>
            </ImageBackground>
            <View className="p-8" style={{flex: 4}}>
                <Text className="text-3xl flex-1 text-white text-center font-bold mt-6" numberOfLines={2}>Bem-vindo(a) ao {"\n"} booklit</Text>
                <View className="justify-between" style={{flex: 2}}>
                    <Link href="./Login" asChild>
                        <TouchableHighlight 
                            className="p-4 h-14 rounded-xl bg-main-green/75 justify-center"
                            underlayColor="#0C3D0A"
                        >
                            <Text className="text-base text-white font-semibold text-center">Fazer Login</Text>
                        </TouchableHighlight>
                    </Link>
                    <Link className='mb-5' href="./Signin"  asChild>
                        <TouchableHighlight>
                            <Text className="text-white text-sm text-center font-normal">ou <Text className="text-azul-azulado"> Criar uma nova conta</Text> </Text>
                        </TouchableHighlight>
                    </Link>
                </View>
            </View>
        </View>
            }
        </>
    )
}

export default index