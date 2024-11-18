import { Dimensions, Text, View, ViewStyle } from 'react-native'
import type { StreakDay, StreakMonth } from '../util/types'
import React from 'react';

function StreakDaily(props: {
   month: StreakMonth
}) {
   const { month } = props;

   let weeks: Array<StreakDay[]> = [];
   let tempWeek: StreakDay[] = [];
   let weeksCount: number;

   for(let i = 0; i < month.days.length; i++){
      tempWeek.push(month.days[i]);
      if(month.days[i].weekdayIndex == 6 || i == month.days.length-1){
         weeks.push(tempWeek)
         tempWeek = [];
      }
   }

   if(!weeks) return <></>;
   return (
      <View style={{width: Dimensions.get('screen').width*11/12-24, height: 160}}>
         { weeks.map( (week) => {
            return <View className='h-8 flex-row justify-between px-2'>
               { week.map( (day, weekIndex) => {
                  return <View className={'h-7 w-7 items-center justify-center flex-row '
                     + (day.status == 'checked'? 
                        "bg-main-green/25 " +
                        (month?.days[day.day-2]?.status == 'checked'? "" : "rounded-l-full")
                     : ""
                     ) 
                     + (
                        month.days.length-day.day-2 > 0 && month?.days[day.day-2]?.status == 'checked'? "" : ""
                     )
                  }>
                     <View className={"h-5 w-5 rounded-xl " + (day.status == 'checked'? "bg-main-green" : "bg-white")}>
                     </View>
                  </View>  
               })}
            </View>               
         })}
      </View>
   )
}




export { StreakDaily }