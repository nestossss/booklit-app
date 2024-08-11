import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomePage from './HomePage';


import { ScrollView, View } from 'react-native';
import Estatisticas from '../../screens/Home/Estatisticas';
import ContinuarLendo from '.';
import Metas from '../../screens/Home/Metas';
import Streak from '../../screens/Home/Streak';

const Tab = createMaterialTopTabNavigator();

export default function HomeLayout(){
   return (
      <View>
         <ScrollView contentContainerStyle={{ backgroundColor: '#47A538'}}>
            <Tab.Navigator 
               initialRouteName='ContinuarLendo'
               style={{minHeight: 420}}
            >
               <Tab.Screen 
                  name='ContinuarLendo' 
                  component={ContinuarLendo} 
                  options={{

                     title: "Home"
                  }}
               />
               <Tab.Screen 
                  name='Metas' 
                  component={Metas}
               />
               <Tab.Screen 
                  name='Streak' 
                  component={Streak}
               />
               <Tab.Screen 
                  name='Estatisticas' 
                  component={Estatisticas} 
               />
            </Tab.Navigator>
            <HomePage/>
         </ScrollView>
      </View>
   )
}