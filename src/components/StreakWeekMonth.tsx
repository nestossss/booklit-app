import { Dimensions, Text, View } from 'react-native'
import type { StreakMonth } from '../util/types'

function StreakWeekMonth({month}: {month: StreakMonth}) {
   const width = Dimensions.get('window').width;

   return (
      <View className='bg-rose-100' style={{width: width}}>
         <Text> aosio </Text>
      </View>
   )
}


export { StreakWeekMonth }