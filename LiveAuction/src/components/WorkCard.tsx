/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import palette from '../styles/palette';
import { AucStateResType, AuctionWorkResponse } from '../type';
import { likeWorkRequest } from '../actions/auction';
import { priceChange, onErrorImage } from '../utils';
import linkIconImage from '../assets/img/LinkIcon.png';

interface Props {
  auctionWork: AuctionWorkResponse;
  className: string | '';
  id: string | '';
  currentLotStat: AucStateResType;
}

const WorkCard = ({ auctionWork, className, id, currentLotStat }: Props) => {
  const dispatch = useDispatch();
  const { w_low_price, w_high_price, successful_bid_price, successful_bid } = auctionWork;
  const { auc_num, auc_kind } = currentLotStat;
  const [isSuccessfulBid, setIsSuccessfulBid] = useState<boolean>(false);
  const [displayPrice, setDisplayPrice] = useState<string>(
    `${priceChange(w_low_price)} ~ ${priceChange(w_high_price)}`,
  );

  useEffect(() => {
    // successful_bid 는 false가 낙찰
    if (successful_bid_price !== 0 && successful_bid === false) {
      setIsSuccessfulBid(true);
      setDisplayPrice(`${priceChange(successful_bid_price)}`);
    }
  }, []);

  // 현재 LOT이 바뀌었을 때 호출
  useEffect(() => {
    // LOT이 현재 LOT일 때
    if (auctionWork.lot_num === currentLotStat.lot_num) {
      setIsSuccessfulBid(false);
      setDisplayPrice(`${priceChange(w_low_price)} ~ ${priceChange(w_high_price)}`);
    }
  }, [currentLotStat.lot_num]);

  // 현재 LOT의 상태가 변했을 때 호출
  useEffect(() => {
    // 현재 LOT이 상태가 Finished 일 때
    if (auctionWork.lot_num === currentLotStat.lot_num && currentLotStat.lot_stat_cd === 'F') {
      // 낙찰가가 있으면 낙찰가로 표시
      if (currentLotStat.successful_bid_price !== 0) {
        setIsSuccessfulBid(true);
        setDisplayPrice(`${priceChange(currentLotStat.successful_bid_price)}`);
      }
    }
  }, [currentLotStat.lot_stat_cd]);

  const handleToggleWish = useCallback(() => {
    dispatch(
      likeWorkRequest({
        auc_kind,
        auc_num,
        lot_num: auctionWork.lot_num,
        page_no: 1,
        page_size: 100,
        work_seq: auctionWork.work_seq,
      }),
    );
  }, [auc_kind, auc_num, auctionWork.lot_num, auctionWork.work_seq]);

  const showDetailInfo = (e: any) => {
    e.currentTarget.classList.toggle('on');
  };

  return (
    <Wrapper className={className} id={id}>
      <div onClick={showDetailInfo}>
        <div className="lot_info">
          <div className="img_wrap">
            <img src={auctionWork.img_file_name} loading="lazy" onError={onErrorImage} />
          </div>

          <div className="cnt_wrap">
            <div>
              <p className="lot_num">LOT{auctionWork.lot_num}</p>
              <p className="w_name">{auctionWork.a_name}</p>
              <p className="sub_tit">{auctionWork.w_name}</p>
            </div>
          </div>
        </div>
        <p className={`w_price ${isSuccessfulBid ? 'success' : ''}`}>
          {isSuccessfulBid && <FormattedMessage id="낙찰가" />}
          <b> KRW</b>
          {displayPrice}
        </p>
        <div className="click-info">
          <span className="unit">{auctionWork.w_unit}</span>
          <span className="size">
            {auctionWork.w_size}
            <i>{auctionWork.w_make_date}</i>
          </span>
          <a target="_blank" href={`/Auction/Major/${auc_num}/${auctionWork.work_seq}`} rel="noreferrer">
            <img alt="링크 아이콘" src={linkIconImage} />
            <span>
              <FormattedMessage id="LOT_INFO" />
            </span>{' '}
          </a>
        </div>
      </div>
      <span className="toggle-wish" onClick={handleToggleWish}>
        {auctionWork.isWish === true ? <HeartFilled style={{ color: '#f67137' }} /> : <HeartOutlined />}
      </span>
    </Wrapper>
  );
};

