import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
height:2rem;
width:12rem,
border-radius: 3px;
border:0;
outline: none;
position: relative;
margin: 0.5rem;
padding-left: 0.25rem;
font-size: 16px;
font-weight: 500;
&.focus {
    outline:none;
}
`;

export const Input = ({onChange,value,style}) => {
    return (
        <StyledInput onChange={(e)=>onChange(e.target.value)} value={value}/>
    )
}

export default Input;
