import React from 'react';
import styled from 'styled-components';

const StyledList = styled.div`
position:absolute;
margin:0.15rem;
top:3.75rem;
width:12rem;
border: 1px solid #232323;
border-radius: 15px;
background: #232323
`;

const StyledItem=styled.div`
padding:0.25rem;
color: ${({danger}) => danger|| '#fff'};
font-size:14px;
font-weight:700;
border-radius: 15px;
 &.hover{
     background: ${({danger}) => danger ? 'transparent': '#1bb953'};
     cursor: ${({danger}) => danger ? 'initial': 'pointer'};
 }
`;
export const LocationRenderList = ({city,list,setCity,citytoggle,setCityToggle}) => {
    if(city){
        const filteredList = list.filter(item => item.city.toString().toLowerCase().startsWith(city.toLowerCase()));
        if(filteredList.length){
            return(
                

           citytoggle && (
               <StyledList>{
                 filteredList.map((item) => 
                 <StyledItem onClick={()=> {setCityToggle(false);
                 setCity(item.city);}}>
                   {item.city}
                 </StyledItem>
                 )
               }
                </StyledList>
           )

        )
    }

    return (
        <StyledList>
            <StyledItem danger="orangered">
                Notfound
            </StyledItem>
        </StyledList>
    )
}

return null;

}

export default LocationRenderList;
