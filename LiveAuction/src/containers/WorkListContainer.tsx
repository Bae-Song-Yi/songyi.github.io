import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { AimOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, Mousewheel } from 'swiper';
import { AucStateResType } from '../type';
import palette from '../styles/palette';
import { RootState } from '../reducers';
import noBidsIconImage from '../assets/img/no_bids_icon.png';
import 'swiper/swiper.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import WorkCard from '../components/WorkCard';
import WorkCardList from '../components/WorkCardList';

SwiperCore.use([Navigation, Autoplay, Pagination, Scrollbar, Mousewheel]);

interface Props {
    currentLotStat: AucStateResType;
    openWishPop: () => void;
}
const WorkListContainer = ({ currentLotStat, openWishPop }: Props) => {
    const { workList, tSeq, getScheduleLoading } = useSelector((state: RootState) => state.auction);
    const [currentLotStyle, setCurrentLotStyle] = useState<string>('');
    // 현재 진행중인 lot 번호
    const { lot_num } = currentLotStat;
    const [allList, setAllList] = useState([]);
    const [isKoreanListExist, setIsKoreanListExist] = useState<boolean>(true);
    const [modernList, setModernList] = useState<boolean>(true);
    const [koreanList, setKoreanList] = useState<boolean>(true);
    const swiperContainerRef = useRef(null);
    const swiperRef = useRef(null);
    const lotBtnWrapRef = useRef(null);
    const workListWrapRef = useRef(null);
    const currentLotBtnRef = useRef(null);
    const [isLotOn, setIsLotOn] = useState<boolean>(false);
    const [isLotRender, setIsLotRender] = useState<boolean>(false);
    // 반응형
    const isPc = useMediaQuery({
        query: '(min-width:641px)',
    });
    const isMobile = useMediaQuery({
        query: '(max-width:640px)',
    });

    const focusOnLot = (isLotOn: boolean, lot_num: number) => {
        const swiperSlides = swiperContainerRef.current?.querySelectorAll('.swiper-slide');
        const $lot = document.querySelector(`#lot${lot_num}`) as HTMLElement;
        const listCheckHT = lotBtnWrapRef.current.offsetHeight;

        if (isLotOn) {
            currentLotBtnRef.current?.classList.add('on');

            if ($lot) {
              workListWrapRef.current?.scrollTo({
                top: $lot.offsetTop - listCheckHT,
                behavior: 'smooth',
              });
            }

            // 모바일 화면일 경우 swiperSlides가 없으므로 얼리 리턴
            if (!swiperSlides) return;

            const slideIndex = workList.findIndex(x => x.lot_num === lot_num);
            
            swiperRef.current?.swiper?.slideTo(slideIndex);
        } else {
          currentLotBtnRef.current?.classList.remove('on');
        }
    };

    useEffect(() => {
        setAllList(workList);
        setIsKoreanListExist(workList.some((work) => work.t_seq === tSeq[1]?.t_seq));
    }, [workList]);

    useEffect(() => {
        if (isLotOn) {
            setCurrentLotStyle('active');
            focusOnLot(true, lot_num);
        } else {
            setCurrentLotStyle('');
            focusOnLot(false, lot_num);
        }
    }, [isLotOn, lot_num]);

    // 진행중인 LOT이 켜져있을 경우 작품이 변경 될 때 마다 앞줄에 포커싱 됨
    useEffect(() => {
        if (!isLotRender && !isMobile) {

            const isRenderSlide = swiperContainerRef.current.querySelectorAll('.swiper-slide').length === allList.length;

            if (isRenderSlide) {
                setIsLotOn(true);
            }
            if (isLotOn) {
                setIsLotRender(true);
            }
        }
    });

    // PC 근현대, 한국화&고미술 탭
    const tabWrapRef = useRef(null);
    const tabChange = useCallback((target: string) => {
        const navibars = document.querySelectorAll('.navibar');

        navibars.forEach(x => {
            x.classList.remove('on');
        });

        const element = Array.from(navibars).find(x => x.dataset.value == target);
        element.classList.add('on');

    }, []);

    const tabClick = (e: any) => {
        const target = e.currentTarget.dataset.value as string;
        const slides = swiperRef.current.querySelectorAll('.swiper-slide');
        const index = Array.from<Element>(slides).findIndex((slide) => slide.getAttribute('data-value') === target);

        tabChange(target);

        swiperRef.current?.swiper?.slideTo(index);
    };

    // 보여지고 있는 작품이 근현대인지 고미술인지 구분
    const handleOnSlideChange = useCallback((e: any) => {
        const tabTarget = document.querySelectorAll('.swiper-slide')[e.activeIndex].dataset.value;
        tabChange(tabTarget);
    }, []);


    // MO 근현대, 한국화&고미술 탭
    const handleOnToggleSlide = useCallback((e: any) => {
        const target = e.currentTarget.dataset.value;
        if (target === 'modernList') {
            setModernList((prev) => !prev);
        } else {
            setKoreanList((prev) => !prev);
        }
    }, []);

    const handleOnOpenWishPop = () => {
        openWishPop();
    };

    return (
        <>
            <WorkListWrapper>
                <div className="list_check" ref={lotBtnWrapRef}>
                    <span className="mo-txt">
                        <FormattedMessage id="ListOfEntries" />
                    </span>
                    <div className="list-wish-lot">
                        <CheckboxIcon onClick={handleOnOpenWishPop}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                <path
                                    d="M13.8047 1.96047C12.4736 0.64232 10.1532 0.760012 8.79915 2.04678L8.00356 2.80786L7.20797 2.04678C3.58955 -1.09952 -1.0004 3.49832 2.25082 7.24093L7.64981 12.6459C7.84512 12.8414 8.162 12.8414 8.35731 12.6459L13.7563 7.24093C15.1486 5.66385 15.2812 3.41201 13.8047 1.96047Z"
                                    stroke="#868686"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                            <FormattedMessage id="MY_FAVORITE_LOTS" />
                        </CheckboxIcon>
                    </div>
                    <div className="list-current-lot">
                        <button onClick={() => setIsLotOn(!isLotOn)} ref={currentLotBtnRef} aria-label="Current Lot">
                            <AimIcon />
                            <span>
                                <FormattedMessage id="Current_lot" />
                                <i />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="list_wrap" id="containerElement" ref={workListWrapRef}>
                    {!getScheduleLoading && allList?.length === 0 ? (
                        <WorkEmpty>
                            <img src={noBidsIconImage} alt="아이콘" />
                            <p>
                                <FormattedMessage id="No_history" />
                            </p>
                        </WorkEmpty>
                    ) : (
                        <>
                            {isPc && (
                                <>
                                    {/* 근현대 & 고미술 Tab */}
                                    <div className="auction-tab" ref={tabWrapRef}>
                                        <BarWrap data-value="modernList" onClick={tabClick} className="navibar on">
                                            <span>
                                                <FormattedMessage id="ModernArt" />
                                            </span>
                                            {modernList ? <DownOutlined /> : <UpOutlined />}
                                        </BarWrap>
                                        {isKoreanListExist && (
                                            <BarWrap data-value="koreanList" onClick={tabClick} className="navibar">
                                                <span>
                                                    <FormattedMessage id="KoreanArt" />
                                                </span>
                                                {koreanList ? <DownOutlined /> : <UpOutlined />}
                                            </BarWrap>
                                        )}
                                    </div>
                                    {/* --근현대 & 고미술 Tab */}
                                    <div className="auction-list" ref={swiperContainerRef}>
                                        <Swiper
                                            ref={swiperRef}
                                            slidesPerView={3}
                                            spaceBetween={10}
                                            scrollbar={{ draggable: true, dragSize: 163.82 }}
                                            onSlideChange={(e) => handleOnSlideChange(e)}
                                            mousewheel={true}
                                            breakpoints={{
                                                1280: {
                                                    slidesPerView: 5.2,
                                                    spaceBetween: 8,
                                                },

                                                1000: {
                                                    slidesPerView: 4.5,
                                                    spaceBetween: 10,
                                                },

                                                840: {
                                                    slidesPerView: 3.5,
                                                },
                                            }}
                                        >
                                            {allList.map((auctionWork, index) => {
                                                if (auctionWork?.t_seq === tSeq[0]?.t_seq || auctionWork?.t_seq === tSeq[1]?.t_seq) {
                                                    return (
                                                        <SwiperSlide
                                                            key={auctionWork.lot_num}
                                                            data-value={auctionWork?.t_seq === tSeq[0]?.t_seq ? 'modernList' : 'koreanList'}
                                                        >
                                                            <WorkCard
                                                                auctionWork={auctionWork}
                                                                className={currentLotStat.lot_num === auctionWork.lot_num ? currentLotStyle : ''}
                                                                id={`lot${auctionWork.lot_num.toString()}`}
                                                                currentLotStat={currentLotStat}
                                                            />
                                                        </SwiperSlide>
                                                    );
                                                }
                                            })}
                                        </Swiper>
                                    </div>
                                </>
                            )}

                            {isMobile && (
                                <MobileList>
                                    {/* 근현대 */}
                                    <BarWrap data-value="modernList" className="modern-tab" onClick={handleOnToggleSlide}>
                                        <span>
                                            <FormattedMessage id="ModernArt" />
                                        </span>
                                        {modernList ? <DownOutlined /> : <UpOutlined />}
                                    </BarWrap>
                                    <WorkCardList
                                        artType={tSeq[0]?.t_seq}
                                        isArtListVisible={modernList}
                                        workList={allList}
                                        currentLotStat={currentLotStat}
                                        currentLotStyle={currentLotStyle}
                                    />

                                    {isKoreanListExist && (
                                        <>
                                            {/* 고미술 */}
                                            <BarWrap data-value="koreanList" className="korean-tab" onClick={handleOnToggleSlide}>
                                                <span>
                                                    <FormattedMessage id="KoreanArt" />
                                                </span>
                                                {koreanList ? <DownOutlined /> : <UpOutlined />}
                                            </BarWrap>
                                            <WorkCardList
                                                artType={tSeq[1]?.t_seq}
                                                isArtListVisible={koreanList}
                                                workList={allList}
                                                currentLotStat={currentLotStat}
                                                currentLotStyle={currentLotStyle}
                                            />
                                        </>
                                    )}
                                </MobileList>
                            )}
                        </>
                    )}
                </div>
            </WorkListWrapper>
        </>
    );
};

