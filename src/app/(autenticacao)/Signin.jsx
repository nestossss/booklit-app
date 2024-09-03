import { Link, router} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Platform, TouchableHighlight} from "react-native"
import { UserContext } from "../../contexts/UserContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import api from "../../api/api";
// //import obj from api
function Signin() {    
    const [userInfo, setUserInfo] = useContext(UserContext);
    const AsyncStorage = useAsyncStorage('booklit-auth');
    const [userAuth, setUserAuth] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });
    
    const [fieldsValidation, setFieldsValidation] = useState({
        username: null,
        usernameMessage: "",
        password: null,
        passwordMessage: "",
    });

    const [userExists, setUserExists] = useState(false);
    
    const checkUserExists = async () => {
        try {
            const res = await api.post("/auth/checkUser", { "username": userAuth.username });
            setUserExists(res.data.cadastrado);
            if(res.data.cadastrado) console.log(userAuth.username + " existe no db");
            else console.log(userAuth.username + " nao existe no db");
        } catch (err) {
            console.log(err.message);
        }
    }
    
    async function registerUser(){
        let body = {
            "username": userAuth.username,
            "email": userAuth.email,
            "password": userAuth.password, 
            "nome": userAuth.name,
        }
        const res = await api.post("/auth/signup", body);
        if(res && res.data.cadastro_feito && res.data.token){
            let authData = {
                "username": userAuth.username,
                "token": res.data.token,
            }
            let authDataString = JSON.stringify(authData);
            await AsyncStorage.setItem(authDataString);
            setUserInfo({
                "username": userAuth.username,
                "token": res.data.token,
                "isLoggedIn": true
            })
            return router.replace("/main/Home");
        }
    }

    // NAO ESQUECER DE COLOCAR ISSO P RODAR
    function handleUsernameInput(text){
        setUserAuth({
            ...userAuth,
            username: text,
        })

        if(text.length > 30){
            return setFieldsValidation({
                ...fieldsValidation,
                usernameMessage: "Máximo de 30 caracteres",
                username: false,
            })
        }
        if(/^[\W\d_]/u.test(text)){
            return setFieldsValidation({
                ...fieldsValidation,
                usernameMessage: "Precisa começar com uma letra",
                username: false
            })
        }
        if(/[\p{M}ç]/u.test(text)){
            return setFieldsValidation({
                ...fieldsValidation,
                usernameMessage: "Não são permitidas letras com acento",
                username: false,
            })
        }
        return setFieldsValidation({
            ...fieldsValidation,
            usernameMessage: "",
            username: true,
        })
    }
    

    const UserExistsMessage = ({ exists }) => {
        if (exists) {
            return <Text style={{padding:6, color: "red" }}>Nome de usuário já cadastrado</Text>;
        }
    };

    return (
        <View className="bg-black flex-1 justify-between p-8 py-16">
            <StatusBar backgroundColor="#000" style="light"/>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text className="text-white text-base font-semibold text-center"> 
                    Inscreva-se ja e comece a{"\n"}usar o booklit! 
                </Text>
                <View className="mt-10 border border-input-gray rounded-xl h-14 w-full">
                    <TextInput
                        className="p-4 text-white flex-1"
                        value={userAuth.name}
                        textContentType="name"
                        placeholder="Insira seu nome"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={ (text) => setUserAuth({
                            ...userAuth,
                            name: text,
                        })}
                    />
                </View>
                <View>
                    <View className="mt-10 border border-input-gray rounded-xl h-14 w-full">
                        <TextInput
                            className="p-4 text-white flex-1"
                            value={userAuth.username}
                            textContentType="nickname"
                            placeholderTextColor={styles.placeholder.color}
                            placeholder="Insira seu nome de usuário"
                            onChangeText={ handleUsernameInput }
                            onEndEditing={ checkUserExists }
                        />
                    </View>
                    <UserExistsMessage exists={userExists}/>
                </View>
                <View className="mt-10 border border-input-gray rounded-xl h-14 w-full">
                    <TextInput
                        className="p-4 text-white flex-1"
                        value={userAuth.email}
                        textContentType="emailAddress"
                        placeholderTextColor={styles.placeholder.color}
                        placeholder="Insira seu email"
                        onChangeText={ (text) => setUserAuth({
                            ...userAuth,
                            email: text,
                        }) }
                    />
                </View>
                <View className="mt-10 border border-input-gray rounded-xl h-14 w-full">
                    <TextInput
                        className="p-4 text-white flex-1"
                        value={userAuth.password}
                        textContentType="password"
                        secureTextEntry={true}
                        placeholderTextColor={styles.placeholder.color}
                        placeholder="Insira sua senha"
                        onChangeText={ (text) => setUserAuth({
                            ...userAuth,
                            password: text,
                        }) }
                    />
                </View>
                <TouchableHighlight
                    onPress={ registerUser }
                    className="p-4 h-14 rounded-xl bg-main-green/75 justify-center mt-20" underlayColor="#0C3D0A">
                    <Text className="text-base text-white font-semibold text-center">Criar conta</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            <Link href="/Login" replace asChild>
                <TouchableOpacity>
                    <Text className="text-sm text-white font-normal text-center">
                        Já possui uma conta? 
                        <Text className="text-azul-azulado"> Entre </Text> 
                        ao invés disso
                    </Text>
                </TouchableOpacity>
            </Link>
            <StatusBar backgroundColor="black" style="inverted"/>
        </View>
    )
}


const styles = {
    placeholder: {
        color: "#959595",
    }, 
}


export default Signin;