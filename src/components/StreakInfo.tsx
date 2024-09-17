import { Image, Text, View, TouchableWithoutFeedback} from "react-native"
import { getDateWithoutTime } from "../util/date";
import React, { SetStateAction, useEffect, useState } from "react";

const onFireIcon = require('../../assets/icons/fire-on-icon.png');
const offFireIcon = require('../../assets/icons/fire-on-icon.png');

const StreakInfo = ({expanded, setExpanded, lastStreak, className}:{
   expanded: boolean,
   setExpanded: React.Dispatch<SetStateAction<boolean>>
   className?: string
   lastStreak: Date,
   streakCount: number
}) => {

   function StreakInfoCollapsed() {
      const today = getDateWithoutTime(new Date(Date.now()));
      const yesterday = getDateWithoutTime(new Date(Date.now()-86400000));
   
      return <TouchableWithoutFeedback onPress={ () => {
         setExpanded(prev => prev !=null? !prev : true );
      }}>
          <View className={className? className : "flex-row h-1/2"}>
               <View className="h-16 w-16">
                   <Image source={lastStreak.getTime() == today.getTime() || lastStreak.getTime() == yesterday.getTime()? onFireIcon : offFireIcon} className="w-full h-full" />
               </View>
               <View className="w-full">
                   <Text
                       className="text-white font-extrabold text-4xl" 
                       style={{ display: lastStreak.getTime() == today.getTime() || lastStreak.getTime() == yesterday.getTime()? "flex" : 'none'}}
                   >
                        1
                   </Text>
                   <Text className="text-zinc-600 w-full flex-1">
                       { lastStreak.getTime() == today.getTime()? 
                           "Sequencia diária" 
                           :  
                           lastStreak.getTime() == yesterday.getTime()? 
                           "Continue sua sequencia"
                           :
                           "Comece sua sequência de leitura"}
                   </Text>
               </View>
           </View>
      </TouchableWithoutFeedback>
   }
   
   function StreakInfoExpanded() {
      const today = getDateWithoutTime(new Date(Date.now()));
      const yesterday = getDateWithoutTime(new Date(Date.now()-86400000));

      return (
         <View className="w-full mb-8">
            <TouchableWithoutFeedback onPress={ () => {
               setExpanded(prev => !prev);
            }}>
               <View className="h-20 w-full">
                  <Text className="text-white text-xl font-bold">Sua Sequência</Text>
                  <Text className="text-zinc-600 w-full">Veja seu histórico de sequências passadas</Text>
               </View>
            </TouchableWithoutFeedback>
            <View className="flex-row justify-between">
               <View className="w-5/12 gap-y-2">
                  
                  <Text className="text-white text-center text-base font-bold">
                     Sequência atual
                  </Text>
                  <View className="h-18 w-full items-center justify-center flex-row">
                     <View className="h-12 w-1/2 items-end">
                        <Image source={lastStreak.getTime() == today.getTime() || lastStreak.getTime() == yesterday.getTime()? onFireIcon : offFireIcon} className="h-full aspect-square" />
                     </View>
                     <Text className="text-white font-extrabold text-4xl w-1/2" adjustsFontSizeToFit>
                        4{/* sequencia */}
                     </Text>
                  </View>
                  <View className="w-full flex-row justify-center">
                     <View className="bg-main-green/25 w-11/12 rounded-xl items-center flex-row py-0.5">
                        <Text numberOfLines={1} className="text-white font-semibold text-right w-3/5" adjustsFontSizeToFit style={{fontSize: 10}}>
                           Melhor streak
                        </Text>
                        <View className="justify-center w-1/5 items-center">
                           <Image 
                              className="w-4 h-4 align-middle"
                              source={onFireIcon} 
                           />
                        </View>
                        <Text className="text-white font-semibold w-1/5" adjustsFontSizeToFit>
                           54
                        </Text>
                     </View>
                  </View>

               </View>

               <View className="w-px h-full bg-zinc-700"></View>

               <View className="w-5/12 gap-y-2">
                  
                  <Text className="text-white text-center text-base font-bold">
                     Meta atual
                  </Text>
                  <View className="h-18 w-full items-center justify-center flex-row">
                     <View className="h-12 w-1/2 items-end">
                        <Image source={offFireIcon} className="h-full aspect-square" />
                     </View>
                     <Text className="text-white font-extrabold text-4xl w-1/2" >
                        10{/* sequencia */}
                     </Text>
                  </View>
                  <View className="w-full flex-row justify-center">
                        <View className="bg-main-green/25 w-11/12 rounded-xl items-center flex-row py-0.5">
                        <Text numberOfLines={1} className="text-white font-semibold text-right" style={{fontSize: 10, width: '60%'}} adjustsFontSizeToFit>
                           Melhor streak
                        </Text>
                        <View className="justify-center items-center" style={{width: '20%'}}>
                           <Image 
                              className="w-4 h-4 align-middle"
                              source={onFireIcon} 
                           />
                        </View>
                        <Text numberOfLines={1} className="text-white font-semibold" style={{width: '20%'}} adjustsFontSizeToFit>
                           53
                        </Text>
                     </View>
                  </View>

               </View>
            </View>
         </View>
      )
   }


   if(!expanded){
       return <StreakInfoCollapsed />
   }
   return <StreakInfoExpanded />
}

export { StreakInfo }