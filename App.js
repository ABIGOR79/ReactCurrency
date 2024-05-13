
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet,
   ActivityIndicator, TouchableOpacity, 
   Text, NativeLinearGradient, StatusBar,
    Alert, FlatList } from 'react-native';
import appStyles from '../ReactCurrency/styles/styleApp';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {PostCard} from './components/Currency/postCurrency';
import { PostList } from './components/Currency/postList';
import { CurrencyCard} from './components/Details/postDetailsCurrency';
import { useRoute } from '@react-navigation/native';
import {URL, API_KEY, BASE_CURRENCY, getToday, getWeekAgo} from '../ReactCurrency/utils/utils'
import BottomBar from './components/Currency/postBottomBar';
import DetailBottomBar from './components/Details/detailBottomBar'
import {ChartDetailCard} from './components/Details/chartsDetail';
import { ResultButton } from './components/Details/resultDetails';





// Компонент сплэш-экрана
const SplashScreen = () => {
  return (
    <View style={appStyles.splashContainer}>
      <Image source={require('./assets/images/splash.png')} style={appStyles.image} />
    </View>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('CurrencyScreen');
  };

  return (
    <View style={appStyles.container}>
      <StatusBar theme="auto" />
      <PostRates>
        <PostText>Currency of</PostText>
        <PostText>all the world</PostText>
        <TouchableOpacity style={appStyles.button} onPress={handleNextPress}>
          <Text style={appStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </PostRates>
    </View>
  );
};

const CurrencyScreen = ({ isDarkMode, toggleTheme }) => {
  const [currencyData, setCurrencyData] = useState(null);
  const [currencyAllData, setCurrencyAllData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCurrencyData, setFilteredCurrencyData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [currencyDifference, setCurrencyDifference] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const startDate = getWeekAgo();
      const endDate = getToday();
      const apiKey = API_KEY;
      const baseCurrency = BASE_CURRENCY;

      const url = `${URL}?base=${baseCurrency}&start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const lastDate = Object.keys(data.response)[Object.keys(data.response).length - 1];

      setCurrencyData(data.response[lastDate]);
      setCurrencyAllData(data.response);

      const firstDate = Object.keys(data.response)[0];
      const firstValue = data.response[firstDate];
      const lastValue = data.response[lastDate];
      const difference = {};
      Object.keys(lastValue).forEach(currency => {
        difference[currency] = lastValue[currency] - firstValue[currency];
      });
      setCurrencyDifference(difference);

      setRefreshFlag(false); 
    } catch (error) {
      console.error('Error fetching currency data:', error);
      Alert.alert('Failed to get list of currencies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshFlag]); 

  useEffect(() => {
    if (currencyData) {
      setFilteredCurrencyData(Object.entries(currencyData));
    }
  }, [currencyData]);

  const filterSearch = (text) => {
    const searchText = text.substring(0, 3).toUpperCase();
    
    if (searchText.length === 3) {
      const filteredList = Object.entries(currencyData).filter(([name]) =>
        name.toUpperCase().startsWith(searchText)
      );
      setFilteredCurrencyData(filteredList);
    } else {
      setFilteredCurrencyData(Object.entries(currencyData));
    }
  };

  const refreshPage = () => {
    setRefreshFlag(true);
    setSelectedCurrency('');
    filterSearch('');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const containerStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <View style={containerStyle}>
      <PostCard 
        isDarkMode={isDarkMode} 
        filterSearch={filterSearch} 
        allCurrencies={currencyData}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency} 
      />
      <FlatList
        data={filteredCurrencyData || Object.entries(currencyData)}
        renderItem={({ item }) =>
          <PostList 
            isDarkMode={isDarkMode} 
            currencyData={{ [item[0]]: item[1] }} 
            currencyDifference={currencyDifference} 
            data={currencyAllData} 
          />
        }
        keyExtractor={(item) => item[0]}
      />
      <BottomBar 
        refreshPage={refreshPage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme} 
      />
    </View>
  );
};

const CurrencyDetailsScreen = ({ isDarkMode, toggleTheme }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { currency, value, difference, data } = route.params;
  
  const currencyValuesArray = Object.values(data).slice(0, 6).map(dayData => dayData[currency]);

  const [textInputValue, setTextInputValue] = useState('TRY');
  const [result, setResult] = useState('');

  const multiplyValue = (inputValue) => {
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      return parsedValue * value;
    } else {
      return 'Invalid input';
    }
  };

  const handleResult = () => {
    const resultValue = multiplyValue(textInputValue); 
    setResult(resultValue);
  };

  const handleBackPress = () => {
    navigation.navigate('CurrencyScreen');
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>
      <CurrencyCard 
        name={currency} 
        value={value} 
        result={result}
        textInputValue={textInputValue}
        setTextInputValue={setTextInputValue}
      />
      <ChartDetailCard 
        currencyDifference={difference} 
        currencyValues={currencyValuesArray} 
      />   
      <ResultButton onPress={handleResult}/>   
      <DetailBottomBar 
        backToCurrency={handleBackPress}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplash ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CurrencyScreen">
              {(props) => <CurrencyScreen {...props} isDarkMode={isDarkMode} toggleTheme={toggleTheme} options={{ headerShown: false }} />}
            </Stack.Screen>
            <Stack.Screen name="CurrencyDetailsScreen">
              {(props) => <CurrencyDetailsScreen {...props} isDarkMode={isDarkMode} toggleTheme={toggleTheme} options={{ headerShown: false }} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {showSplash ? (
  //         <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
  //       ) : (
  //         <>
  //           <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
  //           <Stack.Screen name="CurrencyScreen" component={CurrencyScreen} options={{ headerShown: false }} />
  //           <Stack.Screen name="CurrencyDetailsScreen" component={CurrencyDetailsScreen} options={{ headerShown: false }} />
  //         </>
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
};

export default App;

// Стилізований компонент Button
const StyledButton = styled.Button` 
width:50px;
 display:block;
  color: white;
  background: red;
  border-radius: 15px;
`;

const PostRates = styled.View`
width: 200px;
  padding: 15px;  
`;

const PostText = styled.Text`
  padding: 5px;
  font-size: 28px;
  font-weight: bold;
  color: black;
`;

