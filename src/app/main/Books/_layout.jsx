import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { LibContext } from '../../../contexts/LibContext';

import { Slot, Stack } from 'expo-router';
import { HeaderDefault } from '../../../components/HeaderDefault';
import { RouteFocusContext } from '../../../contexts/RouteFocusContext';

export default function BooksLayout(){
   const [lib, setLib] = useState([])
   const [titleFocused, setFocused] = useState("padrao");

   return (
      <LibContext.Provider value={[lib, setLib]}>
         <RouteFocusContext.Provider value={[titleFocused, setFocused]}>
            <Stack>
               <Stack.Screen name='index' options={{
                  header: ({ navigation, route }) => {
                     let [title] = useContext(RouteFocusContext);
                     return <HeaderDefault router={navigation} text={title}/>
                  },
               }}/>
            </Stack>
         </RouteFocusContext.Provider>
      </LibContext.Provider>
   )
}