import { View, ScrollView, Text, Image } from "react-native"
import { useLib } from "../hooks/useLib"


function ContinueLendo({}){
   const [lib] = useLib();

   return ( 
      <View>
         <ScrollView
            className=""
            horizontal
            nestedScrollEnabled
            pagingEnabled
            onScrollEndDrag={ () => {
               
            }}
         >  
            {
               lib.sendoLidos.map( (registro) => {
                  let livro = registro.livro;
                  return <View className="flex p-2 justify-center items-center">
                     <Image source={{ uri: livro.imgUri.replace('http://', 'https://') }}/>
                  </View>
               })
            }
         </ScrollView>
         <View>
               
         </View>
      </View>
   )
}

export { ContinueLendo }