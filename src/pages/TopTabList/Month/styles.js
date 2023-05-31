import styled from 'styled-components';


export const YearArea = styled.View`
    margin-top: 10px;
    width: 90%;
`

export const InputArea = styled.View`
    width: 100%;
    flex-direction: row;   
    align-items: center;
    justify-content: space-between;
`

export const Input = styled.TextInput`
    width: 80%;
    height: 50px;
    background-color: rgba(32, 41, 46, 0.5);
    box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.90);
    border-radius: 5px;
    padding-left: 10px;
    color: #fff;
    border: 1px solid #20292E;
`


export const AddButton = styled.TouchableOpacity`
    width: 48px;
    height: 44px;
    background-color: #F5AF19;
    border-radius: 5px;
    align-items: center;
    color: #fff;
`