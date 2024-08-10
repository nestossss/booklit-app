import { StyleSheet, View, Image, Text} from "react-native"

export default function LivroEncontrado({livro}){
   
   return (
      <View style={styles.container}>
         <View style={styles.imgThumbnail}>
            <Image source={{
               uri: imageUrl? imageUrl : "http://books.google.com/books/content?id=tRl6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
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