import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function NewNoteBtn({googleId}) {
  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: "/NoteEditScreen",
        params: {
          googleId: googleId
        }
      })}
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#000',
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <Feather name="plus" size={40} color="#47A538" />
    </TouchableOpacity>
  )
}