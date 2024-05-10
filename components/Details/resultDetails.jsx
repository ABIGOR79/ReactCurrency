import styled from "styled-components/native";
import { View, TouchableOpacity } from 'react-native';


const DetailBtuttonView = styled.View`
width: 100%;
align-items: center;
justify-content: center;
padding-bottom: 10px;
`;
const DetailButtonResult = styled.View`
width:60%;
height:80px;
background-color:blue;
border-radius: 15px;
align-items: center;
justify-content: center;  
`;

const DetailResultText = styled.Text`
font-size: 20px;
color: white;
font-weight: bold;
`;


export const ResultButton = ({ onPress })=>{

    return(
        <TouchableOpacity onPress={onPress}>
        <DetailBtuttonView>
          <DetailButtonResult>
            <DetailResultText>Convert</DetailResultText>
          </DetailButtonResult>
        </DetailBtuttonView>
          
    </TouchableOpacity>
    )}
