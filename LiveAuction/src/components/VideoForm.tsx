import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PlayCircleFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { UnrealWebRTCPlayer } from '../utils/unrealwebrtcplayer';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px 6px 0 0;
  overflow: hidden;

  @media all and (max-width: 580px) {
    border-radius: 0;
  }

  .react-player__shadow {
    border: 1px solid #ffffff;
  }

  > video {
    width: 100%;
    height: 100%;
  }
`;

const StartScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;

  > div {
    cursor: pointer;
  }

  &.on {
    display: flex;
  }

  span {
    font-size: 35px;
    color: #ffffff;

    @media all and (max-width: 580px) {
      font-size: 5.72rem;
    }
  }

  > p {
    color: #a3a3a3;
    font-size: 12px;
    text-align: center;
    padding: 0 10px;

    &.desc01 {
      margin-top: 10px;

    }
  }
`;

const VideoForm = () => {
  const videoRef = useRef(null);
  const [screenState, setScreenState] = useState(true);

  const videoOnload = useCallback(() => {
    setScreenState(false);

    const webRtcPlayer = new UnrealWebRTCPlayer(
      'RtcPlayer',
      'kaopus',
      '',
      'stream.camtour.net',
      '448',
      true,
      true,
      'tcp',
    );
    webRtcPlayer.Play();

    const videoCatch = setInterval(() => {
      let count = 0;
      try {
        const playPromise = videoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              clearInterval(videoCatch);
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
      } finally {
        if (count > 30) {
          clearInterval(videoCatch);
        }
        count += 1;
      }
    }, 200);
  }, [videoRef]);

  useEffect(() => {
    const handleScroll = () => {
      const aucBid = document.querySelector('.auction-bidding') as HTMLElement;
      const bidInfoPos = aucBid.offsetTop;
      const scrl = window.scrollY;
      const bidList = document.querySelector('.bid-list-wrap') as HTMLElement;
      const fixBidInfoHT = document.querySelector('.lot-info').clientHeight;

      if (scrl > bidInfoPos && window.innerWidth < 581) {
        bidList.style.paddingTop = `${fixBidInfoHT}px`
        document.querySelector('.lot-info').classList.add('fix');

      } else if (scrl > bidInfoPos / 2 && window.innerWidth < 841) {

        bidList.style.paddingTop = '0px';

      } else {
        document.querySelector('.lot-info').classList.remove('fix');
        bidList.style.paddingTop = '10px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <StartScreen className={screenState === true ? 'on' : ''} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/stopimg.jpg)` }}>
        <div onClick={videoOnload}>
          <PlayCircleFilled />
        </div>
        <p className="desc01">
          <FormattedMessage id="Video_desc_01" />
        </p>
        <p className="desc02">
          <FormattedMessage id="Video_desc_02" />
        </p>
      </StartScreen>
      <video
        id="RtcPlayer"
        style={{ width: '600', height: '336', backgroundColor: 'black' }}
        ref={videoRef}
        autoPlay
        playsInline
        controls
      />
    </Wrapper>
  );
};

export default VideoForm;
