import 'react-native-reanimated';
import { Tabs } from "expo-router";
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

export default function MainLayout(){
   const [userInfo, setUserInfo] = useContext(UserContext);
   return (
      <Tabs>
         <Tabs.Screen
            name="Home"
            options={{ title: "Olá"+ userInfo.username}}
         />
         <Tabs.Screen
            name="Busca"
            options={{ title: "busca"}}
         />
         <Tabs.Screen
            name="Books"
            options={{ title: "livros"}}
         />
         <Tabs.Screen
            name="User"
            options={{ title: "usuarioooo"}}
         />
      </Tabs>
   )
}