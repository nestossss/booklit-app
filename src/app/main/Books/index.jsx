import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useContext, useState, useEffect, useCallback } from 'react';
import { Image, View, StyleSheet} from 'react-native';

import SendoLidos from '../../screens/Books/SendoLidos';
import Salvos from '../../screens/Books/Salvos';
import Terminados from '../../screens/Books/Terminados';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LibContext } from '../../../contexts/LibContext';
import { useFocusEffect } from 'expo-router';
import api from '../../../api/api';
import { UserContext } from '../../../contexts/UserContext';

//<MaterialCommunityIcons name="bookshelf" size={24} color="black" />

//<FontAwesome6 name="book-bookmark" size={24} color="black" />

const Tab = createMaterialTopTabNavigator();

function BooksScreens(){
   
   return (
         <View style={{ flex: 1 }}>
            <Tab.Navigator
               initialRouteName='SendoLidos'
               screenOptions={{
                  tabBarPressColor: "#00000000",
                  tabBarIndicatorStyle: {
                     display: 'none'
                  },
                  tabBarShowLabel: false,
                  tabBarShowIcon: true,
                  tabBarStyle: {
                     backgroundColor: '#47A538',
                  },
                  tabBarItemStyle: {
                     flex: 1,
                  },
                  tabBarAllowFontScaling: false,
                  tabBarLabelStyle: {
                     fontWeight: '700',
                     color: '#fff',
                     fontSize: 12,
                     textAlign: 'center',
                  },
                  tabBarIconStyle: {
                     width: 50,
                     height: 50,
                  },
                  tabBarAccessibilityLabel: 'Barra de navegação'
               }}
               style={{flex: 1, minHeight: 600}}
            >
               <Tab.Screen 
                  name='SendoLidos' 
                  component={SendoLidos} 
                  options={{  
                     title: "Sendo Lidos",
                     tabBarIcon: ({focused}) => 
                        focused? 
                        <View style={styles.iconContainerFocused}>
                           <Image source={require('../../../../assets/icons/book-open-green.png' )} style={styles.customIcon}/>
                        </View>
                     :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/book-open-white.png' )} style={styles.customIcon}/>
                        </View>,
                     
                  }}
               />
               <Tab.Screen 
                  name='Terminados' 
                  component={Terminados} 
                  options={{ 
                     title: "Terminados",
                     tabBarIcon: ({focused}) => 
                        focused? 
                        <View style={styles.iconContainerFocused}>
                           <Image source={require('../../../../assets/icons/book-open-green.png' )} style={styles.customIcon}/>
                        </View>
                     :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/book-open-white.png' )} style={styles.customIcon}/>
                        </View>,

                  }}/>
               <Tab.Screen 
                  name='Salvos' 
                  component={Salvos} 
                  options={{ 
                     title: "Salvos", 
                     tabBarIcon: ({focused}) => 
                        focused? 
                        <View style={styles.iconContainerFocused}>
                           <Image source={require('../../../../assets/icons/book-open-green.png' )} style={styles.customIcon}/>
                        </View>
                     :
                        <View style={styles.iconContainer}>
                           <Image source={require('../../../../assets/icons/book-open-white.png' )} style={styles.customIcon}/>
                        </View>,
                  }}
               />
            </Tab.Navigator>
         </View>
   )
}

export default BooksScreens

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
