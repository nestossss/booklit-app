import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import { UserContext } from "../../../contexts/UserContext";
import { useFocusEffect, useNavigation } from "expo-router";
import { styled } from 'nativewind'
import { useLib } from "../../../hooks/useLib";
import { ContinueLendo } from "../../../components/ContinueLendo"

export default function ContinuarLendoHome(){    

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

