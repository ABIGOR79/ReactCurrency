import styled from "styled-components/native";


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
flex:1;
  flex-direction: column;
  height: 100px;
  margin:5px;
  border-radius:5px;
  
`;

const PostTextChoose = styled.Text`
  font-size: 14px;
  color: white;
  padding:5px;
`;

const PostSearch = styled.TextInput`
  height: 60px;
  background-color: white;
  padding-start: 5px;
  border-radius:5px;
  
`;

const PostDropView = styled.View`
flex:1;
  flex-direction: column;
  height: 100px;
  margin:5px;
  border-radius:5px;
`;

const PostDropText = styled.Text`
  font-size: 14px;
  color: white;
  padding:5px;
`;

const PostDrop = styled.TextInput`
  height: 60px;
  background-color: white;
  padding-start: 5px;
  border-radius:5px;
`;

export const PostCard = ({ isDarkMode }) => {
  
  return (
    <PostViewCard>
      <PostTextRates isDarkMode={isDarkMode}>Exchange Rates</PostTextRates>
      <PostCardDetails>
        <PostCurrencyView>
          <PostTextChoose>Search Currency</PostTextChoose>
          <PostSearch  defaultValue="TRY" type="text"/>
        </PostCurrencyView>
        <PostDropView>
          <PostDropText>Chose Currency</PostDropText>
          <PostDrop defaultValue="TRY" type="text"/>
        </PostDropView>
      </PostCardDetails>
    </PostViewCard>
  );
};

