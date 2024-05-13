import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { getCurrencySymbol } from '../../utils/utils';

const PostListCard = styled.View`
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0.1);
  margin: 5px;
  margin-bottom: 10px;
`;

const PostCurrencyContainer = styled.View`
  height: 50px;
  width: 50px;
  border-width: 1px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  borderColor: ${props => props.isDarkMode ? 'white' : 'black'};
`;

const PostCurrency = styled.Text`
  font-size: 18px;
  text-align: center;
  align-items: center;
  color: blue;
`;

const PostCurrencyName = styled.Text`
  font-size: 18px;
  color: ${props => props.isDarkMode ? 'white' : 'black'};
  width: 100px; 
  padding-start:20px;
`;


const PostValueView = styled.View`

flex-direction: column;
justify-content: start;
align-items: start;
margin-left: 25px;
`;


const PostCurrencyValue = styled.Text`
  font-size: 18px;
  text-align: left;
  color: ${props => props.isDarkMode ? 'white' : 'black'};
  width: 100px; /* Примерно фиксированная ширина */
`;

const PostVauleDifference = styled.Text`
  font-size: 14px;
  text-align: left;
  width: 100px; /* Примерно фиксированная ширина */
`;

const PostNextScreen = styled.View`
  height: 50px;
  width: 70px;
  background-color: blue;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const PostNextText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;




export const PostList = ({ currencyData, currencyDifference, isDarkMode, data }) => {
  const navigation = useNavigation();

  const handleNextPressDetails = (currency, value) => {
    const difference = currencyDifference[currency]; 
    const newIsDarkMode = !isDarkMode;
    navigation.navigate('CurrencyDetailsScreen', { currency, value, difference, data, newIsDarkMode });
  };
  const newIsDarkMode = !isDarkMode;

  return (
    <View>
      {Object.entries(currencyData).map(([currency, value]) => (
        <PostListCard key={currency}>
          <PostCurrencyContainer isDarkMode={isDarkMode}>
            <PostCurrency>{getCurrencySymbol(currency)}</PostCurrency>
          </PostCurrencyContainer>
          <PostCurrencyName isDarkMode={isDarkMode}>{currency}</PostCurrencyName>
          <PostValueView>
            <PostCurrencyValue 
              isDarkMode={isDarkMode}
            >
              {value.toFixed(5)}
            </PostCurrencyValue>
            <PostVauleDifference 
              style={{ color: currencyDifference[currency] >= 0 ? 'green' : 'red' }}
            >
              {currencyDifference[currency].toFixed(5)}
            </PostVauleDifference>
          </PostValueView>
          
          <TouchableOpacity onPress={() => handleNextPressDetails(currency, value)}>
            <PostNextScreen>
              <PostNextText>&gt;</PostNextText>
            </PostNextScreen>
          </TouchableOpacity>
        </PostListCard>
      ))}
    </View>
  );
};












// const PostList = ({ currencyData, isDarkMode }) => {
//   const navigation = useNavigation();

//   const handleNextPressDetails = (currency, value) => {
//     navigation.navigate('CurrencyDetailsScreen', { currency, value });
//   };

//   return (
//     <View>
//       {Object.entries(currencyData).map(([currency, value]) => (
//         <PostListCard key={currency}>
//           <PostCurrencyContainer>
//             {/* Используйте функцию getCurrencySymbol здесь */}
//             <PostCurrency>{getCurrencySymbol(currency)}</PostCurrency>
//           </PostCurrencyContainer>
//           <PostCurrencyName isDarkMode={isDarkMode}>{currency}</PostCurrencyName>
//           <PostCurrencyValue isDarkMode={isDarkMode}>{value}</PostCurrencyValue>
//           <TouchableOpacity onPress={() => handleNextPressDetails(currency, value)}>
//             <PostNextScreen>
//               <PostNextText>&gt;</PostNextText>
//             </PostNextScreen>
//           </TouchableOpacity>
//         </PostListCard>
//       ))}
//     </View>
//   );
// };

// export default PostList;
