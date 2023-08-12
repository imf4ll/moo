import styled from 'styled-components';

export const Container = styled.div`
    color: white;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    transition: all ease 150ms;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    
    :hover {
        background: rgba(25, 25, 25, 50%);
    }

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
            background: #333;
            border-radius: 10px;
            width: 80px;
            height: 80px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 140px;
        }

        span {
            font-weight: 400;
            color: #AAA;
        }
    }
   
    #control {
        cursor: pointer;
        transition: all ease 300ms;
        
        :hover {
            opacity: 0.7;
        }
    }

    .right-side {
        display: flex;
        gap: 1.5rem;
        align-items: center;

        .stats {
            display: flex;
            gap: 4rem;
        }
    }
`;
