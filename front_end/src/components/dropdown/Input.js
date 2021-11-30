import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
height:3rem;
width:20rem;
border-radius: 10px;
border:2px;
border-style: solid;
border-color: #92a8d1;
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
        
            
      <input class="roleinput" onChange={(e)=>onChange(e.target.value)} value={value} autofocus="autofocus"/>
       

    )
}

export default Input;
