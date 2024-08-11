import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Mousewheel } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { priceChange, onErrorImage } from '../utils';
import { likeWorkRequest } from '../actions/auction';
import { AuctionWorkResponse } from '../type';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

moment.updateLocale('ko', {
  weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
});

SwiperCore.use([Autoplay, Mousewheel]);

const AuctionWaitComponent = () => {
  const { workList, scheduleCnt, auc_kind, auc_num } = useSelector((state: RootState) => state.auction);
  const dispatch = useDispatch();

  const handleToggleWish = (work: AuctionWorkResponse) => {
    dispatch(
      likeWorkRequest({
        auc_kind,
        auc_num,
        lot_num: work.lot_num,
        page_no: 1,
        page_size: 100,
        work_seq: work.work_seq,
      }),
    );
  };

  const [isOnceSlide, setIsOnceSlide] = useState(false);
  const introSwiperRef = useRef(null);

  const handleEnter = () => {
    introSwiperRef.current.swiper.autoplay.stop();
    setIsOnceSlide(true);
  };

  const handleLeave = () => {
    introSwiperRef.current.swiper.autoplay.start();
    setIsOnceSlide(false);
  };

  const [secondsLeft, setSecondsLeft] = useState(0);

useEffect(() => {

    // 경매 시작 시간과 현재 시간의 차이를 초 단위로 계산
    const startTime = new Date(scheduleCnt?.auc_now_date).getTime();
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((startTime - now) / 1000);
    if (diffInSeconds <= 0) return; // 경매 시작 시간이 지났으면 종료
    setSecondsLeft(diffInSeconds); // 초기 남은 시간 설정

    // 초 단위로 카운트다운을 시작
    const countdown = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
    }, [scheduleCnt?.auc_now_date]);

  return (
    <WaitAuctionDiv>
      <div className="auc-before">
        <div className="intro-info">
        <span className="open-date">
            {moment(scheduleCnt?.auc_now_date).format('YYYY년 M월 DD일 (ddd) HH시')}{' '}
            <FormattedMessage id="경매시작" />
          </span>
          {secondsLeft <= 24 * 3600 && secondsLeft > 0 && (
            <b className="time">
              {Math.floor(secondsLeft / 3600)
                .toString()
                .padStart(2, '0')}{' '}
              :{' '}
              {Math.floor((secondsLeft % 3600) / 60)
                .toString()
                .padStart(2, '0')}{' '}
              : {(secondsLeft % 60).toString().padStart(2, '0')}
            </b>
          )}
          <p className="text">
            {scheduleCnt?.auc_title} <FormattedMessage id="가 곧 시작됩니다." />
          </p>
        </div>

        <div
          className="intro-slide"
          onTouchStart={handleEnter}
          onTouchEnd={handleLeave}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <Swiper
            ref={introSwiperRef}
            slidesPerView={2.15}
            spaceBetween={8}
            mousewheel={true}
            slidesOffsetBefore={20}
            allowTouchMove={true}
            loop={false}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
              stopOnLastSlide: true,
            }}
            breakpoints={{
              1321: {
                slidesPerView: 7,
                spaceBetween: 10,
                slidesOffsetBefore: 48,
              },
              1001: {
                slidesPerView: 5.3,
                spaceBetween: 10,
                slidesOffsetBefore: 20,
              },
              641: {
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
            }}
          >
            {workList.map((work) => {
              return (
                <SwiperSlide key={work.lot_num}>
                  <span className="toggle-wish" onClick={() => handleToggleWish(work)}>
                    {work.isWish ? <HeartFilled style={{ color: '#f67137' }} /> : <HeartOutlined />}
                  </span>
                  <div className="img-wrap">
                    <img src={work.img_file_name} loading="lazy" onError={onErrorImage} />
                  </div>
                  <div className="info-wrap">
                    <span className="num">LOT {work.lot_num}</span>
                    <b className="name">{work.a_name}</b>
                    <span className="tit">{work.w_name}</span>
                    <div className="price">
                      KRW {`${priceChange(work.w_low_price)} ~ ${priceChange(work.w_high_price)}`}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </WaitAuctionDiv>
  );
};

export default AuctionWaitComponent;

const WaitAuctionDiv = styled.div`
  .intro-info {
    .time {
      color: #fff;
      font-family: Inter;
      font-size: 58px;
      font-weight: 700;
      line-height: 70px;
      padding-bottom: 8px;

      @media all and (max-width: 580px) {
        padding-bottom: 8px;
        font-size: 40px;
        line-height: 50px;
      }
    }
  }

  .intro-slide {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
    padding: 24px 0 56px;
    overflow: hidden;

    @media all and (max-width: 580px) {
      padding: 16px 0 16px;
    }

    .swiper {
      overflow: visible;
    }

    .swiper-wrapper {
      transition-timing-function: linear;
    }

    .swiper-slide {
      .img-wrap {
        border-radius: 4px 4px 0 0;
        background: #f3f3f3;
        height: 200px;
        padding: 10px 11.63%;
        display: flex;
        align-items: center;
        justify-content: center;

        @media all and (max-width: 1280px) {
          height: 140px;
        }

        @media all and (max-width: 580px) {
          padding: 10px;
        }

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .info-wrap {
        padding: 16px 16px 20px 16px;
        border-radius: 0 0 6px 6px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        color: #252525;

        @media all and (max-width: 580px) {
          padding: 12px 12px 16px;
        }

        .num {
          font-family: Inter;
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
          letter-spacing: -0.36px;
        }

        .name {
          font-family: 'Noto Sans KR';
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: -0.48px;
          margin: 2px 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          width: 100%;

          @media all and (max-width: 580px) {
            font-size: 16px;
            line-height: 20px;
            letter-spacing: -0.48px;
            margin: 4px 0;
          }
        }

        .tit {
          color: #868686;
          font-family: 'Noto Sans KR';
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: -0.36px;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          width: 100%;

          @media all and (max-width: 580px) {
            margin-bottom: 10px;
          }
        }

        .price {
          font-family: Inter;
          font-size: 13px;
          font-weight: 400;
          line-height: 16px;
          letter-spacing: -0.39px;

          @media all and (max-width: 580px) {
            font-size: 12px;
            letter-spacing: -0.36px;
          }
        }
      }

      .toggle-wish {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
        height: 18px;

        @media all and (max-width: 580px) {
          top: 12px;
          bottom: 12px;
        }

        svg {
          font-size: 18px;
        }
      }
    }
  }
`;
