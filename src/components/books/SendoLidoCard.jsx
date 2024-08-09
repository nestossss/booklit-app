import { Image, View, Text } from "react-native"
import { Link } from "expo-router"

function SendoLidoCard({data}){
   return (
      <View> {/* container */}
         <View> {/* imgThumbnail*/}
         {data.livro.imageUri ? 
            <Image source={{
               uri: data.livro?.imagePath,
            }}>
            </Image>
            : undefined // outra imagem padrao aqui
         }
         </View>
         <View> { /* container informacoes do livro */}
            <Text numberOfLines={2}>{data.livro.titulo}</Text>
            <Text numberOfLines={1}>{data.livro.titulo}</Text>
            <Text numberOfLines={1}>{data.paginasLidas}/{data.livro.totalPag} Páginas Lidas</Text>
         </View>
         <Link href="../../app/screens/Books/">
         </Link>
      </View>
   )
}

export { SendoLidoCard }