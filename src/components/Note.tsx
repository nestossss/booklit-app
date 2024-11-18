import React, { useState } from "react"
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native"
import { Entypo, Feather } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { Note as NoteType } from "../util/types"
import { useSession } from "../hooks/useSession"
import api from "../api/api"
import { useChangesMade } from "../hooks/useChangesMade"

const errorAlert = (title, msg) =>{
  Alert.alert(title, 'Motivo: '+msg, [
    {text: 'OK', onPress: () => console.log('OK')},
  ]);
}

const messageAlert = (title, msg, goBack) =>{
  Alert.alert(title, msg, [
    {text: 'OK', onPress: () => { 
      if(goBack) goBack();
      console.log("ok");
    }},
  ]);
}

const confirmAlert = (action, actionFunction) =>{
  Alert.alert(action, 'Quer continuar?', 
    [
      {text: 'Cancelar', onPress: () => console.log("Exclusao cancelada")},
      {text: 'Sim', onPress: () => { console.log("Apagado"); actionFunction()} },
    ]
  );
}

export function Note(props: {
  note: NoteType
  googleId: string
  canExpand: boolean
}) {
  const { note, canExpand, googleId } = props
  const [isExpanded, setExpanded] = useState<boolean>(false)
  const [session] = useSession();
  const [c, setChangesMade] = useChangesMade();

  const handleDelete = async () => {
    const deleteNota = async () => {
      let res = await api.delete('/lib/atualizar/nota?idnota='+note.idnota, {
        headers: {
          Authorization: "Bearer "+ session.token
        }
      })
      if(res.status != 200) return errorAlert("Erro ao deletar nota", res.statusText);
      if(res.data) setChangesMade(true);
      return messageAlert("Nota apagada", "Nota apagada com sucesso", console.log("ok"))
    }

    confirmAlert("Apagar nota", deleteNota)
  }
  return (
    <TouchableWithoutFeedback disabled={!canExpand} onPress={() => canExpand && setExpanded(prev => !prev)}>
      <View className="bg-[#1A1A1A] rounded-lg p-4 mb-4 w-full">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {canExpand && (
              <View className="p-1 mr-2">
                <Entypo
                  name="chevron-right"
                  size={18}
                  color="white"
                  style={{
                    transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
                  }}
                />
              </View>
            )}
            <Text 
              numberOfLines={isExpanded ? undefined : 1} 
              className="text-lg font-semibold text-white flex-1"
            >
              {note.title}
            </Text>
          </View>
          <View className="flex-row items-center">
            {canExpand && (
               <>
               <Link
                 href={{
                   pathname: "/NoteEditScreen",
                   params: {
                     noteId: note.idnota.toString(),
                     googleId: googleId,
                   }
                 }}
                 asChild
               >
                 <TouchableOpacity className="p-2 mr-2" onPress={(e) => e.stopPropagation()}>
                   <Feather name="edit-2" size={18} color="white" />
                 </TouchableOpacity>
               </Link>
               <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  return handleDelete()
                }}
                className="p-2"
              >
                <Feather name="trash-2" size={18} color="white" />
              </TouchableOpacity>
               
               </>
            )}
          </View>
        </View>
        
        <Text 
          numberOfLines={isExpanded ? undefined : 2} 
          className="text-white mt-2 mb-2"
        >
          {note.content}
        </Text>
        
        {note.type === "quote" && note.page && (
          <Text className="text-gray-400 text-sm">
            {`Pág. ${note.page}${note.line ? `, Linha ${note.line}` : ''}`}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}