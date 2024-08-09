import { Image, View, Text } from "react-native";
import { StyleSheet } from "react-native";

function Livro({
   title,
   imageUrl,
   authors,
}){
   return (
      <View style={{ width: 120, height: 240}}>
         <View style={{ width: 60, height: 120}}>
            <Image source={{
               uri: imageUrl? imageUrl : "http://books.google.com/books/content?id=tRl6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            }} style={{width: 59, height: 118}}/>
         </View>
         <Text style={{color: "white"}} numberOfLines={3}>{title}</Text>
         <Text style={{color: "white"}} numberOfLines={1}>{authors}</Text>
      </View>
   )
}

export { Livro }

const styles = StyleSheet.create({
   
})