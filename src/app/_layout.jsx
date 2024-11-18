import { Stack } from "expo-router";
import { useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { LibContext } from "../contexts/LibContext";
import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { HeaderDefault } from "../components/HeaderDefault";
import { StatusBar  } from 'react-native';
import { ChangesMadeContext } from "../contexts/ChangesMadeContext";

export default function root(){
   
   const [userInfo, setUserInfo] = useState({
      username: null,
      email: null,
      token: null,
      isLoggedIn: false,
   }); // puxar isso do localStorage dps 
   
   const [lib, setLib] = useState({
      salvos: [], // []
      terminados: [], // []
      sendoLidos: [], // [] 
   })

   const [changesMade, setChangesMade] = useState(true);

   return (
      <ChangesMadeContext.Provider value={[changesMade, setChangesMade]}>
         <UserContext.Provider value={[userInfo, setUserInfo]}>
            <LibContext.Provider value={[lib, setLib]}>
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
                  <Stack.Screen name="(bookScreens)/ViewSavedBook"
                     options={{
                        animation:'flip',
                        header: ({ navigation }) => {
                           return <HeaderDefault hasBackButton router={navigation} text={""}/>
                        }
                     }}
                  />
                  <Stack.Screen name="(bookScreens)/InfoLivro"
                     options={{
                        header: ({ navigation }) => {
                           return <HeaderDefault hasBackButton router={navigation} text={"Ver Livro"}/>
                        }
                     }}/>
                  <Stack.Screen name="(bookScreens)/Cronometro"
                     options={{
                        animation:'default',
                        headerShown: false,
                     }}
                  />
                  <Stack.Screen name="(bookScreens)/EditLivro"
                     options={{
                        animation:'fade',
                        headerShown: false,
                     }}
                  />
                  <Stack.Screen name="(bookScreens)/NoteScreen"
                     options={{
                        animation:'flip',
                        header: ({ navigation }) => {
                           return <HeaderDefault hasBackButton router={navigation} text={"Notas"}/>
                        }
                     }}
                  />
                  <Stack.Screen name="(bookScreens)/NoteEditScreen"
                     options={{
                        animation:'flip',
                        header: ({ navigation }) => {
                           return <HeaderDefault hasBackButton router={navigation} text={"Notas"}/>
                        }
                     }}
                  />
               </Stack>
            </LibContext.Provider>
         </UserContext.Provider>
      </ChangesMadeContext.Provider>
   )
}