import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
//import obj from api

function login() {

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor="black" style="inverted"/>
            {
            /* <View>
                <TextInput 
                    onChangeText={ (text) => email=text}
                />
                <TextInput
                    onChangeText={ (text) => senha=text}
                />
                <Button onPress={nada} title="LOGIN ISSO AI"/>
            </View> */
            }
            <Link href="/autenticacao/signin" asChild>
                <TouchableOpacity>
                    <Text style={{color: "white",textAlign: "center"}}>Login</Text>
                </TouchableOpacity>
            </Link>
            <StatusBar backgroundColor="black" style="inverted"/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: "space-between",
        padding: 30,
        paddingVertical: 60,
    },
})


export default login;