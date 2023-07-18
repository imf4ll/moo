import styled from 'styled-components';

import Local from '../../../../assets/local.png';

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #000;
    width: 100%;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10rem;
        background-size: 100%;
        filter: blur(40px);
        transform: scale(5);
        background-position: center;
        z-index: 0;
        background-image: linear-gradient(#956AFF 25%, #d93a3a 25%, #000000 55%);
    }

    #back {
        z-index: 9999;
        position: absolute;
        top: 0.5rem;
        left: 0.75rem;
        cursor: pointer;
        padding: 0.5rem 0.25rem 0.5rem 0.75rem;
        background: rgba(30, 30, 30, 50%);
        border-radius: 100%;
        transition: all ease 200ms;

        :hover {
            opacity: 0.7;
        }
    }

    .content {
        z-index: 1001;
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding-bottom: 6rem;
        align-items: center;
    }

    .title-playlist {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-top: 3rem;
        margin-bottom: 1rem;
        align-self: flex-start;
        width: 90vw;
        align-self: center;

        h1 {
            font-size: 20pt;
        }

        .title-thumbnail {
            background-image: url(${ Local });
            min-width: 230px;
            min-height: 230px;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 10px;
            transition: all ease 250ms;

            :hover {
                transform: scale(1.05);
            }
        }
    }

    .items {
        width: 97.5%;
        display: flex;
        flex-direction: column;

        .item {
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
        }

        .loading {
            align-self: center;
        }
    }

    .stats {
        color: #FFF;

        p {
            font-weight: 500;
            color: #DDD;
        }
    }

    .buttons {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            background: rgba(30, 30, 30, 50%);
            padding: 0.5rem;
            border-radius: 100%;
            cursor: pointer;
            transition: all ease 300ms;

            :hover {
                opacity: 0.7;
            }
        }
    }
`;
