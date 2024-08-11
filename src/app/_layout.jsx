import { Stack } from "expo-router";
import { useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { HeaderDefault } from "../components/HeaderDefault";
import { StatusBar  } from 'react-native';

export default function root(){
   
   const [userInfo, setUserInfo] = useState({
      username: null,
      email: null,
      token: null,
      isLoggedIn: false,
   }); // puxar isso do localStorage dps 
   
   return (
      <UserContext.Provider value={[userInfo, setUserInfo]}>
         <ExpoStatusBar style="inverted" backgroundColor="#000"/>
         <Stack>
            <Stack.Screen name="index" options={{
               animation: 'none',
               headerShown: false, 
            }}/> 
            <Stack.Screen name="(autenticacao)/Login" options={{
               animation: 'none',
               headerShown: false,
            }}/>
            <Stack.Screen name="(autenticacao)/Signin" options={{
               animation: 'none',
               headerShown: false,
            }}/>
            <Stack.Screen name="main" options={{
               headerShown: false,
               animation: 'none',
            }} />
            <Stack.Screen name="(bookScreens)/EditLivro/[idLivro]"
               options={{
                  header: ({ navigation }) => {
                     return <HeaderDefault hasBackButton router={navigation} text={"Editar Livro"}/>
                  }
               }}
            />
            <Stack.Screen name="(bookScreens)/InfoLivro/[googleId]"
               options={{
                  header: ({ navigation }) => {
                     return <HeaderDefault hasBackButton router={navigation} text={"Ver Livro"}/>
                  }
               }}/>
         </Stack>
      </UserContext.Provider>
   )
}