import styled from "styled-components";

export const Container = styled.View`
    flex: 1;
    background-color: #121212;
`
export const Box = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;
    
`
export const Background = styled.ImageBackground`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`

export const LogoText = styled.Text`
    font-weight: bold;
    font-size: 50px;
    color: #fff;
    text-align: center;
    line-height: 50px;
`

export const Input = styled.TextInput`
    width: 75%;
    border: 1px solid #FCA311;
    margin: 10px 0 10px 0;
    height: 50px;
    color: #fff;
    padding-left: 20px;
    border-radius: 40px;
`

export const TextArea = styled.TouchableOpacity`

`

export const Button = styled.TouchableOpacity`
    width: 75%;
    height: 50px;
    background-color: #FCA311;
    border-radius: 11px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 10px;
`

export const SignText = styled.Text`
    color: #fff;
    font-size: 25px;
`

export const Invalid = styled.Text`
    width: 90%;
    font-size: 15px;
    color: #D90429;
    text-align: center;
    font-weight: 400;
    height: ${props=> props.textHeight}px;
`