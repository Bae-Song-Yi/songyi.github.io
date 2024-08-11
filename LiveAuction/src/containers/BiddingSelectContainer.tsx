/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import palette from '../styles/palette';
import BiddingSelectInfo from '../components/BiddingSelectInfo';
import BiddingItemForm from '../components/BiddingItemForm';
import BiddingInsertContainer from '../containers/BiddingInsertContainer';
import { AucStateResType, bidsInfoResType, AuctionWorkResponse } from '../type';
import { RootState } from '../reducers';
import { bidsListUpdateRequest, getBidsRequest } from '../actions/auction';
import iconLotBtn from '../assets/img/icon_lot_btn.png';
import { useMediaQuery } from 'react-responsive';
import { CloseOutlined } from '@ant-design/icons';
import WorkListContainer from './WorkListContainer';
import useScrollLock from 'react-use-scroll-lock';
import endAlram from '../assets/img/remainico.gif';

interface Props {
  currentLotStat: AucStateResType;
  currentBidHst: bidsInfoResType[] | null;
  currentLotInfo: AuctionWorkResponse;
  openWishPop: () => void;
}

const BiddingSelectContainer = ({ currentBidHst, currentLotStat, currentLotInfo, openWishPop }: Props) => {
  const dispatch = useDispatch();
  const { auc_kind, bidsList } = useSelector((state: RootState) => state.auction);
  const { auc_num } = useSelector((state: RootState) => state.auction?.scheduleCnt);
  const [isFairWarning, setIsFairWarning] = useState(false);
  const [lotBidCount, setLotBidCount] = useState(0);

  // 응찰내역불러오기
  useEffect(() => {
    dispatch(
      getBidsRequest({
        auc_kind,
        auc_num,
        lot_num: currentLotStat?.lot_num,
        page_no: 1,
        page_size: 1000,
      }),
    );
  }, [auc_num, currentLotStat?.lot_num]);

  useEffect(() => {
    if (!!currentBidHst) {
      dispatch(bidsListUpdateRequest(currentBidHst));
    }

    if (currentBidHst?.at(0) && currentBidHst[0].total_cnt > lotBidCount) {
      setLotBidCount(currentBidHst[0].total_cnt);
      setIsFairWarning(false);
    }
  }, [currentBidHst]);

  useEffect(() => {
    if (currentLotStat.is_fair_warning === true) {
      setIsFairWarning(true);
    }
  }, [currentLotStat.lot_num, currentLotStat.is_fair_warning]);

  useEffect(() => {
    if (currentLotStat.lot_stat_cd === 'F') {
      setIsFairWarning(false);
    }
  }, [currentLotStat.lot_stat_cd]);

  const isTablet = useMediaQuery({
    query: '(max-width:720px)',
  });

  const [workList, setWorkList] = useState(false);
  const [shouldLockBody, setShouldLockBody] = useState(false);
  useScrollLock(shouldLockBody);

  const handleOnShowLotList = useCallback(() => {
    setWorkList((prev) => !prev);
    setShouldLockBody((prev) => !prev);
  }, [workList, shouldLockBody]);

  const nowWorkDetailRef = useRef(null);

  return (
    <Wrapper>
      <div className="lot-info" ref={nowWorkDetailRef}>
        <BiddingSelectInfo
          currentLotInfo={currentLotInfo}
          currentLotStat={currentLotStat}
          nowWorkDetailRef={nowWorkDetailRef}
        />

        {workList && <DimWrap onClick={handleOnShowLotList} />}
        <ListOpenBtn className="work-btn" onClick={handleOnShowLotList}>
          <FormattedMessage id="LOT 전체보기" />
          <img alt="notice alarm" src={iconLotBtn} />
        </ListOpenBtn>
        {isTablet && (
          <TabletList className={workList ? 'active' : ''}>
            <CloseOutlined onClick={handleOnShowLotList} />
            <WorkListContainer currentLotStat={currentLotStat} openWishPop={openWishPop} />
          </TabletList>
        )}
      </div>

      <BiddingInsertContainer currentLotStat={currentLotStat} />
      <BiddingListWrap className="bid-list-wrap">
        {bidsList?.length === 0 ? (
          <BiddingListNot className="none-result">
            <p>
              {currentLotStat.lot_stat_cd === 'F' ? (
                <FormattedMessage id="마감된 작품입니다" />
              ) : (
                <FormattedMessage id="no_bids" />
              )}
            </p>
          </BiddingListNot>
        ) : (
          <div>
            {isFairWarning && (
              <BiddingDeadline className="end-alarm">
                <p>
                  <FormattedMessage id="FairWarning" />
                </p>
              </BiddingDeadline>
            )}
            {bidsList?.map((list, index) => (
              <BiddingItemForm key={list.bid_hst_seq} list={list} index={index} />
            ))}
          </div>
        )}
      </BiddingListWrap>
    </Wrapper>
  );
};

export default BiddingSelectContainer;

// Wrapper
const Wrapper = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  position: relative;

  @media all and (max-width: 580px) {
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
  }

  .lot-info {
    @media all and (max-width: 580px) {
      &.hidden {
        .now-wrap {
          display: none;
        }

        .mo-lot-now {
          b {
            display: inline-block;
          }

          .btn {
            transform: rotate(180deg);
          }
        }
      }

      &.fix {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
        z-index: 6;
      }
    }
  }
`;

const BiddingListWrap = styled.div`
  padding: 0 24px;
  overflow-y: auto;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0 0 6px 6px;
  padding-bottom: 57px;

  @media all and (max-width: 580px) {
    padding: 10px 3.81rem 22rem;
    border-top: 1.53rem solid #edeff0;
    padding-bottom: 24.2rem;
    border-radius: 0;
  }
`;

const BiddingDeadline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 16px;

  @media all and (max-width: 580px) {
    padding: 4.572rem 0 3.048rem;
  }

  > p {
    padding-right: 22px;
    background: url(${endAlram}) no-repeat 99% center;
    background-size: 16px;
    color: #f76e33;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.48px;

    @media all and (max-width: 580px) {
      font-size: 2.668rem;
    }
  }

  > img {
    height: 5px;
  }
`;

const BiddingListNot = styled.div`
  padding: 0 20px;
  height: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.none-result {
    height: 397px;
    background: #fff;
    border-radius: 0 0 6px 6px;

    @media all and (max-width: 840px) {
      border-top: 1px solid #eaeaea;
    }

    @media all and (max-width: 640px) {
      border-top: none;
    }

    @media all and (max-width: 580px) {
      height: 46.2rem;
    }
  }

  > p {
    color: #868686;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.48px;

    @media all and (max-width: 580px) {
      font-size: 2.667rem;
    }
  }
`;

const ListOpenBtn = styled.div`
  display: none;

  @media all and (max-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 500;
    background: #fff;
    border-radius: 0;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    color: #252525;
    font-family: 'Noto Sans KR';
    letter-spacing: -0.42px;
    z-index: 1;
    transition: all 0.3s ease;
    cursor: pointer;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 16px;

    img {
      width: 14px;
      margin-left: 4px;
      transform: translateY(2px);
    }
  }

  @media all and (max-width: 580px) {
    border-bottom: none;
    height: 7.62rem;
    font-size: 2.67rem;
    line-height: 7.62rem;

    &.on {
      bottom: calc(100% - 11rem);
      z-index: 400;
      transition: all 0.3s ease;
    }

    img {
      width: 2.29rem;
      transform: translateY(0);
    }
  }
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

  @media all and (max-width: 640px) {
    display: block;
  }
`;
