//     // esse for vai procurar o primeiro notnull pra pegar a ultima semana
//     // null na streak representa um dia que ainda nao chegou, ou que o usuario ainda nn tinha começado nenhuma streak (antes do primeiro .start ou depois do ultimo .end)
import { useEffect, useState } from "react";
import { StreakMonth, StreakDay } from "../util/types"
import { Image, Text, View } from "react-native";

const weekdaysString = ["D", "S", "T", "Q", "Q", "S", "S"]
const checkIcon  = require("../../assets/icons/check-small.png")
const crossIcon = require("../../assets/icons/close-small.png");

function StreakWeek({months}: {
   months: StreakMonth[]
}){
    const [ultimaSemana, setUltimaSemana] = useState<StreakDay[]>([]);

    useEffect( () => {
      if(!months) return setUltimaSemana(null);

      let ultimoMes = months[months.length-1];
      let primeiroDomingo: StreakDay;

      for(let i = ultimoMes.days.length-1; i >= 0; i-- ){
        if(ultimoMes.days[i].status != null){ // ultimoMes.days[i] = ultimoMes.days[0] //   ou seja, é dia primeiro
            if(i - ultimoMes.days[i].weekdayIndex < 0){  // weekdayIndex = 6 //           e dia primeiro é sabado
                let daysBack = i - ultimoMes.days[i].weekdayIndex // i=0 weekday=6 (i - weekday) = -6
                let mesAnterior: StreakMonth;
                if(months.length-2 >= 0){
                    mesAnterior = months[months.length-2];
                } else {
                    mesAnterior = createBlankPrevMonth(months[months.length-1]); 
                }                                       // tem no maximo 30 dias -> length = 30 || mesAnterior.days.length = 30
                // 30  + (- 6) ou seja (dia 1 é sab) ->  30 é sexta, 29 quinta, 28 quarta, 27 terca, 26, segunda, 25 domingo, 
                                                        //                         index do dia 25 é 24
                                                        // 30 - 6 = 24
                primeiroDomingo = mesAnterior.days[ mesAnterior.days.length + daysBack]; // esse primeiro domingo vai ser no mes anterior
            } else  primeiroDomingo = ultimoMes.days[i-ultimoMes.days[i].weekdayIndex] 
            i = -1;
        }
    }

    if (!primeiroDomingo || !primeiroDomingo.day) {
      console.error("primeiroDomingo está indefinido ou sem propriedade 'day'");
      return;
   }

    for(let j = primeiroDomingo.day-1; j < primeiroDomingo.day+6; j++){
      if (j >= ultimoMes.days.length || ultimoMes.days[j] === undefined) {
         console.error("Tentativa de acessar 'ultimoMes.days' fora dos limites.");
         continue;
      }
        if(j > ultimoMes.days.length && primeiroDomingo.weekdayIndex == ultimoMes.days[primeiroDomingo.day-1].weekdayIndex){
            let newDay = j - ultimoMes.days.length;
            let newWeekday =  j - primeiroDomingo.day-1;
            setUltimaSemana( prev => [
               ...prev,
               {
                  day: newDay,
                  status: null,
                  weekdayIndex: newWeekday,
              }
            ])
        } else if(j > createBlankPrevMonth(months[months.length-1]).days.length && primeiroDomingo.weekdayIndex != ultimoMes.days[primeiroDomingo.day-1].weekdayIndex){
            setUltimaSemana( prev => {
               return [
                  ...prev,
                  months[months.length-1].days[j - createBlankPrevMonth(months[months.length-1]).days.length]
               ];
            })
        } else {
            setUltimaSemana( prev => {
               return [
                  ...prev,
                  primeiroDomingo.weekdayIndex != ultimoMes.days[primeiroDomingo.day-1].weekdayIndex?
                     createBlankPrevMonth(months[months.length-1]).days[j]
                  :
                     months[months.length-1].days[j]
               ]
            });
        }
    }

    }, [months]);

    if(!months || !ultimaSemana || months.length <= 0 || ultimaSemana.length < 7){
      return <Text className="text-white w-full">
         Carregando talvez?
      </Text>
    }
 
    return (
      <View className="w-full h-1/2 flex-row justify-between">
         { ultimaSemana.map((day, index) => {
            return <View className="w-5 h-10">
                  <View className={"rounded-xl "+
                  (  
                     day.status == 'checked'? 
                        "bg-streak-made-green p-0.5 w-5 h-5" 
                     : day.status == 'unchecked'?
                        "bg-red-500 p-0.5 w-5 h-5"
                     :
                        ""
                  )
                     }>
                     <Image className="w-4 h-4" style={{ display: day.status == null? "none" : "flex"}} source={
                     day.status == "checked"?
                        checkIcon
                     :
                        crossIcon
                     } />
                     <View className="rounded-xl w-5 h-5 bg-gray-400 border-gray-500 border-2" style={{ display: day.status == null? "flex" : "none"}}></View>
                  </View>
                  <Text className="mt-1.5 text-base font-extrabold text-center text-white">{weekdaysString[day.weekdayIndex]}</Text>
               </View>
         })}
      </View>
   )
}

function createBlankPrevMonth(nextMonth: StreakMonth): StreakMonth{
   let month: StreakMonth = {
       year: nextMonth.monthIndex > 0? nextMonth.year:nextMonth.year -1 ,
       monthIndex: nextMonth.monthIndex > 0? nextMonth.monthIndex-1 : 12, 
       days: []
   };
   let daysInMonth = (new Date(month.year, month.monthIndex+1, 0)).getDate();
   let weekdayIndex = (new Date(month.year, month.monthIndex, 1)).getDay();
   for( let i = 0; i < daysInMonth; i++){
       month.days.push({
           day: i,
           status: null,
           weekdayIndex: weekdayIndex,
       })
       weekdayIndex++;
       if(weekdayIndex > 6) weekdayIndex = 0
   }
   return month;
}


export { StreakWeek }