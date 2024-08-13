import { Link, router} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Platform, TouchableHighlight} from "react-native"
import { UserContext } from "../../contexts/UserContext";

import api from "../../api/api";
// //import obj from api
function Signin() {    
    const [userInfo, setUserInfo] = useContext(UserContext);

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userExists, setUserExists] = useState(false);
    
    const checkUserExists = async () => {
        try {
            const res = await api.post("/auth/checkUser", { "username": username });
            setUserExists(res.data.cadastrado);
            if(res.data.cadastrado) console.log(username + " existe no db");
            else console.log(username + " nao existe no db");
        } catch (err) {
            console.log(err.message);
        }
    }
    
    async function registerUser(){
        let body = {
            "username": username,
            "email": email,
            "password": password, 
            "nome": name,
        }
        const res = await api.post("/auth/signup", body);
        if(res && res.data.cadastro_feito && res.data.token){
            let authData = {
                "username": username,
                "token": res.data.token,
            }
            let authDataString = JSON.stringify(authData);
            await AsyncStorage.setItem('booklit-auth', authDataString);
            setUserInfo({
                "username": username,
                "token": res.data.token,
                "isLoggedIn": true
            })
            return router.replace("/main/Home");
        }
    }

    // NAO ESQUECER DE COLOCAR ISSO P RODAR
    function handleUsernameInput(text){
        setUsername(text);

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
        <View style={styles.screen} >
            <StatusBar backgroundColor="#000" style="light"/>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={styles.textoInscrevaSe}> Inscreva-se ja e comece a{"\n"}usar o booklit! </Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        value={name}
                        placeholder="Insira seu nome"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={ (text) => setName(text) }
                    />
                </View>
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
                    <UserExistsMessage exists={userExists}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        value={email}
                        placeholderTextColor={styles.placeholder.color}
                        placeholder="Insira seu email"
                        onChangeText={ (text) => setEmail(text) }
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputText}
                        value={password}
                        placeholderTextColor={styles.placeholder.color}
                        placeholder="Insira sua senha"
                        onChangeText={ (text) => setPassword(text) }
                    />
                </View>
                <TouchableHighlight
                    onPress={ registerUser }
                    style={styles.botaoVerde} underlayColor="#0C3D0A">
                    <Text style={styles.textoBotao}>Criar conta</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            <Link href="/Login" replace asChild>
                <TouchableOpacity>
                    <Text style={styles.textoCriarConta}>Já possui uma conta? <Text style={[styles.textoCriarConta, {color: "#0066dd"}]}>Entre</Text> ao invés disso</Text>
                </TouchableOpacity>
            </Link>
            <StatusBar backgroundColor="black" style="inverted"/>
        </View>
    )
}


const styles = StyleSheet.create({
    textoInscrevaSe: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    }, 
    screen: {
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
    inputView: {
        marginTop: 40,
        borderColor: "#959595",
        borderWidth: 1.5,
        padding: 15,
        borderRadius: 15,
        height: 55,
        width: "100%",
    },
    inputText: {
        color:"white",
        flex: 1,
    },
    placeholder: {
        color: "#959595",
    }, 
    botaoVerde: {
        marginTop: 80,
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


export default Signin;