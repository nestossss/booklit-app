import { Stack } from "expo-router";
import { useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { StatusBar } from 'expo-status-bar';

export default function root(){
   const [userInfo, setUserInfo] = useState({
      username: null,
      email: null,
      token: null,
      isLoggedIn: false,
   }); // puxar isso do localStorage dps 
   
   return (
      <UserContext.Provider value={[userInfo, setUserInfo]}>
         <StatusBar style="dark"/>
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
            <Stack.Screen name="(bookScreens)/EditLivro/[idLivro]"/>
            <Stack.Screen name="(bookScreens)/InfoLivro/[googleId]"/>
         </Stack>
      </UserContext.Provider>
   )
}