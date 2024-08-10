import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { LibContext } from '../../../contexts/LibContext';

import { Slot, Stack } from 'expo-router';

export default function BooksLayout(){
   const [lib, setLib] = useState([])

   return (
      <LibContext.Provider value={[lib, setLib]}>
         <Stack>
            <Stack.Screen name='index' />
         </Stack>
      </LibContext.Provider>
   )
}