import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 999;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
        width: 24px;

        :not(:last-child) {
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                transform: scale(1.1);
                opacity: 0.75;
            }
        }
    }

    #downloading {
        animation: rotate infinite 2s;
    }

    @keyframes rotate {
        50% {
            transform: rotate(360deg) scale(1.2);
        }

        100% {
            transform: scale(1);
        }
    }
`;

