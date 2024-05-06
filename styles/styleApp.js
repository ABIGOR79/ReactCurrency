import { StyleSheet } from "react-native";
import secondStyle from 'styled-components/native'

// Стили
const appStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexdirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
                
      
    },
    lightMode: {
    backgroundColor: 'white',
  },

  darkMode: {
    backgroundColor: 'black',
  },

    splashConainer:{
      flex:1,
      padding:1,
      justifyContent: 'center',
    },

    currencyContainer:{
      flex:1,
      flexdirection: 'column',

    },

    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    viewContainer:{
      width:200,

    },
    currencyResultContainer:{
      flex: 1,
      flexdirection: 'column',      
      alignItems: 'start',  
    },
    flatListContent: {
      paddingBottom: 20, // добавляем отступ снизу для FlatList
    },    
  });

  export default appStyles;