import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { useLib } from "../../hooks/useLib";
import { HeaderDefault } from "../../components/HeaderDefault";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Note } from "../../components/Note";
import { Library, Note as NoteType} from "../../util/types";
import NewNoteBtn from "../../components/NewNoteBtn";

function searchNote(lib: Library, bookUrl): NoteType[] | null {
   for(let i = 0; i < Object.keys(lib).length; i++){
      const records = lib[Object.keys(lib)[i]];
      const found = records.find(record => record.livro.bookUrl == bookUrl);
      if(found) return found.notas;
   }
   return null;
};

export default function NoteScreen() {
   const { googleId } = useLocalSearchParams();

   const [lib, setLib] = useLib();
   const notas = searchNote(lib, googleId.toString());
   console.log("notas: ", notas);

   return (
      <>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
         <View className="flex-1 p-5 bg-screen-black">
         {notas?.length > 0 ? (
            notas.map((item) => (
               <Note 
                  key={item.createdAt} 
                  googleId={googleId.toString()} 
                  note={item} 
                  canExpand 
               />
            ))
         ) : (
            <Text className="text-white">Nenhuma nota encontrada</Text>
         )}
      </View>
      </ScrollView>
      <NewNoteBtn googleId={googleId.toString()} />
      </>
   );
}