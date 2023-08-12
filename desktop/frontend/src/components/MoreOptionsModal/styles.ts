import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 2.5rem;
    right: 0.5rem;
    width: 10rem;
    height: 3rem;
    border-radius: 6px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(15, 15, 15, 95%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    a {
        text-decoration: none;

        :first-child {
            margin-top: 0;
        }

        :not(first-child) {
            margin-top: -0.5rem;
        }
    }

    div {
        display: flex;
        gap: 0.5rem;
        margin-left: 0.75rem;
        cursor: pointer;

        img, p {
            transition: all ease 200ms;
        }

        :hover {
            img, p {
                opacity: 0.5;
            }
        }

        p {
            color: #DDD;
            font-weight: 500;
            font-size: 10.5pt;
        }
    }
`;
