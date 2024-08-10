import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import SendoLidos from '../../screens/Books/SendoLidos';
import Salvos from '../../screens/Books/Salvos';
import Terminados from '../../screens/Books/Terminados';

import { LibContext } from '../../../contexts/LibContext';

const Tab = createMaterialTopTabNavigator();

export default function BooksScreens(){
   const [lib, setLib] = useState([])

   return (
         <View style={{ flex: 1 }}>
            <Tab.Navigator initialRouteName='SendoLidos' style={{flex: 1, minHeight: 600}}>
               <Tab.Screen name='SendoLidos' component={SendoLidos} options={{ title: "Sendo Lidos" }}/>
               <Tab.Screen name='Terminados' component={Terminados} options={{ title: "Terminados" }}/>
               <Tab.Screen name='Salvos' component={Salvos} options={{ title: "Salvos" }}/>
            </Tab.Navigator>
         </View>
   )
}