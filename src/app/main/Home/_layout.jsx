import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomePage from './HomePage';


import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Estatisticas from '../../screens/Home/Estatisticas';
import ContinuarLendo from '.';
import Metas from '../../screens/Home/Metas';
import Streak from '../../screens/Home/Streak';

import FontAwesome5  from '@expo/vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

function HomeLayout(){
   return (
      <View>
         <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollView}>
            <Tab.Navigator 
               initialRouteName='ContinuarLendo'
               screenOptions={{
                  tabBarStyle: {
                     backgroundColor: '#47A538',
                  },
                  tabBarItemStyle: {
                     flex: 1,
                  },
                  tabBarAllowFontScaling: false,
                  tabBarLabelStyle: {
                     minWidth: '100%',
                     fontWeight: '700',
                     color: '#fff',
                     marginTop: 6,
                     marginBottom: 8,
                     margin: 0,
                     fontSize: 12,
                     textAlign: 'center',
                  },
                  tabBarIconStyle: {
                     width: 50,
                     height: 50,
                  },
                  tabBarAccessibilityLabel: 'Barra de navegação'
               }}
               style={{minHeight: 500}}
            >
               <Tab.Screen 
                  name='ContinuarLendo' 
                  component={ContinuarLendo} 
                  options={{
                     tabBarIcon: ({focused}) => 
                        focused? 
                        <View style={styles.iconContainerFocused}>
                           <Image source={require('../../../../assets/icons/book-open-green.png' )} style={styles.customIcon}/>
                        </View>
                     :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/book-open-white.png' )} style={styles.customIcon}/>
                        </View>,
                     tabBarLabel: "Home",
                     tabBarAccessibilityLabel: 'Botao de navegação para "Continuar lendo"'
                  }}
               />
               <Tab.Screen 
                  name='Metas' 
                  component={Metas}
                  options={{
                     tabBarIcon: ({focused}) => 
                        focused? 
                        <View style={styles.iconContainerFocused}>
                              <Image source={require('../../../../assets/icons/target-one-green.png' )} style={styles.customIcon}/>
                        </View>
                        :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/target-one-white.png' )} style={styles.customIcon}/>
                        </View>,
                     tabBarLabel: 'Metas',
                     tabBarAccessibilityLabel: 'Botao de navegação para "Metas"'

                  }}
               />
               <Tab.Screen 
                  name='Streak' 
                  component={Streak}
                  options={{
                     tabBarIcon: ({focused}) => 
                     focused? 
                        <View style={styles.iconContainerFocused}>
                           <Image source={require('../../../../assets/icons/trophy-green.png' )} style={styles.customIcon}/>
                        </View>
                     :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/trophy-white.png' )} style={styles.customIcon}/>
                        </View>,
                     tabBarLabel: 'Streak',
                     tabBarAccessibilityLabel: 'Botao de navegação para "Metas"'
                  }}
               />
               <Tab.Screen 
                  name='Estatisticas' 
                  component={Estatisticas} 
                  options={{
                     tabBarIcon: ({focused}) => 
                     focused? 
                        <View style={styles.iconContainerFocused}>
                           <Image source={require('../../../../assets/icons/graph-bar-green.png' )} style={styles.customIcon}/>
                        </View>
                     :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/graph-bar-white.png' )} style={styles.customIcon}/>
                        </View>,
                     tabBarLabel: 'Estatísticas',
                  }}
               />
            </Tab.Navigator>
            <HomePage/>
         </ScrollView>
      </View>
   )
}

export default HomeLayout;

const styles = StyleSheet.create({
   customIcon: {
      width: 18,
      height: 18,
   },
   scrollView:{ 
      flexGrow: 1,
      backgroundColor: '#47A538'
   },
   iconContainerFocused: {
      width: 50,
      height: 50,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
   },
   iconContainer: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },
})
