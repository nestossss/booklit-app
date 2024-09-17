import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native"
import type { Book, Record } from "../util/types"
import { Link } from "expo-router"
const playIcon = require('../../assets/icons/play.png')

export function LivroItemCard({info, type}: {
   info: Book,
   type: "default" 
} | {
   info: Record,
   type: "withRecord"
}){
   if(type == "default"){ 
      /* Para tela de busca e livros salvos */
      return (
         <Link 
            href={{
               pathname: '/InfoLivro',
               params: {
                  googleId: info.bookUrl,
               }
            }}
            asChild
         >
            <TouchableWithoutFeedback className="w-full">
               <View className="w-full flex-row mb-2 p-3 rounded-xl bg-black">
                  <View className="justify-center" style={{width: "25%"}}>
                     <Image style={{ aspectRatio: 2/3}} className="w-full rounded-xl" source={{
                        uri: info.imgUri.replace('http://', 'https://')
                     }}/>
                  </View>
                  <View style={{width: "70%"}} className="pl-5 gap-y-3 justify-between">
                     <View className="justify-between">
                        <Text className="text-base font-semibold pb-2 text-white w-full" numberOfLines={3}>{info.titulo} - {info.autores}</Text>
                        <Text className="text-zinc-500 font-semibold w-full">{info.totalPag} Páginas totais</Text>
                     </View>
                     <TouchableOpacity className="">
                        <View className="w-full items-center bg-main-green p-2 py-1.5 rounded-full">
                           <View className="w-2/3 flex-row items-center justify-between">
                              <Image className="w-1/6 aspect-square" source={playIcon}/>
                              <Text adjustsFontSizeToFit numberOfLines={1} className="text-center text-white font-extrabold w-5/6">
                                 Começar a ler
                              </Text>
                           </View>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </TouchableWithoutFeedback>
         </Link>
      )
   }
   
   return (
      <View className="w-full flex-row mb-2 p-3 rounded-xl bg-black">
         <View className="justify-center" style={{width: "25%"}}>
            <Image style={{ aspectRatio: 2/3}} className="w-full rounded-xl" source={{
               uri: info.livro.imgUri.replace('http://', 'https://')
            }}/>
         </View>
         <View style={{width: "70%"}} className="pl-5 gap-y-3 justify-between">
            <View className="justify-between">
               <Text className="text-base font-semibold pb-2 text-white w-full" numberOfLines={3}>{info.livro.titulo} - {info.livro.autores}</Text>
               <Text className="text-zinc-500 font-semibold w-full">{info.livro.totalPag} Páginas totais</Text>
            </View>
            <TouchableOpacity className="">
               <View className="w-full items-center bg-main-green p-2 py-1.5 rounded-full">
                  <View className="w-2/3 flex-row items-center justify-between">
                     <Image className="w-1/6 aspect-square" source={playIcon}/>
                     <Text adjustsFontSizeToFit numberOfLines={1} className="text-center text-white font-extrabold w-5/6">
                        Começar a ler
                     </Text>
                  </View>
               </View>
            </TouchableOpacity>
         </View>
   </View>
   )
}