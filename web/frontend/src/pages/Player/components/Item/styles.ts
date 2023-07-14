import styled from 'styled-components';

export const Container = styled.div`
    color: white;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    .title, .stats {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11pt;
    }

    .title {
        display: flex;
        gap: 0.5rem;

        p {
            font-weight: 500;
            margin-left: 0.4rem;
        }

        .thumbnail {
            border-radius: 10px;
            width: 80px;
            height: 80px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 140px;
        }
   
        #control {
            cursor: pointer;
            transition: all ease 300ms;
            
            :hover {
                opacity: 0.7;
            }
        }

        span {
            font-weight: 400;
            color: #AAA;
        }
    }

    .stats {
        display: flex;
        gap: 5rem;
        margin-right: 2rem;
    }
`;
