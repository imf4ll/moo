import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 1.5%;
    left: 2%;
    z-index: 999;
`;

export const Title = styled.p`
    font-size: 20pt;
    color: #9361FF;
    font-weight: 700;
    margin: 0;
    cursor: pointer;
    transition: all ease 450ms;

    :hover {
        opacity: 0.75;
    }
`;
