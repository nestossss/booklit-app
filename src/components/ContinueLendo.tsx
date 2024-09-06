import { View, ScrollView, Text, Image, Dimensions, StyleSheet, StatusBar, FlatList } from "react-native"
import { useLib } from "../hooks/useLib"
import { SetStateAction, useState } from "react";
import { Library } from "../contexts/LibContext";

function ContinueLendo(){
   const [onIndex, setIndex]: [number, React.Dispatch<SetStateAction<number>>] = useState(0);
   const [lib, setLib] = useLib();
   if(!lib.sendoLidos || lib.sendoLidos.length <= 0){
      return <>
      </>
   }

   return (
      <View className="flex items-center w-full">
         <View className="w-full">
            <FlatList
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
                  return <View className={"bg-main-green"} style={{ 
                     marginLeft:index == 0? Dimensions.get('window').width/4 : 0,
                     marginRight: index != lib.sendoLidos.length? Dimensions.get('window').width/2 : 0,   
                     width: Dimensions.get('window').width/2, 
                     aspectRatio: 2/3
                  }}>
                     <Image style={{ width: "100%", height: "100%"}} source={{uri: item.livro.imgUri.replace('http://', 'https://')}} />
                  </View>
               }}
               />
         </View>
         <View className="w-10/12">
            <Text numberOfLines={3}  className="text-lg text-white text-center py-2 font-bold">{lib.sendoLidos[onIndex].livro.titulo}</Text>
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
         <View className="">
            <View>
               
            </View>
         </View>
         <View>
               
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#111111',
      paddingTop: StatusBar.currentHeight + 8,
      alignItems: 'center',
      height: '100%',
   },
})

export { ContinueLendo }