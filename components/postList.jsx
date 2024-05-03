import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const PostListCard = styled.View`
  padding: 5px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0.1);
  margin: 5px;
`;

const PostCurrencyContainer = styled.View`
  height: 50px;
  width: 50px;
  border-width: 1px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

const PostCurrency = styled.Text`
  font-size: 18px;
  text-align: center;
  align-items: center;
  color: blue;
`;

const PostCurrencyName = styled.Text`
  font-size: 18px;
`;

const PostCurrencyValue = styled.Text`
  font-size: 18px;
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

export const PostList = ({ currencyData }) => {

  const navigation = useNavigation();

  const handleNextPressDetails = (currency, value) => {
    navigation.navigate('CurrencyDetailsScreen', { currency, value });
  };
  return (
    <View>
      {Object.entries(currencyData).map(([currency, value]) => (
        <PostListCard key={currency}>
          <PostCurrencyContainer>
            <PostCurrency>{currency}</PostCurrency>
          </PostCurrencyContainer>
          <PostCurrencyName>{currency}</PostCurrencyName>
          <PostCurrencyValue>{value}</PostCurrencyValue>
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