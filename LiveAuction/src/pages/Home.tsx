import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { CloseOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useScrollLock from 'react-use-scroll-lock';
import { useMediaQuery } from 'react-responsive';
import { FormattedMessage, useIntl } from 'react-intl';
import * as signalR from '@microsoft/signalr';
import Layout from '../components/common/Layout';
import palette from '../styles/palette';
import scrollTopBtn from '../assets/img/icon_arrow_up.png';
import ToastComponent from '../components/common/ToastComponent';
import VideoContainer from '../containers/VideoContainer';
import WorkListContainer from '../containers/WorkListContainer';
import NoticeContainer from '../containers/NoticeContainer';
import { connection } from '../service/connection';
import {
  AucStateResType,
  biddingInsertResType,
  bidsInfoResType,
  currentBidClaimType,
  AuctionWorkResponse,
} from '../type';
import {
  bidsListClaimRequest,
  getCurrentLotRequest,
  getScheduleRequest,
  loadNoticeRequest,
  setLanguageRequest,
} from '../actions/auction';
import BiddingSelectContainer from '../containers/BiddingSelectContainer';
import { RootState } from '../reducers';
import 'react-toastify/dist/ReactToastify.css';
import { getCookieValue } from '../utils';
import { useModal } from '../hooks/useModal';
import WishListPop from '../components/WishListPop';
import AuctionStateContainer from '../containers/AuctionStateContainer';

// HomeWrap
const HomeWrap = styled.div``;

interface HomeProps {
  currentLotStat: AucStateResType;
  isLoading: boolean;
  currentBidHst: bidsInfoResType[];
  currentLotInfo: AuctionWorkResponse;
  currentBidClaim: currentBidClaimType[];
}

const Home = () => {
  // 반응형
  const isPc = useMediaQuery({
    query: '(min-width:641px)',
  });

  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [shouldLockBody, setShouldLockBody] = useState(false);
  useScrollLock(shouldLockBody);
  const [currentLotStat, setCurrentLotStat] = useState<HomeProps['currentLotStat']>();
  const [currentBidHst, setCurrentBidHst] = useState<HomeProps['currentBidHst']>();
  const [currentBidClaim, setCurrentBidClaim] = useState<HomeProps['currentBidClaim']>();
  const {
    workList,
    auc_kind,
    biddingInsertError,
    biddingInsertDone,
    biddingInsert,
    currentLot,
    bidListClaimDone,
    bidNoti,
    bidListClaimLoading,
    language,
  } = useSelector((state: RootState) => state.auction);

  const [isLotActive, setIsLotActive] = useState(false);

  // 현재 진행중인 lot 정보
  const currentLotInfo = workList?.find((v) => v.lot_num === currentLot[0]?.lot_num);
  const query = queryString.parse(location.search);
  const auc_num = query?.auc_num?.toString() ?? '';
  const returnUrl = `${process.env.PUBLIC_REDIRECT_URL}/${auc_num}`;
  const scheduleCnt = useSelector((state: RootState) => state.auction?.scheduleCnt);

  /**
   * Home 첫 랜더링 시
   * 초기설정, 웹소켓 연결 및 이벤트 등록
   */
  useEffect(() => {
    if (!query?.auc_num) {
      return;
    }

    const culture = getCookieValue('.AspNetCore.Culture');
    let language = 'ko';
    if (culture.includes('ko')) {
      language = 'ko';
    } else if (culture.includes('en')) {
      language = 'en';
    }
    dispatch(setLanguageRequest(language));

    // 진행중인 랏에 대한 정보
    connection.on('CurrentLotStat', (message) => {
      const json = JSON.parse(message);
      if (!currentLotStat || currentLotStat.lot_num !== json.data.Table[0].lot_num) {
        setCurrentLotStat(json.data.Table[0]);
      }
      if (json.data.Table1[0] !== undefined) {
        setCurrentBidClaim(json.data.Table1);
      }
    });

    connection.on('CurrentBidHst', (message) => {
      setCurrentBidHst(JSON.parse(message).data.Table);
    });

    connection.on('CurrentUserInfo', (message) => {
      console.info('CurrentUserInfo', message);
    });

    connection.on('ErrorNotification', (message) => {
      if (message === 'ERR_LOGOUT') {
        nav(`/Member/Login?returnUrl=${returnUrl}`);
      } else {
        console.error(message);
      }
    });

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('Connected');
        if (auc_num) {
          connection.invoke('AddToGroup', auc_num);
        }
      } catch (err) {
        console.error('Connection failed: ', err);
        setTimeout(startConnection, 5000); // 5초 후 재시도
      }
    };

    startConnection();

    connection.onreconnected((connectionId) => {
      console.assert(connection.state === signalR.HubConnectionState.Connected);
      try {
        connection.invoke('AddToGroup', auc_num);
      } catch (e: any) {
        console.error(e.message);
      }
    });

    // 연결이 끊어졌을 때 재시도
    connection.onclose(async () => {
      console.log('Connection closed. Attempting to reconnect...');
      await startConnection();
    });

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      connection.stop();
    };
  }, []);

  const toastError = (error: any) => {
    if (!toast.isActive(error)) {
      // 같은 메세지의 토스트가 활성화되어 있지 않으면 새로운 토스트를 생성합니다.
      toast.error(error, {
        toastId: error,
      });
    }
  };

  const toastSuccess = (biddingInsert: biddingInsertResType) => {
    const lotNumMessage = formatMessage({ id: 'SUCC_LOT_NUM' }, { lot_num: biddingInsert.lot_num });
    const bidPriceMessage = formatMessage({ id: 'SUCC_BID_PRICE' }, { bid_price: biddingInsert.bid_price });
    const regDateMessage = formatMessage({ id: 'SUCC_REG_DATE' }, { reg_date: biddingInsert.reg_date });

    // 메시지를 결합하여 하나의 문자열로 만듭니다.
    const combinedMessage = `${lotNumMessage}\n${bidPriceMessage}\n${regDateMessage}`;

    toast.success(combinedMessage);
  };

  /**
   * 응찰 에러 시 토스트 메세지
   */
  useEffect(() => {
    if (biddingInsertError) {
      const errorMessages = {
        ERR_LOT_NOTALLOW: <FormattedMessage id="ERR_LOT_NOTALLOW" />,
        ERR_LOT_SUCCESSBID: <FormattedMessage id="ERR_LOT_SUCCESSBID" />,
        ERR_LOT_RESERVEDBID: <FormattedMessage id="ERR_LOT_RESERVEDBID" />,
        ERR_LOT_LOWBID: <FormattedMessage id="ERR_LOT_LOWBID" values={{ bid_price: currentLotStat.bid_price }} />,
        ERR_LOT_PREBID: <FormattedMessage id="ERR_LOT_PREBID" values={{ bid_price: currentLotStat.bid_price }} />,
        ERR_NOTPADDLE: <FormattedMessage id="ERR_NOTPADDLE" />,
        ERR_LOT_BESTBIDPRC_SAMEASME: formatMessage({ id: 'ERR_LOT_BESTBIDPRC_SAMEASME' }),
      };

      let message;
      if (biddingInsertError.toString() in errorMessages) {
        message = errorMessages[biddingInsertError as keyof typeof errorMessages];
      } else {
        message = biddingInsertError;
      }
      toastError(message);
    }
  }, [biddingInsertError]);

  // 응찰 성공시 토스트 메세지
  useEffect(() => {
    if (biddingInsertDone) {
      toastSuccess(biddingInsert);
    }
  }, [biddingInsertDone]);

  /**
   * 경매 공지사항 불러오기, 30초마다 실행
   */
  useEffect(() => {
    dispatch(
      loadNoticeRequest({
        auc_kind,
        auc_num: Number(auc_num),
      }),
    );

    const intervalId = setInterval(() => {
      dispatch(
        loadNoticeRequest({
          auc_kind,
          auc_num: Number(auc_num),
        }),
      );
    }, 30000); // 30초마다 실행

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, [auc_num, auc_kind]);

  /**
   * 경매 일정 정보 불러오기
   */
  useEffect(() => {
    dispatch(
      getScheduleRequest({
        auc_kind,
        auc_num: Number(auc_num),
      }),
    );
  }, [currentLotStat?.auc_stat_cd, auc_num]);

  const [isActiveAuction, setIsActiveAuction] = useState(false);

  useEffect(() => {
    if (!currentLotStat?.auc_stat_cd || currentLotStat?.auc_stat_cd === 'W' || currentLotStat?.auc_stat_cd === 'E') {
      setIsActiveAuction(false);
    } else {
      setIsActiveAuction(true);
    }
  }, [currentLotStat?.auc_stat_cd]);

  /**
   * 현재 진행중인 랏 정보 불러오기
   */
  useEffect(() => {
    if (currentLot && currentLotStat && currentLot[0]?.lot_num !== currentLotStat.lot_num) {
      dispatch(getCurrentLotRequest(currentLotStat));
    }
  }, [currentLot, currentLotStat?.lot_num]);

  /**
   * 현재 진행중인 응찰의 클레임 정보 불러오기
   */
  useEffect(() => {
    // TODO: 기존에 팝업됐던 클레임을 다시 안띄우기 위해 사용했던 코드, 추후 정책 확인 후 변경 예정
    // const idx = currentBidClaim?.findIndex((element) => element.bid_hst_seq === currentLot[0].claim_bid_hst_seq);

    if (currentBidClaim) {
      dispatch(
        bidsListClaimRequest({
          data: currentBidClaim,
        }),
      );
    }
  }, [currentBidClaim]);

  /**
   * 클레임 토스트 메세지
   * 응찰이 취소되거나 삭제되었을 경우 업데이트 처리
   */
  useEffect(() => {
    // 페들 넘버를 부여받은 유저이고, 응찰 클레임 가져오기가 종료되고, 로딩중이 아닌 경우
    if (scheduleCnt?.my_paddle_num > 0 && bidListClaimDone && !bidListClaimLoading) {
      bidNoti.forEach((notice) => {
        const deletes = bidNoti.filter((e) => {
          return notice.bid_stat_cd === 'DEL' && e.paddle_num === scheduleCnt.my_paddle_num;
        });

        if (deletes.length > 0) {
          deletes.filter((e) => {
            let message = '';
            if (e?.bid_noti_memo?.length > 0) {
              message = language === 'en' ? formatMessage({ id: e.bid_noti_memo }) || e.bid_noti_memo : e.bid_noti_memo;
            }
            if (!message) {
              message = formatMessage({ id: 'NOTI_CHG_INCREASE_PRC' }).replace(
                '{bid_price}',
                Number(e.bid_price).toLocaleString(),
              );
            }
            toastError(message);
          });
        }
        const cancels = bidNoti.filter((e) => {
          return notice.bid_stat_cd === 'CNL' && e.paddle_num === scheduleCnt.my_paddle_num;
        });

        if (cancels.length > 0) {
          cancels.filter((e) => {
            let message = '';
            if (e?.bid_noti_memo?.length > 0) {
              message = language === 'en' ? formatMessage({ id: e.bid_noti_memo }) || e.bid_noti_memo : e.bid_noti_memo;
            }
            if (!message) {
              message = formatMessage({ id: 'NOTI_CHG_MY_BID' }).replace(
                '{bid_price}',
                Number(e.bid_price).toLocaleString(),
              );
            }

            toastError(message);
          });
        }
      });
    }
  }, [bidNoti, bidListClaimDone]);

  // 출품작 보기
  const handleToggleEntriesModal = useCallback(() => {
    setIsLotActive((prev) => !prev);
    setShouldLockBody((prev) => !prev);
  }, [isLotActive]);

  // 스크롤 탑 버튼 노출 여부
  const [isScrollTop, setIsScrollTop] = useState(false);
  const auctionBiddingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOnScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > auctionBiddingRef.current?.offsetTop / 2 && window.innerWidth < 841) {
        setIsScrollTop(true);
      } else {
        setIsScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleOnScroll);
  }, []);

  const wishModal = useModal();

  return (
    <HomeWrap>
      <ToastComponent />
      {!isActiveAuction && <AuctionStateContainer AuctionStateCode={currentLotStat?.auc_stat_cd} />}
      {isActiveAuction && scheduleCnt && currentLotStat && (
        <>
          {isLotActive && <DimWrap onClick={handleToggleEntriesModal} />}
          <Layout showWishPop={wishModal.open}>
            {/*<TabletList className={isLotActive ? 'active' : ''}>*/}
            {/*  <CloseOutlined onClick={handleToggleEntriesModal} />*/}
            {/*  <WorkListContainer currentLotStat={currentLotStat} openWishPop={wishModal.open} />*/}
            {/*</TabletList>*/}

            <Wrapper className="row">
              {isPc && (
                /* 경매 리스트 */
                <LeftWrapper>
                  <WorkListContainer openWishPop={wishModal.open} currentLotStat={currentLotStat} />
                </LeftWrapper>
                /* --경매 리스트 */
              )}
              <div className="auction-detail-info">
                {/* 경매 영상 */}
                <div className="auction-video">
                  <VideoContainer />
                  <NoticeContainer />
                </div>
                {/* --경매 영상 */}

                {/* 낙찰가 */}
                <div className="auction-bidding" ref={auctionBiddingRef}>
                  <BiddingSelectContainer
                    currentBidHst={currentBidHst}
                    currentLotStat={currentLotStat}
                    currentLotInfo={currentLotInfo}
                    openWishPop={wishModal.open}
                  />
                </div>
                {/* --낙찰가 */}

                <div className="scrl-top">
                  {isScrollTop && <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}></a>}
                </div>
              </div>
            </Wrapper>
            {/* 위시리스트팝업 */}
            {wishModal.isOpen && <WishListPop currentLotStat={currentLotStat} close={wishModal.close} />}
            {/* 위시리스트팝업 */}
          </Layout>
        </>
      )}
    </HomeWrap>
  );
};

