import { Link, Redirect, router } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, TouchableHighlight, KeyboardAvoidingView, Platform} from "react-native"

import api from "../../api/api";

import { UserContext } from "../../contexts/UserContext";
import { InvalidText } from '../../components/auth/Messages';

function Login() {    

    const [userInfo, setUserInfo] = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                setUserInfo({
                    "username": username,
                    "token": res.data.token,
                    "isLoggedIn": true,
                });
                return router.push("/main/Home");
             }
            if(res && res.data.cadastrado){
                return setPasswordIncorrect(true);
            }
            if(res){
                return setPasswordIncorrect(false);
            }
        } catch (err){
            return console.log(err.message);
        }
    }

    const checkUserExists = async () => {
        try {
            const res = await api.post("/auth/checkUser", { "username": username });
            setUserExists(res.data.cadastrado);
            setPasswordIncorrect(false);
            if(res.data.cadastrado) console.log(username + " existe no db");
            else console.log(username + " nao existe no db");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor="black" style="inverted"/>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={styles.textoEntre}> Entre agora para usar o{"\n"}booklit! </Text>

                {/*Input - Insira seu nome de usuario*/}
                <View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={username}
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
                    <View style={styles.inputView}> 
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                value={password}
                                placeholderTextColor={styles.placeholder.color}
                                placeholder="Insira sua senha"
                            />
                    </View>
                    <InvalidText show={isPasswordIncorrect}>Senha incorreta</InvalidText>
                </View>

                <TouchableHighlight style={styles.botaoVerde} onPress={ validateCredentials } underlayColor="#0C3D0A">
                        <Text style={styles.textoBotao}>Entrar</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            <Link href="/Signin" replace asChild>
                <TouchableOpacity>
                    <Text style={styles.textoCriarConta}>Não possui uma conta? <Text style={[styles.textoCriarConta, {color: "#0066dd"}]}>Inscreva-se</Text> já</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({    
    screen: {
        color: "white",
        backgroundColor: "black",
        flex: 1,
        justifyContent: "space-between",
        padding: 30,
        paddingVertical: 60,
    },
    textWhite: {
        color: "white"
    },
    textoCriarConta: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "400",
        textAlign: "center",
    },
    textoEntre: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        
    }, 
    inputView: {
        marginTop: 40,
        borderColor: "#959595",
        borderWidth: 1.5,
        borderRadius: 15,
        height: 55,
        width: "100%",
    },
    inputText: {
        padding: 15,
        color:"white",
        flex: 1,
    },
    placeholder: {
        color: "#959595",
    }, 
    botaoVerde: {
        marginTop: 60,
        height: 55,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 15,
    }, 
    textoBotao: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
    },
    
})


export default Login;