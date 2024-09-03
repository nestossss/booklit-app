import { Link } from "expo-router";
import { Image, View, Text } from "react-native";
import { StyleSheet } from "react-native";

function LivroCard({
   googleId,
   title,
   imageUrl,
   authors,
}){
   return (
      <Link push href={`/InfoLivro?googleId=${googleId}`}>
         <View style={styles.container}>
            <View style={styles.imgThumbnail}>
               <Image source={{
                  uri: imageUrl? imageUrl : "https://books.google.com/books/content?id=tRl6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
               }} style={styles.image}/>
            </View>
            <Text style={styles.textTitle} numberOfLines={2}>{title}</Text>
            <Text style={styles.textAuthors} numberOfLines={1}>{authors}</Text>
         </View>
      </Link>
   )
}

export { LivroCard }

const styles = StyleSheet.create({
   container: {
      width: 120,
      padding: 10,
   },
   imgThumbnail: {
      width: 100,
      aspectRatio: 2/3,
      marginBottom: 8,
   },
   image: {
      borderRadius: 12,
      width: "100%",
      height: "100%",
   },
   textTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: "#fff",
   },
   textAuthors: {
      flex: 1,
      fontSize: 12,
      color: "#A8A8A8"
   },
})