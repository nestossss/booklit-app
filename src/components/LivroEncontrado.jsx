import { StyleSheet, View, Image, Text} from "react-native"

export default function LivroEncontrado({livro}){
   
   return (
      <View style={styles.container}>
         <View style={styles.imgThumbnail}>
            <Image source={{
               uri: imageUrl.replace('http://', 'https://')
            }} style={styles.image}/>
         </View>
         <Text style={{color: "white"}} numberOfLines={3}>{title}</Text>
         <Text style={{color: "white"}} numberOfLines={1}>{authors}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      width: "100%",

   },
   imgThumbnail: {

   },
   image: {

   },
})