export default Home;

// 스타일 작업
const Wrapper = styled.div`
  height: 100%;

  @media all and (max-width: 1200px) {
    padding: 0 20px;
  }

  @media all and (max-width: 840px) {
    overflow-x: hidden;
  }

  @media all and (max-width: 580px) {
    margin-top: 0;
    padding: 0;
    height: calc(100% - 8.6rem);
    height: -webkit-calc(100% - 8.6rem);
    height: -moz-calc(100% - 8.6rem);
    height: -o-calc(100% - 8.6rem);
  }

  .auction-detail-info {
    padding-top: 24px;
    max-width: 1400px;
    width: 100%;
    margin: auto;

    @media all and (max-width: 840px) {
      display: block;
    }

    @media all and (max-width: 580px) {
      display: block;
      padding-top: 0;
    }

    .auction-video {
      width: 58.22%;
      margin-right: 1.15%;
      display: inline-block;
      vertical-align: top;
      position: sticky;
      position: -webkit-sticky;
      position: -moz-sticky;
      position: -o-sticky;
      top: 20px;

      @media all and (max-width: 840px) {
        width: 100%;
        position: static;
        padding-right: 0;
        margin-bottom: 10px;
      }

      @media all and (max-width: 580px) {
        width: 100%;
        position: static;
        margin-right: 0;
        margin-bottom: 0;
      }

      &.fix {
        position: fixed;
        z-index: 1;

        @media all and (max-width: 840px) {
          width: 35%;
          left: auto;
          right: 20px;
          margin-right: 0;
          top: auto;
          bottom: 122px;

          .notice-wrap {
            display: none;
          }
        }

        @media all and (max-width: 580px) {
          right: 0;
          width: 40%;
          bottom: 210px;
        }
      }
    }

    .auction-bidding {
      width: 40.6%;
      display: inline-block;

      @media all and (max-width: 840px) {
        width: 100%;
      }

      @media all and (max-width: 580px) {
        width: 100%;
        margin-top: -4px;
      }
    }

    .scrl-top {
      position: fixed;
      z-index: 1;
      display: flex;
      align-items: end;
      flex-direction: column;
      bottom: 170px;
      right: 40px;

      @media all and (max-width: 580px) {
        bottom: 26.6rem;
        right: 1.91rem;
      }

      a {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: 1px solid #eaeaea;
        background: rgba(255, 255, 255, 0.9) url(${scrollTopBtn}) no-repeat center;
        background-size: 25px;

        @media all and (max-width: 580px) {
          background-size: 4.6rem;
          width: 9.53rem;
          height: 9.53rem;
        }
      }
    }
  }
`;

const LeftWrapper = styled.div`
  position: relative;
  border-radius: 3px;
  box-sizing: border-box;
  max-width: 1400px;
  width: 100%;
  margin: auto;
`;

const TabletList = styled.div`
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: calc(100% - 15.6rem);
  background-color: #ffffff;
  z-index: 400;
  transition: all 0.2s ease;

  &.active {
    bottom: 0;
    transition: all 0.2s ease;
  }
  .anticon.anticon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 505;
    cursor: pointer;

    svg {
      width: 1.4em;
      height: 1.1em;
      fill: ${palette.gray[4]};
    }

    @media all and (max-width: 640px) {
      display: none;
    }
  }
`;

const DimWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 400;
  display: none;

  @media all and (max-width: 580px) {
    display: block;
  }
`;
