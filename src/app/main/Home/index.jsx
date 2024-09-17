import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions } from "react-native";
import { UserContext } from "../../../contexts/UserContext";

import { styled } from 'nativewind'
import { useLib } from "../../../hooks/useLib";
import { ContinueLendo } from "../../../components/ContinueLendo"
import { useFocusEffect } from "@react-navigation/native";

export default function ContinuarLendoHome({navigation, setFocusHeight}){

    useEffect( () => {
        const adjustHeight = navigation.addListener('focus', (e) => {
            setFocusHeight(780);
            // startAnim();
        })

        return adjustHeight
    }, []);

    return (
        <>
            <View className="flex-1 bg-black py-4 items-center">
                <View className="w-11/12">
                    <Text className="text-white text-xl" style={{ fontFamily: 'OpenSans_700Bold'}}>
                        Continue Lendo!
                    </Text>
                    <Text className="text-white text-sm" style={{ fontFamily: 'OpenSans_500Medium'}}>
                        Não esqueça da sua meta!
                    </Text>
                </View>
                <ContinueLendo/>
                
            </View>
        </>
    )
}

