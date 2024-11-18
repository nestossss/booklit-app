import React, { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useLib } from "../../hooks/useLib"
import api from "../../api/api"
import { useSession } from "../../hooks/useSession"
import { useChangesMade } from "../../hooks/useChangesMade"

type NoteType = "quote" | "note"

function searchNotes(lib, bookUrl){
  if(!bookUrl) return null
  for(let i = 0; i < Object.keys(lib).length; i++){
     const records = lib[Object.keys(lib)[i]];
     const found = records.find(record => record.livro.bookUrl == bookUrl);
     if(found) return found.notas;
  }
  return null;
};

const errorAlert = (title, msg) =>{
  Alert.alert(title, 'Motivo: '+msg, [
    {text: 'OK', onPress: () => console.log('OK')},
  ]);
}

const messageAlert = (title, msg, goBack) =>{
  Alert.alert(title, msg, [
    {text: 'OK', onPress: () => { 
      goBack();
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


export default function NoteEditScreen() {
  const router = useRouter()
  const { noteId, googleId } = useLocalSearchParams()
  const [session] = useSession();
  const [c, setChangesMade] = useChangesMade();
  const [lib, setLib] = useLib()

  // Form state
  const [noteType, setNoteType] = useState<NoteType>("note")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [page, setPage] = useState("")
  const [line, setLine] = useState("")

  // Load existing note data if editing
  useEffect(() => {
    if (noteId && googleId) {
      const note = searchNotes(lib, googleId).find(n => n.idnota === (typeof noteId == 'string'? parseInt(noteId): parseInt(noteId[0]) ) )
      if (note) {
        setNoteType(note.type as NoteType)
        setTitle(note.title)
        setContent(note.content)
        setPage(note?.page?.toString() || "")
        setLine(note?.line?.toString() || "")
      }
    }
  }, [noteId, googleId])

    /* FOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUI */
    /* FOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUI */
    /* FOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUI */
    /* FOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUI */
    /* FOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUI */
    /* FOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUIFOI AQUI Q EU PAREI FOI AQUI */
  const handleSave = async () => {
    let body = {
      title, content, page, line, type: noteType
    }
    if(noteId){
      let res = await api.patch(`/lib/atualizar/nota?idnota=${noteId}`, body, {
        headers: {
          'Authorization': "Bearer "+session.token,
        }
      })
      if(res.status != 200){
        errorAlert("Erro ao atualizar nota", res.statusText);
        return
      }
      setChangesMade(true);
      return router.back()
    }
    let res = await api.put(`/lib/atualizar/nota?bookUrl=${googleId}`, body, {
      headers: {
        'Authorization': "Bearer "+session.token,
      }
    })
    if(res.status != 200){
        errorAlert("Erro ao salvar nota", res.statusText);
      return
    }
    setChangesMade(true);
    return router.back();
  }

  const handleDelete = async () => {
    const deleteNota = async () => {
      let res = await api.delete('/lib/atualizar/nota?idnota='+noteId, {
        headers: {
          Authorization: "Bearer "+ session.token
        }
      })
      if(res.status != 200) return errorAlert("Erro ao deletar nota", res.statusText);
      if(res.data) setChangesMade(true);
      return messageAlert("Nota apagada", "Nota apagada com sucesso, clique em OK para voltar", router.back)
    }

    confirmAlert("Apagar nota", deleteNota)
  }

  return (
    <View className="flex-1 bg-screen-black">
      <View className="flex-row justify-center p-4 w-full">
        <TouchableOpacity
          onPress={() => setNoteType("note")}
          className={`w-1/3 px-4 py-2 rounded-l-lg ${noteType === "note" ? "bg-[#47A538]" : "bg-[#1A1A1A]"}`}
        >
          <Text className="text-white font-semibold">Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNoteType("quote")}
          className={`w-1/3 px-4 py-2 rounded-r-lg ${noteType === "quote" ? "bg-[#47A538]" : "bg-[#1A1A1A]"}`}
        >
          <Text className="text-white font-semibold">Citação</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="mb-4">
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Título"
            placeholderTextColor="#666"
            className="border-[#424242] border rounded-lg p-3 text-white"
          />
        </View>

        <View className="mb-4">
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder={noteType === "quote" ? 'Frase do livro "assim foi feito..."' : "Conteúdo da anotação"}
            placeholderTextColor="#666"
            multiline
            className="border-[#424242] border rounded-lg p-3 text-white min-h-[100]"
          />
        </View>

        {noteType === "quote" && (
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
              <TextInput
                value={page}
                onChangeText={setPage}
                placeholder="Página"
                placeholderTextColor="#666"
                keyboardType="numeric"
                className="border-[#424242] border rounded-lg p-3 text-white"
              />
            </View>
            <View className="flex-1">
              <TextInput
                value={line}
                onChangeText={setLine}
                placeholder="Linha"
                placeholderTextColor="#666"
                keyboardType="numeric"
                className="border-[#424242] border rounded-lg p-3 text-white"
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View className="p-4 gap-2">
        <TouchableOpacity
          onPress={()=>{ return handleSave() }}
          className="bg-[#47A538] p-4 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-lg w-full text-center">Salvar</Text>
        </TouchableOpacity>
        
        {noteId && (
          <TouchableOpacity
            onPress={()=>{ return handleDelete() }}
            className="p-4 rounded-lg items-center"
          >
            <Text className="text-white text-lg w-full text-center">Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}