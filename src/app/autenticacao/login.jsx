import { Link, Redirect, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, TouchableHighlight, KeyboardAvoidingView, Platform} from "react-native"
import api from "../../api/api";

// //import obj from api

function login() {    
    const router = useRouter();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor="black" style="inverted"/>
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Text style={styles.textoEntre}> Entre agora para usar o{"\n"}booklit! </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={username}
                            placeholder="Insira seu nome de usuário"
                            placeholderTextColor={styles.placeholder.color}
                            onChangeText={ (text) => setUsername(text) }
                        />
                    </View>
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
                    <Link href="/autenticacao/login" asChild>
                        <TouchableHighlight style={styles.botaoVerde} underlayColor="#0C3D0A">
                            <Text style={styles.textoBotao}>Entrar</Text>
                        </TouchableHighlight>
                    </Link>
                </KeyboardAvoidingView>
            <Link href="/autenticacao/signin" asChild>
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


export default login;