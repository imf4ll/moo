import styled from 'styled-components';

export const Background = styled.div`
    background-color: #000;
    opacity: 0.9;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
`;

export const Container = styled.div`
    z-index: 999;
    background: #1A1A1A;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 180px;
`;
