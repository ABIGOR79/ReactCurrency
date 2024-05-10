import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';







const DetailCard = styled.View`
flex-direction: column;
background-color: blue;
border-radius: 5px;
margin-top: 15px;
margin: 5px;
justify-content: top;
`;

const DetailText = styled.Text`
font-size: 20px;
padding-top: 20px;
padding-bottom: 20px;
padding-start: 15px;
font-weight: bold;
color: white;
`;

const DetailsResult = styled.View`
flex-direction: row;
margin: 5px;
`;

const DetailTextTryView = styled.View`
  flex: 1;
  padding: 5px;
  height: 80px;
`;

const DetailTextTry = styled.TextInput`
  font-size: 20px;
  padding-start: 25px;
  padding: 15px;
  color: black;
  border-radius: 10px;
  background-color: white;
  
  
`;

const DetailResultTextView = styled.View`
  flex: 1;
  flex-direction: column;
  height: 60px;
  background-color: white;
  padding: 5px; /* Добавляем padding */
  border-radius: 10px;
  margin-top:5px;
`;

const DetailTextName = styled.Text`
  font-size: 12px;
  color: lightgrey;
  margin-start: 5px;
`;

const DetailResultText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: black;
  padding-start: 5px;
  margin-bottom: 5px; 
`;




export const CurrencyCard = ({ name, value, result, textInputValue, setTextInputValue }) => {  

  return (
     <DetailCard>
         <DetailText>Details</DetailText>
         <DetailsResult>
             <DetailTextTryView>
                 <DetailTextTry
                     value={textInputValue} 
                     onChangeText={setTextInputValue}
                     keyboardType="numeric"
                 ></DetailTextTry>
             </DetailTextTryView>            
             <DetailResultTextView>
                 <DetailTextName>"{name} = {value}"</DetailTextName>
                 <DetailResultText>{result}</DetailResultText>
             </DetailResultTextView>
         </DetailsResult>
     </DetailCard>
  );
 }