export default WorkListContainer;

// 진행중인 lot아이콘
const AimIcon = styled(AimOutlined)`
  font-size: 14px !important;
  padding-right: 5px;
`;

// 체크박스아이콘
const CheckboxIcon = styled(Checkbox)`
  align-items: center;
  justify-content: center;
  font-size: 0;

  .ant-checkbox + span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #0f1f6a;
    padding: 0;
    position: relative;
    margin-right: 16px;
  }
`;

// BarWrap
const BarWrap = styled.div``;

const WorkListWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;

  .list_check {
    position: absolute;
    top: 14px;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media all and (max-width: 740px) {
      margin-top: 25px;
    }

    @media all and (max-width: 640px) {
      position: static;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 20px;
      margin-top: 0;
    }

    @media all and (max-width: 580px) {
      padding: 2.86rem 2.67rem;
    }

    .mo-txt {
      display: none;

      @media all and (max-width: 640px) {
        display: block;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.32px;
        font-size: 20px;
      }

      @media all and (max-width: 580px) {
        font-size: 3.05rem;
      }
    }

    .list-wish-lot {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;

      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.03em;
        color: #6a6a6a;

        @media all and (max-width: 640px) {
          display: none;
        }

        svg {
          display: inline-block;
          vertical-align: middle;
          margin-right: 3px;
        }
      }

      .ant-checkbox {
        position: absolute;
        left: 0;
        opacity: 0;
      }
    }

    .list-current-lot {
      button {
        svg {
          display: none;
        }

        span {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.03em;
          color: #6a6a6a;

          @media all and (max-width: 580px) {
            font-size: 2.67rem;
          }

          i {
            width: 26px;
            height: 16px;
            margin-right: 6px;
            position: relative;
            background: #c1c1c1;
            border-radius: 16px;
            transform: matrix(1, 0, 0, -1, 0, 0);

            @media all and (max-width: 580px) {
              width: 4.96rem;
              height: 3.05rem;
              margin-left: 0.8rem;
              border-radius: 3.05rem;
            }

            &:before {
              content: '';
              position: absolute;
              left: 2px;
              top: 50%;
              transform: translateY(-50%);
              width: 11px;
              height: 11px;
              border-radius: 100%;
              background: #ffffff;
              box-shadow: 0px 1.01961px 1.01961px rgba(0, 0, 0, 0.2);
              transition: all 0.3s;

              @media all and (max-width: 580px) {
                width: 2.29rem;
                height: 2.29rem;
              }
            }
          }
        }

        &.on {
          i {
            background: #f76e33;

            &:before {
              left: 12px;
              transition: all 0.3s;

              @media all and (max-width: 580px) {
                left: calc(100% - 2.5rem);
                left: -webkit-calc(100% - 2.5rem);
                left: -moz-calc(100% - 2.5rem);
                left: -o-calc(100% - 2.5rem);
              }
            }
          }
        }
      }
    }
  }

  .auction-tab {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 14px 0;
    transform: translateX(2px);

    @media all and (max-width: 740px) {
      margin-bottom: 30px;
    }

    svg {
      display: none;
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      font-weight: 700;
      font-size: 16px;
      line-height: normal;
      letter-spacing: -0.48px;
      color: #a3a3a3;

      &:last-child {
        margin-left: 10px;
        padding-left: 12px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 16px;
          background: #d7d7d7;
        }
      }
    }

    > div.on {
      color: #252525;
    }
  }

  > .list_wrap {
    padding-bottom: 20px;
    max-width: 1400px;
    width: 100%;
    margin: auto;

    @media only screen and (max-width: 1250px) {
      height: 100%;
    }

    @media all and (max-width: 640px) {
      overflow-x: none;
      overflow-y: auto;
      padding-bottom: 0;
      height: calc(100% - 26.4rem);
      height: -webkit-calc(100% - 26.4rem);
      height: -moz-calc(100% - 26.4rem);
      height: -o-calc(100% - 26.4rem);
    }

    @media all and (max-width: 580px) {
      height: calc(100% - 34.7rem);
      height: -webkit-calc(100% - 34.7rem);
      height: -moz-calc(100% - 34.7rem);
      height: -o-calc(100% - 34.7rem);
    }
  }

  .swiper,
  swiper-container {
    overflow: visible;
    z-index: 6;
  }

  .swiper-horizontal > .swiper-scrollbar,
  .swiper-scrollbar.swiper-scrollbar-horizontal {
    z-index: 0;
    bottom: -16px;
    left: 0;
    width: 100%;
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: -1;
    display: block;
  }
`;

const WorkEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > p {
    margin-top: 5px;
    color: ${palette.gray[3]};
  }
`;

const MobileList = styled.div`
  .modern-tab,
  .korean-tab {
    background: #f3f3f3;
    color: #0f1f6a;
    font-weight: 700;
    letter-spacing: -0.28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0 20px;
    line-height: 40px;
    font-size: 18px;

    @media all and (max-width: 580px) {
      line-height: 6.4rem;
      font-size: 2.67rem;
      padding: 0 2.86rem;
    }
  }

  .click-info {
    display: block !important;
    transform: translate(0) !important;
    top: 14px;
    width: auto !important;
    padding: 0 !important;
    right: 45px !important;

    @media all and (max-width: 580px) {
      right: 7.5rem !important;
      top: 2rem;
    }

    span {
      display: none !important;
    }

    a {
      display: block;
      text-align: center;
      border-radius: 100%;
      background: #fff;
      width: 24px;
      height: 24px;
      line-height: 24px;

      @media all and (max-width: 580px) {
        width: 4.58rem;
        height: 4.58rem;
        line-height: 4.58rem !important;
      }
    }
  }
`;
