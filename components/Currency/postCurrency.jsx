
import styled from "styled-components/native";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';


const PostViewCard = styled.View`
  flex-direction: column;
  margin: 5px;
  padding:5px;
  border-radius:5px;
`;

const PostTextRates = styled.Text`
  font-size: 18px;
  margin: 10px;
  font-weight: 700;
  color: ${props => props.isDarkMode ? 'white' : 'black'};
`;

const PostCardDetails = styled.View`
  flex-direction: row;
  border-radius:5px;
  background-color: blue;
`;

const PostCurrencyView = styled.View`
  flex: 1;
  flex-direction: column;  
  justify-content: center;
  margin: 5px;
  height: 100px;   
  border-radius: 5px;
  align-items: flex-start; 
  `;

const PostTextChoose = styled.Text`
  font-size: 14px;
  color: white;
  padding:5px;
`;

const PostSearch = styled.TextInput`
  height: 70px;
  background-color: white;
  padding-start: 15px;
  border-radius:5px;
  width:100%;
  
`;

const PostDropView = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 5px;
  height: 70px; /* Установите одинаковую высоту */  
  
  align-items: flex-start; /* Выравнивание по левому краю */
`;

const PostDropText = styled.Text`
  font-size: 14px;
  color: white;
  padding:5px;
  
`;

const PostPickerView = styled.View`
width: 100%; 
  height: 70px;
  background-color: white;
  padding-top: 7px;
  border-radius: 5px;
`;
const PostPicker = styled(Picker)`
width: 100%;
`;




export const PostCard = ({ isDarkMode, filterSearch, allCurrencies, selectedCurrency, setSelectedCurrency }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);

  useEffect(() => {
    if (allCurrencies) {
      setFilteredCurrencies([['', ''], ...Object.entries(allCurrencies)]); // Добавляем пустой элемент в начало списка
    }
  }, [allCurrencies]);

  const handleChangeText = (text) => {    
    const searchText = text.substring(0, 3); 
    setSearchValue(searchText);
    filterSearch(searchText); // Передаем введенное значение для фильтрации
  };

  const handleCurrencySelect = (itemValue) => {
    setSelectedCurrency(itemValue); // Обновляем выбранную валюту
    filterSearch(itemValue); // Фильтруем список по выбранной валюте
  };
  
  return (
    <PostViewCard>
      <PostTextRates isDarkMode={isDarkMode}>Exchange Rates</PostTextRates>
      <PostCardDetails>
        <PostCurrencyView>
          <PostTextChoose>Search Currency</PostTextChoose>
          <PostSearch value={searchValue} onChangeText={handleChangeText} placeholder="Enter currency" />
        </PostCurrencyView>        
        <PostDropView>
          <PostDropText>Choose Currency</PostDropText>
          <PostPickerView>
            <PostPicker
              selectedValue={selectedCurrency ? selectedCurrency : ''}
              onValueChange={handleCurrencySelect}
              mode="dropdown" 
              style={{
                width: '100%', 
                backgroundColor: 'white',
              }}>
              {filteredCurrencies.map(([currencyName], index) => ( // Отображаем значение и ключ в качестве key
                <Picker.Item label={currencyName || ''} value={currencyName || ''} key={index} />
              ))}
            </PostPicker>
          </PostPickerView>
        </PostDropView>
      </PostCardDetails>
    </PostViewCard>
  );
}; 

