import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    bottom: 5rem;
    right: 0.5rem;
    width: 35vw;
    height: 60vh;
    border-radius: 10px;
    z-index: 999;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: auto;
    background-color: rgba(15, 15, 15, 95%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    .item {
        display: flex;
        color: white;
        font-size: 11pt;
        font-weight: 500;
        gap: 1rem;
        align-items: center;
        width: 100%;
 
        .thumb {
            display: flex;
            margin: 0;
            gap: 1rem;
            align-items: center;

            p {
                font-weight: 600;
            }
        }

        :first-child {
            .thumb p:first-child {
                color: #AC6AFF;  
            }
        }


        span {
            color: #AAA;
            font-weight: 400;
        }

        img {
            border-radius: 10px;
        }
    }
`;
