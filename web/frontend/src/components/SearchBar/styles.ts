import styled from "styled-components";

export const Container = styled.div`
    background-color: #1A1A1A;
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 8px;
    padding: 0.75rem 0.85rem;
`;

export const Bar = styled.input.attrs({ type: 'text' })`
    border: none;
    outline: none;
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 12pt;
    width: 100%;
    background-color: transparent;
`;

export const Buttons = styled.div`
    background: transparent;
    display: flex;
    gap: 0.5rem;

    img {
        cursor: pointer;
        transition: all ease 0.5s;
        background: transparent;

        :hover {
            opacity: 0.7;
        }
    }
`;
