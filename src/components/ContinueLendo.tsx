import { View, ScrollView, Text, Image, Dimensions, StyleSheet, StatusBar, FlatList, TouchableHighlight } from "react-native"
import { useLib } from "../hooks/useLib"
import { SetStateAction, useState } from "react";
import { router } from "expo-router";

function ContinueLendo(){
   const [onIndex, setIndex]: [number, React.Dispatch<SetStateAction<number>>] = useState(0);
   const [lib, setLib] = useLib();
   if(!lib.sendoLidos || lib.sendoLidos.length <= 0){
      return <>
      </>
   }

   function handleVoltarLer(){
      let livro = lib.sendoLidos[onIndex].livro; 
      router.navigate({ pathname: "/Cronometro",  params:{ 
         googleId: livro.bookUrl,
         title: livro.titulo,
         authors: livro.autores,
         imgUri: livro.imgUri,
         totalPagParams: livro.totalPag,
         pagLidasParams: lib.sendoLidos[onIndex].paginasLidas,
         tempoLidoParams: lib.sendoLidos[onIndex].tempoLido,
      } })
      return;
   }

   function handleAtualizarProgresso(){
      let livro = lib.sendoLidos[onIndex].livro; 
      router.navigate({
         pathname: '/EditLivro',
         params: {
            'googleId': livro.bookUrl,
            'pagLidasParams': lib.sendoLidos[onIndex].paginasLidas,
            'pagTotaisParams': livro.totalPag,
            'tempoLidoParams': lib.sendoLidos[onIndex].tempoLido,
            'statusParams': lib.sendoLidos[onIndex].paginasLidas == 0? "Salvo" : lib.sendoLidos[onIndex].paginasLidas >= livro.totalPag? 'Terminado': "Sendo lido"
         }
      })
      return;
   }

   return (
      <View className="flex items-center w-full">
         <View className="w-full">
            <FlatList
               showsHorizontalScrollIndicator={false}
               key="keepReadingScroll"
               horizontal
               nestedScrollEnabled
               contentContainerStyle={styles.container}
               pagingEnabled
               onMomentumScrollEnd={(e) => {
                  setIndex( () => { 
                     
                     console.log("onIndex: "+ Math.floor(e.nativeEvent.contentOffset.x)/Math.floor(Dimensions.get('window').width));
                     return Math.floor(Math.floor(e.nativeEvent.contentOffset.x)/Math.floor(Dimensions.get('window').width) ) } )
               }} 
               data={ lib.sendoLidos }
               renderItem={ ({item, index}) => {
                  return <View style={{ 
                     marginLeft:index == 0? Dimensions.get('window').width/4 : 0,
                     marginRight: index != lib.sendoLidos.length? Dimensions.get('window').width/2 : 0,   
                     width: Dimensions.get('window').width/2, 
                     aspectRatio: 2/3
                  }}>
                     <Image className="w-full h-full rounded-xl" source={{uri: item.livro.imgUri.replace('http://', 'https://')}} />
                  </View>
               }}
               />
         </View>
         <View className="w-10/12 py-2">
            <Text numberOfLines={3}  className="text-lg text-white text-center font-bold">{lib.sendoLidos[onIndex].livro.titulo}</Text>
            <Text numberOfLines={1} className=" text-center text-zinc-400">{lib.sendoLidos[onIndex].livro.autores.map( (autor) => autor.toUpperCase())}</Text>
         </View>
         <View className="w-11/12 flex-row">
            <View className="w-10/12 py-1 flex-row">
               <View className="w-full bg-yellow-green rounded-xl flex-row">
                  <View
                     className="bg-main-green rounded-xl" 
                     style={{ 
                        width: `${lib.sendoLidos[onIndex].paginasLidas/(lib.sendoLidos[onIndex].livro.totalPag/100)}%`,}}
                  ></View>
               </View> 
            </View>
            <View className="w-2/12 justify-center">
               <Text
                  numberOfLines={1} 
                  className="text-zinc-500 text-right">
                     {Math.floor(lib.sendoLidos[onIndex].paginasLidas/(lib.sendoLidos[onIndex].livro.totalPag/100))}%
               </Text>
            </View>
         </View>
         <View className="w-11/12">
            <Text className="text-zinc-500 text-right">{lib.sendoLidos[onIndex].livro.totalPag - lib.sendoLidos[onIndex].paginasLidas} páginas restantes</Text>
         </View>
         <View className="w-11/12 py-4 flex-row">
            <TouchableHighlight 
               className="border-main-green border-2 flex-1 mr-5 rounded-xl"
               style={{ aspectRatio: 3.5/1}}   
               onPress={handleAtualizarProgresso}
            >
               <View className="h-full justify-center">
                  <Text className="text-main-green text-center">Atualizar progresso</Text>
               </View>
            </TouchableHighlight>
            <TouchableHighlight
               className="bg-main-green flex-1 rounded-xl"
               style={{ aspectRatio: 3.5/1}}
               onPress={handleVoltarLer}
            >
               <View className="h-full justify-center">
                  <Text className="text-white text-center">Voltar a ler</Text>
               </View>
            </TouchableHighlight>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      paddingTop: StatusBar.currentHeight + 8,
      alignItems: 'center',
      height: '100%',
   },
})

export { ContinueLendo }