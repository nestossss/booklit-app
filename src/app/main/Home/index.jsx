import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigation } from "expo-router";
import { styled } from 'nativewind'
export default function HomeScreen(){
    View = styled(View);

    let [userInfo] = useContext(UserContext);

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Bem vindo a home</Text>
        </View>
    )
}
const styles = StyleSheet.create({
   screen: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
   },
   text: {
        width:'100%',
        textAlign: "center", 
        fontSize: 18,
        color: "white",
   },
})
