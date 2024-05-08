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
margin-start: 10px;
  font-size: 18px;
  color: ${props => props.isDarkMode ? 'white' : 'black'};
`;

const PostValueView = styled.View`
flex:1;
flex-direction: column;
justify-content: start;
margin-left: 25px;
`;


const PostCurrencyValue = styled.Text`
  font-size: 18px;
  color: ${props => props.isDarkMode ? 'white' : 'black'};
`;

const PostVauleDifference = styled.Text`
font-size: 14px;
color: black;

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




export const PostList = ({ currencyData, isDarkMode }) => {
  const navigation = useNavigation();

  const handleNextPressDetails = (currency, value) => {
    navigation.navigate('CurrencyDetailsScreen', { currency, value });
  };

  return (
    <View>
      {Object.entries(currencyData).map(([currency, value]) => (
        <PostListCard key={currency}>
          <PostCurrencyContainer isDarkMode={isDarkMode}>
            <PostCurrency>{getCurrencySymbol(currency)}</PostCurrency>
          </PostCurrencyContainer>
          <PostCurrencyName isDarkMode={isDarkMode}>{currency}</PostCurrencyName>
          <PostCurrencyValue isDarkMode={isDarkMode}>{value}</PostCurrencyValue>
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
