import { View, ActivityIndicator, StyleSheet } from 'react-native';


export function LoadingScreen(){
   return (
      <View style={styles.loadingScreen}>
            <ActivityIndicator color={"#47A538"} size={100} />
      </View>
   )
}

const styles = StyleSheet.create({
   loadingScreen: {
      width: '100%',
      height: '100%', 
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
   },
   textLoadingScreen: {

   },
})
