import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  LineChart} from "react-native-chart-kit";
import { getDaysBetweenDates } from '../../utils/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';


const DetailChartView = styled.View`
flex:1;
flex-direction: column;
margin-top: 30px;
margin:5px;
margin-right: 5px;
`;

const DetailChartText = styled.Text`
margin-top: 30px;
font-size: 16px;
`;
const DetailChartWeek = styled.Text`

font-size: 14px;
`;

const DetailDif = styled.Text`
font-size: 14px;

`;
const ChartContainer = styled.View`
  width: 100%;
  height: 300px;
`;






    
 
  
export const ChartDetailCard = ({ currencyDifference, currencyValues }) => {
  const days = getDaysBetweenDates();

  if (!currencyValues || !Array.isArray(currencyValues)) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }
  
  return (
    <DetailChartView>
      <DetailChartText>Chart</DetailChartText>
      <DetailChartWeek>Last Week</DetailChartWeek>
      <DetailDif style={{ color: currencyDifference >= 0 ? 'green' : 'red' }}>{currencyDifference.toFixed(5)}</DetailDif>
      <ChartContainer>
        <LineChart
          data={{
            labels: days || [],
            datasets: [
              {
                data: currencyValues || []
              }
            ]
          }}
          width={Dimensions.get("window").width*0.97} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 5,
            borderRadius: 16
          }}
        />
      </ChartContainer>       
    </DetailChartView>
    
  );
};


  // const [chartData, setChartData] = useState([]);
  
    // useEffect(() => {
    //   if (currencyData) {
    //     const days = getDaysBetweenDates(); // Получаем дни недели
    //     const chartData = days.map(date => ({
    //       name: date,
    //       value: currencyData[date] ? currencyData[date].toFixed(5) : null // Получаем значение валюты для каждого дня, если оно есть
    //     }));
    //     setChartData(chartData);
    //   }
    // }, [currencyData]);