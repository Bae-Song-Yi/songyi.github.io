import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AuctionExitComponent from '../components/AuctionExitComponent';
import AuctionWaitComponent from '../components/AuctionWaitComponent';

interface Props {
  AuctionStateCode: string;
}

const AuctionStateContainer = ({ AuctionStateCode }: Props) => {
  const [wait, setWait] = useState(false);
  const [exit, setExit] = useState(true);
  useEffect(() => {
    if (AuctionStateCode === 'W') {
      setWait(true);
      setExit(false);
    } else if (AuctionStateCode === 'E') {
      setWait(false);
      setExit(true);
    } else {
      setWait(false);
      setExit(true);
    }
  }, [AuctionStateCode]);

  return (
    <AuctionStateDiv>
      <div className="video-area">
        <div className="video-bg"></div>
        <video autoPlay muted loop playsInline>
          <source src={`${process.env.PUBLIC_URL}/video/intro_video.mp4`} type="video/mp4" />
        </video>
      </div>
      {wait && <AuctionWaitComponent />}
      {exit && <AuctionExitComponent AuctionStateCode={AuctionStateCode} />}
    </AuctionStateDiv>
  );
};

export default AuctionStateContainer;

const AuctionStateDiv = styled.div`
  position: relative;

  .video-area {
    position: relative;
  }

  .video-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;

    &::-webkit-media-controls-panel {
      display: none !important;
      opacity: 0 !important;
    }

    &::-moz-media-controls-panel {
      display: none !important;
      opacity: 0 !important;
    }

    &::-o-media-controls-panel {
      display: none !important;
      opacity: 0 !important;
    }

    @media all and (max-width: 580px) {
      height: calc(100vh - 9.05rem);
      height: -webkit-calc(100vh - 9.05rem);
      height: -moz-calc(100vh - 9.05rem);
      height: -o-calc(100vh - 9.05rem);
    }
  }

  .intro-info {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 423px);
    height: -webkit-calc(100% - 423px);
    height: -moz-calc(100% - 423px);
    height: -o-calc(100% - 423px);
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @media all and (max-width: 1280px) {
      height: calc(100% - 354px);
      height: -webkit-calc(100% - 354px);
      height: -moz-calc(100% - 354px);
      height: -o-calc(100% - 354px);
    }

    @media all and (max-width: 580px) {
      height: calc(100% - 300px);
      height: -webkit-calc(100% - 300px);
      height: -moz-calc(100% - 300px);
      height: -o-calc(100% - 300px);
    }

    .open-date {
      color: #fff;
      font-family: Inter;
      font-size: 18px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.54px;
      padding-bottom: 24px;
      opacity: 0.6;
      display: flex;
      align-items: center;

      @media all and (max-width: 580px) {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.48px;
        padding-bottom: 13px;
      }

      &::before {
        content: '';
        display: inline-block;
        height: 16px;
        width: 2.5px;
        margin-right: 18px;
        background: #fff;
        opacity: 0.6;

        @media all and (max-width: 580px) {
          margin-right: 16px;
        }
      }

      &::after {
        content: '';
        display: inline-block;
        height: 16px;
        width: 2.5px;
        margin-left: 18px;
        background: #fff;
        opacity: 0.6;

        @media all and (max-width: 580px) {
          margin-left: 16px;
        }
      }
    }

    .text {
      color: #fff;
      font-family: 'Noto Sans KR';
      font-size: 28px;
      font-weight: 700;
      line-height: 42px;
      letter-spacing: -0.84px;
      white-space: pre-line;

      @media all and (max-width: 580px) {
        font-size: 20px;
        line-height: 30px;
        letter-spacing: -0.6px;
      }
    }
  }
`;
