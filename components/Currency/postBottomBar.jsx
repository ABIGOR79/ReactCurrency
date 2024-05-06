import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

const BottomBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding-vertical: 10px;
  border-top-width: 1px;
  border-top-color: #ccc;
  margin-top: 5px;
  paddingHorizontal: 20px;
`;

const BottomBarButton = styled(TouchableOpacity)`
  padding: 10px;
`;

const BottomBar = ({fetchData, isDarkMode, toggleTheme}) => {
    
  const handleRefreshPress = () => {
    fetchData();
  };

  const handleThemeChangePress = () => {
    toggleTheme();
  };

  return (
    <BottomBarContainer>
      <BottomBarButton onPress={handleRefreshPress}>
        <Icon name="refresh" size={30} color="black" />
      </BottomBarButton>
      <BottomBarButton onPress={handleThemeChangePress}>
        <Icon name="brightness-6" size={30} color="black" />
      </BottomBarButton>
    </BottomBarContainer>
  );
};

export default BottomBar;
