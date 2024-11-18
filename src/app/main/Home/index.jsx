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
            setFocusHeight(650);
            // startAnim();
        })

        return adjustHeight
    }, []);

    const [lib] = useLib()
    return (
        <>
            <View className={"flex-1 bg-black py-4 items-center"}>
                {
                    lib.sendoLidos.length<=0?
                        <View className="w-full justify-center h-full">
                            <Text numberOfLines={1} className="text-center font-medium text-lg text-white">Nenhum livro sendo lido :(</Text>
                        </View>
                    :
                    <>
                        <View className="w-11/12">
                            <Text className="text-white text-xl" style={{ fontFamily: 'OpenSans_700Bold'}}>
                                Continue Lendo!
                            </Text>
                            <Text className="text-white text-sm" style={{ fontFamily: 'OpenSans_500Medium'}}>
                                Não esqueça da sua meta!
                            </Text>
                        </View>
                        <ContinueLendo/>
                    </>
                }
            </View>
        </>
    )
}