export default WorkCard;

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid transparent;
  position: relative;
  border-radius: 5.33333px;

  @media all and (max-width: 640px) {
    border-radius: 0;
    border: none;
  }

  &.active {
    > div {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 101%;
        height: 102%;
        border: 2px solid #f76e33;
        left: -1px;
        top: -1px;
        border-radius: 6px;

        @media all and (max-width: 640px) {
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          border: 2px solid #f76e33 !important;
        }
      }

      &:hover {
        border: 1px solid transparent;

        @media all and (max-width: 640px) {
          border: none;
        }

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #f76e33;
          left: 0px;
          top: 0px;
          border-radius: 6px;

          @media all and (max-width: 640px) {
            border: none;
          }
        }
      }

      &.on {
        border: 1px solid transparent;

        @media all and (max-width: 640px) {
          border: none;
        }

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #f76e33;
          left: 0px;
          top: 0px;
          border-radius: 6px;

          @media all and (max-width: 640px) {
            border: none;
          }
        }

        &:hover {
          border: 1px solid transparent;

          @media all and (max-width: 640px) {
            border: none;
          }

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid #f76e33;
            left: 0px;
            top: 0px;
            border-radius: 6px;

            @media all and (max-width: 640px) {
              border: none;
            }
          }
        }

        .click-info {
          border: 2px solid #f76e33;
          border-top: none;
          transform: translate(-15px, 7px);
          width: 100%;
        }
      }
    }
  }

  &:hover {
    > div {
      border: 1px solid #c1c1c1;
      cursor: pointer;

      @media all and (max-width: 640px) {
        border: none;
      }
    }
  }

  > div {
    padding: 13px 16px;
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid transparent;

    @media all and (max-width: 640px) {
      border: none;
    }

    @media all and (max-width: 580px) {
      padding: 3.81rem 2.86rem;
      border: none;
      border-bottom: 1px solid #eaeaea !important;
      border-radius: 0;
    }

    > p {
      font-family: 'Noto Sans KR';
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.03em;
      color: #a3a3a3;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media all and (max-width: 640px) {
        line-height: 1.29;
        letter-spacing: -0.42px;
        margin-top: 0;
        position: absolute;
        left: 132px;
        width: calc(100% - 132px);
        width: -webkit-calc(100% - 132px);
        width: -moz-calc(100% - 132px);
        width: -o-calc(100% - 132px);
        bottom: 15px;
      }

      @media all and (max-width: 580px) {
        font-size: 2.67rem;
        bottom: 3.81rem;
        left: 25.39rem;
        width: calc(100% - 25.39rem);
        width: -webkit-calc(100% - 25.39rem);
        width: -moz-calc(100% - 25.39rem);
        width: -o-calc(100% - 25.39rem);
      }

      &.success {
        color: #f76e33;
        font-weight: 700;
      }

      > b {
        font-weight: 500;
        margin-right: 4.86px;
      }
    }

    > .click-info {
      position: absolute;
      transform: translate(-17px, 9px);
      background: #fff;
      width: 258px;
      display: none;
      padding: 0 15px 15px;
      z-index: 1;

      > span {
        font-family: 'Noto Sans KR';
        font-size: 14px;
        line-height: 14px;
        letter-spacing: -0.03em;
        color: #868686;
        display: block;
        margin-bottom: 4px;

        i {
          font-style: normal;
          margin-left: 4px;
          padding-left: 4px;
        }
      }

      a {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.03em;
        color: #252525;

        img {
          width: 15px;

          @media all and (max-width: 580px) {
            width: 3rem;
            vertical-align: sub;
            display: flex;
            align-items: baseline;
            justify-content: center;
          }
        }
      }
    }

    &.on {
      border: 0.888889px solid #868686;
      border-radius: 5.33333px;

      .click-info {
        display: block;
        width: 100%;
      }

      @media all and (max-width: 640px) {
        border: none;
        border-radius: 0;
      }

      &:hover {
        border: 0.888889px solid #868686;

        @media all and (max-width: 640px) {
          border: none;
        }
      }

      .click-info {
        border-radius: 0 0 5.33333px 5.33333px;
        border: 0.888889px solid #868686;
        border-top: none;

        @media all and (max-width: 640px) {
          border: none !important;
          border-radius: 0;
        }
      }
    }
  }

  .toggle-wish {
    position: absolute;
    top: 9px;
    right: 13px;
    width: 24px;
    height: 24px;
    cursor: pointer;

    @media all and (max-width: 640px) {
      top: 15px;
    }

    @media all and (max-width: 580px) {
      width: 4.58rem;
      height: 4.58rem;
      font-size: 3.05rem;
      top: 1.2rem;
    }
  }

  div.lot_info {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    > .img_wrap {
      width: 60px;
      height: 60px;
      background-color: ${palette.gray[1]};
      border-radius: 4.862px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      box-sizing: border-box;
      margin-right: 4.4%;

      @media all and (max-width: 640px) {
        padding: 0;
        border: 1.216px solid #d7d7d7;
        background: #929292;
        width: 90px;
        height: 90px;
      }

      @media all and (max-width: 580px) {
        width: 19.67rem;
        height: 17.15rem;
        border-radius: 1rem;
        margin-right: 2.86rem;
      }

      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    > .cnt_wrap {
      flex-grow: 1;
      width: calc(100% - 74px);
      width: -webkit-calc(100% - 74px);
      width: -moz-calc(100% - 74px);
      width: -o-calc(100% - 74px);

      @media all and (max-width: 640px) {
        width: calc(100% - 117px);
        width: -webkit-calc(100% - 117px);
        width: -moz-calc(100% - 117px);
        width: -o-calc(100% - 117px);
      }

      @media all and (max-width: 580px) {
        width: calc(100% - 22.53rem);
        width: -webkit-calc(100% - 22.53rem);
        width: -moz-calc(100% - 22.53rem);
        width: -o-calc(100% - 22.53rem);
      }

      p.lot_num {
        color: #252525;
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: -0.36px;
        margin-bottom: 6px;

        @media all and (max-width: 580px) {
          font-size: 2.67rem;
          line-height: 1.15;
          letter-spacing: -0.42px;
          margin-bottom: 0.77rem;
        }
      }

      p.w_name {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #252525;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 2px;

        @media all and (max-width: 580px) {
          font-size: 3.24rem;
          line-height: 1.3;
          letter-spacing: -0.51px;
          margin-bottom: 0.77rem;
        }
      }

      p.sub_tit {
        word-break: break-all;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: -0.03em;
        color: #6a6a6a;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media all and (max-width: 580px) {
          font-size: 2.67rem;
          line-height: 1.31;
        }
      }

      p.w_price {
        font-size: 12px;
        color: ${palette.gray[5]};

        &.success {
          font-weight: 700;
          color: ${palette.orange[6]};
        }
      }
    }
  }

  &:hover {
    > div.hober-box {
      display: flex;
    }
  }
`;
