import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import api from "../../../api/api";

const checkIcon  = require("../../../../assets/icons/check-small.png")
const crossIcon = require("../../../../assets/icons/close-small.png");
const blankIcon = require("../../../../assets/icons/blank-small.png");

const onFireIcon = require('../../../../assets/icons/fire-on-icon.png');
const offFireIcon = require('../../../../assets/icons/fire-on-icon.png');

const weekdaysString = ["D", "S", "T", "Q", "Q", "S", "S"]
const monthsString = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


export default function Streak(){

    const [streakDataList, setStreakDataList]:[StreakData[] | null, React.Dispatch<React.SetStateAction<StreakData[]>> ] = useState(null);

    console.log(monthsString.length);

    function Day({status, weekday}: {
        status: "checked" | "unchecked" | "empty",
        weekday: number,
    }) {
        let dayIcon = 
        status == 'checked'?
            checkIcon
        : 
        status == 'unchecked'?
            crossIcon
        :   
        blankIcon 

        return <View >
            { 
                <Image source={dayIcon} width={24} height={24}/>
            }
            <Text>
                {weekdaysString[weekday]}
            </Text>
        </View>
    }


    
    useEffect( () => {
    }, []);

    function calcularInicio(){
        let ano = streakDataList[0].start.getFullYear();
        let mes = streakDataList[0].start.getMonth();
    }
    function calcularFinal(){
        let ano = (new Date(Date.now())).getFullYear();
        let mes = (new Date(Date.now())).getMonth();

        console.log("mes: ", monthsString[mes], " ano: ", ano)
    }

    
    function StreakMonths(){
        let actualDate = new Date(Date.now());
        
        let anoInicial = streakDataList[0].start.getFullYear();
        let anoFinal = actualDate.getFullYear();

        let mesInicial = streakDataList[0].start.getMonth();
        let mesFinal = actualDate.getMonth();
        
        let months: StreakMonth[] = [];

        let startDate = streakDataList[0].start; 
        let endDate = streakDataList[0].end;

        let streakDataListIndex = 0;

        for(let yearsPast = 0; yearsPast <= anoFinal - anoInicial; yearsPast++){
            for(let i = yearsPast > 0? mesInicial: 0; i < 12; i++){
                let daysInMonth = (new Date(anoInicial+yearsPast, i+1, 0)).getDate();
                let month: StreakMonth = {
                    year: anoInicial+yearsPast,
                    monthIndex: i, 
                    days: []
                };

                for(let j = 0; j < daysInMonth; j++){
                    let thisDate = new Date(anoInicial+yearsPast, i, j+1);
                    let status: "unchecked" | "checked" | null;

                    if(thisDate < startDate)
                        status = thisDate < streakDataList[0].start? null : 'unchecked'
                    else if(thisDate.getTime() == startDate.getTime() || (thisDate > startDate && thisDate < endDate))
                        status = "checked";
                    else if(thisDate.getTime() == endDate.getTime() ){
                        status = "checked";
                        if(streakDataListIndex+1 != streakDataList.length){
                            streakDataListIndex++;
                            startDate = streakDataList[streakDataListIndex].start;
                            endDate = streakDataList[streakDataListIndex].end; 
                        }
                    }
                    else status = null
                    // lembrando que o getTime() ta pegando o timestamp puro, contando as horas, ouseja, 
                    // tem uns dia bipolar aí kkkkkkkk
                    
                    let day = {
                        day: j+1,
                        weekdayIndex: thisDate.getDay(),
                        status: status,
                    }

                    month.days.push(day);
                }
                months.push(month);
            }
        }

        return (
            <View>
                { 
                    months.map( (month) => {
                        return month.days.map( (day) => {
                            return <Text className="text-white">Dia: {day.day} Status: {day.status} Ds: {weekdaysString[day.weekdayIndex]}</Text>
                        })
                    })
                }
                
            </View>
        )
    }

    return (
        <View className="flex-1 bg-black justify-center items-center py-16"> 
        
            <View>
                {}
            </View>
        </View>
    )
}
interface StreakMonth {
        year: number,
        monthIndex: number, 
        days: Array<StreakDay>
}
interface StreakDay {
    day: number,
    weekdayIndex: number,
    status: "unchecked" | "checked" | null,
}

interface StreakData {
    streakId: number,
    start: Date,
    end: Date,
}