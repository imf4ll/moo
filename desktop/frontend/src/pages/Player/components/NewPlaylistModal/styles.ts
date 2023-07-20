import styled from 'styled-components';

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    z-index: 1000;
`;

export const Container = styled.div`
    z-index: 1001;
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    background: #121212;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 0.75rem;

    .background {
        background: #333;
        width: 210px;
        height: 210px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 380px;
        border-radius: 6px;
    }

    .textboxes {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 0.75rem;
    }

    input[type="text"] {
        font-size: 11pt;
        color: white;
        border: none;
        background: #202020;
        padding: 0.5rem;
        outline: none;
        width: 30rem;
        border-radius: 6px;
    }

    .buttons {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.75rem;
        align-self: flex-end;
    }


    input[type="button"] {
        color: white;
        width: 4.5rem;
        height: 2.25rem;
        border: none;
        border-radius: 5px;
        font-size: 9pt;
        font-weight: 500;
        outline: none;
        cursor: pointer;
        transition: all ease 150ms;

        :hover {
            opacity: 0.6;
        }
    }

    #save {
        background: #AC6AFF;

        :disabled {
            opacity: 0.7;
        }
    }

    #cancel {
        background: #FF6464;
    }
`;
