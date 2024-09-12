import { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableHighlight } from "react-native";
import { getDateWithoutTime } from "../../../util/date";
import { useSession } from "../../../hooks/useSession";
import { StreakWeek } from "../../../components/StreakWeek";
import { StreakInfo } from "../../../components/StreakInfo";
import api from "../../../api/api";

import type { StreakData, StreakDay, StreakMonth } from "../../../util/types";
import type { Dispatch, SetStateAction } from "react";

const onFireIcon = require('../../../../assets/icons/fire-on-icon.png');
const offFireIcon = require('../../../../assets/icons/fire-on-icon.png');

const weekdaysString = ["D", "S", "T", "Q", "Q", "S", "S"]
const monthsString = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


export default function Streak({navigation, setFocusHeight}){
    
    const [session] = useSession();
    const [streakMonths, setStreakMonths]:[StreakMonth[] | null, Dispatch<SetStateAction<StreakMonth[]>>] = useState(null);
    const [lastStreak, setLastStreak] = useState(null);
    const [selectedMonth, setSelectedMonth]: [number, Dispatch<SetStateAction<number>>]= useState(0);

    const [expanded, setExpanded] = useState(false); 
    const yesterday = getDateWithoutTime(new Date(Date.now()-86400000));

    useEffect( () => {                //no futuro: 'tabPress' 
        const adjustHeight = navigation.addListener('focus', (e) => {
            //no futuro: startAnim() logica da animacao;
            setFocusHeight(Dimensions.get('screen').height*0.35);
        })
        const blurListener = navigation.addListener('blur', () => {
            setExpanded(false);
        })

        return () => {
            blurListener();
            adjustHeight()
        }
    }, []);

    useEffect(() => {
        if(expanded){
            setFocusHeight(Dimensions.get('screen').height*0.7)
        } else {
            setFocusHeight(Dimensions.get('screen').height*0.35)
        }
    },[expanded])

    useEffect( () => {
        const controller = new AbortController();
        const signal = controller.signal
    
        async function fetchStreak(){
            let headers = {
                Authorization: 'Bearer '+session.token 
             }
    
            let res = await api.get('/streak', { headers, signal }).catch( (err) => { console.log("streak erro: "+ err.message)})
            if(!res) return;
            if(res.status != 200 || !res.data) return console.log('erro streak');
            if(res?.data?.streakList && res.data.streakList.length > 0){
                let streakDataList: StreakData[] = res.data.streakList.map( (streak: any) => {
                    return {
                        streakId: streak.streakId,
                        start: new Date(streak.start),
                        end: new Date(streak.end),
                    }
                })
                // streaks = formatStreaks(streaks);
                setLastStreak( getDateWithoutTime(streakDataList[streakDataList.length-1].end) )
                console.log(streakDataList[streakDataList.length-1].end);
                return setStreakMonths( formatStreak(streakDataList) );
            }
            return setStreakMonths([]);
        }
        fetchStreak();

         return () => {
            controller.abort();
        }
    }, []);

    if(streakMonths == null || streakMonths?.length <= 0){
        return (
            <View>
                <Text>
                    Carregando?
                </Text>
            </View>
        )
    }

    return (
        <View className={"flex-1 bg-screen-black justify-center items-center py-6"}> 
            <View className="flex-1 w-11/12 rounded-xl bg-black p-3">
                <StreakInfo expanded={expanded} setExpanded={setExpanded} lastStreak={lastStreak}/>
                {
                !expanded?
                    <StreakWeek months={streakMonths}/>
                :
                    <View>
                        <View className="w-full flex-row justify-center">
                            <View>
                                <Text className="text-white text-lg font-semibold">
                                    Trilha Mensal
                                </Text>
                                <View>
                                    <Text className="text-zinc-500 font-bold text-base">
                                        {monthsString[streakMonths[selectedMonth].monthIndex]} {streakMonths[selectedMonth].year}
                                    </Text>
                                    <View>
                                        <TouchableHighlight>
                                            <View></View>
                                        </TouchableHighlight> 
                                        <TouchableHighlight>
                                            <View></View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                            <View>

                            </View>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

function formatStreak(streakDataList: StreakData[]): StreakMonth[]{
    let actualDate = new Date(Date.now());
        
    let anoInicial = streakDataList[0].start.getFullYear();
    let anoFinal = actualDate.getFullYear();

    let mesInicial = streakDataList[0].start.getMonth();
    let mesFinal = actualDate.getMonth();
    
    let months: StreakMonth[] = [];

    let startDate = getDateWithoutTime(streakDataList[0].start); 
    let endDate = getDateWithoutTime(streakDataList[0].end);

    let streakDataListIndex = 0;

    // itera a quantidade de meses de uma data inicial ate a data final (provavlemente  atual)
    // years past representa os anos que ja foram percorridos pelo loop
    // daysInMonth ta sendo o que ve qual é a quantidade de dias em cada mês
    // não tem separacao por ano, mas cada mes tem o ano correspondente, pra facilitar na hora de mostrar
    for(let yearsPast = 0; yearsPast <= anoFinal - anoInicial; yearsPast++){
        for(let i = (yearsPast == 0? mesInicial: 0); i < (anoInicial+yearsPast == anoFinal? mesFinal+1 : 12); i++){
            let daysInMonth = (new Date(anoInicial+yearsPast, i+1, 0)).getDate();
            let month: StreakMonth = {
                year: anoInicial+yearsPast,
                monthIndex: i, 
                days: []
            };
            

            for(let j = 0; j < daysInMonth; j++){
                let thisDate = new Date(anoInicial+yearsPast, i, j+1);
                let status: "unchecked" | "checked" | null;
                //Talvez esses testes não sejam a coisa mais otimizada do mundo, vamo vekkkkkkk
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
                // lembrando que o getTime() ta pegando o timestamp puro (SO POR ENQUANTO), contando as horas, ouseja, 
                // tem uns dia bipolar aí, no dia vai dar como nao feito, no outro vai ta verdinho
                // DEU CERTO  --QUASE DE PRIMEIRA-- FIIOAJSIOAWJE IUNWAIU NWIU AN daeleelelelelele 
                // terminei ontem, nao tinha testado, só fiz isso agr
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
    return months;

}