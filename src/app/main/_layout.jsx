import 'react-native-reanimated';
import { Tabs } from "expo-router";
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { HeaderHome } from '../../components/HeaderHome';
import { HeaderDefault } from '../../components/HeaderDefault';
//<FontAwesome5 name="user" size={24} color="black" />
//<FontAwesome5 name="user-alt" size={24} color="black" />

export default function MainLayout(){

   const [userInfo, setUserInfo] = useContext(UserContext);
   return (
      <Tabs
      screenOptions={{
         tabBarStyle: {
            height: 70,
            paddingVertical: 15 ,
            backgroundColor: '#000',
            borderColor: '#000',
         },
         tabBarLabelStyle: {
            color: '#47A538',
            width: '100%',
         },
         tabBarActiveBackgroundColor: '#000',
         tabBarInactiveBackgroundColor: '#000',
      }}>
         <Tabs.Screen
            name="Home"
            options={{
               header: ({ navigation }) => {
                  return  <HeaderHome router={navigation} text={`Olá, ${userInfo.username}!`}/>
               },
               tabBarIcon: ({focused}) => {
                  if(focused) return <MaterialIcons name="home-filled" size={24} color='#47A538'/>
                  return <MaterialCommunityIcons name="home-outline" size={24} color='#47A538' />
               },
               tabBarLabel: 'Home',
               title: "Olá "+ userInfo.username,
            }}
         />
         <Tabs.Screen
            name="Books"
            options={{
               headerShown: false,
               tabBarIcon: ({focused}) => <FontAwesome5 name={focused? 'book-open' : 'book'} size={18} color='#47A538' />,
               tabBarLabel: 'Livros',
               title: "Olá "+ userInfo.username}}
         />
         <Tabs.Screen
            name="Busca"
            options={{ 
               headerShown: false,
               tabBarIcon: () => <Ionicons name='search' size={18} color='#47A538'/>,
               tabBarLabel: 'Busca',
               title: "Olá "+ userInfo.username}}
         />
         
         <Tabs.Screen
            name="User"
            options={{ 
               header: ({ navigation }) => {
                  return <HeaderDefault router={navigation} text={`Olá, ${userInfo.username}!`}/>
               },
               tabBarIcon: ({focused}) => <FontAwesome5 name={focused? "user-alt":'user'} size={24} color="#47A538" />,
               tabBarLabel: 'Usuário',
               title: "Olá "+ userInfo.username}}
         />
      </Tabs>
   )
}