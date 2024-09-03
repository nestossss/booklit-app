import { Link, Redirect, router } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, TouchableHighlight, KeyboardAvoidingView, Platform} from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import api from "../../api/api";

import { UserContext } from "../../contexts/UserContext";
import { InvalidText } from '../../components/AuthMessages';

function Login() {    
    const AsyncStorage = useAsyncStorage('booklit-auth');

    const [userInfo, setUserInfo] = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [fieldsValidation, setFieldsValidation] = useState({
        username: null,
        usernameMessage: "",
        password: null,
        passwordMessage: "",
    });

    const [userExists, setUserExists] = useState(true);
    const [isPasswordIncorrect, setPasswordIncorrect] = useState(false);

    async function validateCredentials(){
        try{
            let body = {
                "username": username,
                "password": password,
            }
            let res = await api.post('/auth/login', body);
            if(res && res.data.cadastrado && res.data.senha_correta){
                let authData = {
                    "username": username,
                    "token": res.data.token,
                }
                let authDataString = JSON.stringify(authData);
                await AsyncStorage.setItem(authDataString);
                setUserInfo(authData);
                router.back();
                return router.replace("/main/Home");
             }
            if(res && res.data.cadastrado){
                return setPasswordIncorrect(true);
            }
            if(res){
                return setPasswordIncorrect(false);
            }
        } catch (err){
            return console.log(err);
        }
    }

    function handlePasswordInput(text){
        
    }
    
    const checkUserExists = async () => {
        try {
            const res = await api.post("/auth/checkUser", { "username": username });
            if(username.length <= 0){

            }
            if(res && res.data.cadastrado != undefined)
                return setUserExists(res.data.cadastrado)
            

            setPasswordIncorrect(false);
            if(res.data.cadastrado) console.log(username + " existe no db");
            else console.log(username + " nao existe no db");
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <View className="flex-1 text-white bg-black justify-between p-8 py-16">
            <StatusBar backgroundColor="#000" style="light"/>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text className="text-white text-base font-medium text-center">
                    Entre agora para usar o{"\n"}booklit!
                </Text>

                {/*Input - Insira seu nome de usuario*/}
                <View>
                    <View className="mt-10 border border-input-gray rounded-xl h-14 w-full">
                        <TextInput
                            className="p-4 text-white flex-1"
                            value={username}
                            textContentType="nickname"
                            placeholderTextColor={styles.placeholder.color}
                            placeholder="Insira seu nome de usuário"
                            onChangeText={ (text) => { setUsername(text) }}
                            onEndEditing={ checkUserExists }
                        />
                    </View>
                    <InvalidText show={ !userExists }>Usuário não encontrado </InvalidText>
                </View>

                {/*Input - Insira sua senha*/}
                <View>
                    <View className="mt-10 border border-input-gray rounded-xl h-14 w-full">
                            <TextInput
                                className="p-4 text-white flex-1"
                                secureTextEntry={true}
                                onChangeText={ (text) => { setPassword(text)} }
                                value={password}
                                textContentType="password"
                                placeholderTextColor={styles.placeholder.color}
                                placeholder="Insira sua senha"
                            />
                    </View>
                    <InvalidText show={isPasswordIncorrect}>Senha incorreta</InvalidText>
                </View>

                <TouchableHighlight 
                className="mt-16 h-14 bg-main-green/75 p-4 rounded-xl" 
                    onPress={ validateCredentials } 
                    underlayColor="#0C3D0A"
                >
                        <Text className="text-base text-white font-medium text-center">
                            Entrar
                        </Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            <Link href="/Signin" replace asChild>
                <TouchableOpacity>
                    <Text className="text-sm text-white font-normal text-center"> 
                        Não possui uma conta? 
                        <Text className="text-azul-azulado"> Inscreva-se </Text> 
                        já 
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = {    
    placeholder: {
        color: "#959595",
    }, 
}

export default Login;