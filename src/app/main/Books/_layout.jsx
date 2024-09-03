import { useContext, useState } from 'react';

import { Stack } from 'expo-router';
import { HeaderDefault } from '../../../components/HeaderDefault';
import { RouteFocusContext } from '../../../contexts/RouteFocusContext';

export default function BooksLayout(){
   
   const [titleFocused, setFocused] = useState("");

   return (
      <RouteFocusContext.Provider value={[titleFocused, setFocused]}>
         <Stack>
            <Stack.Screen name='index' options={{
               header: ({ navigation, route }) => {
                  let [title] = useContext(RouteFocusContext);
                  return <HeaderDefault router={navigation} text={title}/>
               },
            }}/>
         </Stack>
      </RouteFocusContext.Provider>
   )
}