import React, { MutableRefObject, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { AucStateResType, AuctionWorkResponse } from '../type';
import { RootState } from '../reducers';
import { priceChange } from '../utils';
import linkIconImage from '../assets/img/LinkIcon.png';
import arrowLotInfoMoreBtn from '../assets/img/icon_arrow_up2.png';
import { onErrorImage } from '../utils';

const CurrentLotWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  box-sizing: border-box;
  padding: 17px 24px 22px; 
  border-radius: 6px 6px 0 0;

  @media all and (max-width: 580px) {
    display: block;
    padding: 0 3.81rem;
    border-radius: 0;
  }

  > div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    @media all and (max-width: 580px) {
      padding: 0.39rem 0 3.05rem;
      justify-content: start;
    }
  }

  .mo-lot-now{
    display: none;

    @media all and (max-width: 580px) {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      padding: 1.91rem 0;
      position: relative;
      color: #868686;
      font-size: 2.67rem;
      font-weight: 400;
      line-height: 1.142;
      letter-spacing: -0.42px;
      font-family: Inter;

      i{
        font-style: normal;

        &.now{
          color: #252525;
          font-weight: 500;
        }
      }

      b{
        display: none;
        margin-left: 3.81rem;
        color: #252525;
        font-family: "Noto Sans KR";
        font-size: 2.29rem;
        font-weight: 700;
        line-height: 1.33;
        letter-spacing: -0.36px;
        position: relative;

        &::before{
          content: '';
          display: inline-block;
          vertical-align: bottom;
          width: 2.48rem;
          height: 2.48rem;
          border-radius: 100%;
          background: rgba(247,110,51,0.30);
          margin-right: 1.15rem;
        }

        &::after{
          content: '';
          position: absolute;
          left: 0.6rem;
          top: 1.1rem;
          display: inline-block;
          vertical-align: middle;
          width: 1.34rem;
          height: 1.34rem;
          border-radius: 100%;
          background: #F76E33;
        }
      }

      .btn{
        width: 4.573rem;
        height: 4.573rem;
        border-radius: 4px;
        background: #EAEAEA url(${arrowLotInfoMoreBtn}) no-repeat center;
        background-size: 2.2rem;
        position: absolute;
        right: 0;
      }
    }
  }

  .img-wrap {
    margin-right: 3%;
    width: 90px;
    height: 90px;
    border-radius: 4.873px;
    overflow: hidden;
    background: #eaeaea;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    @media all and (max-width: 580px) {
      width: 15.24rem;
      height: 15.24rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4.48%;
      border-radius: 0.6rem;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .lot_content {
    width: calc(100% - 104px);

    @media all and (max-width: 580px) {
      width: calc(100% - 24rem);
    }

  .w_info {
      width: 100%;

      @media all and (max-width: 580px) {
        margin-bottom: 5px;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media all and (max-width: 580px) {
          display: none;
        }
      }

      .lot_num {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #252525;
        margin-bottom: 0;
        font-family: Inter;
        letter-spacing: -0.42px;

        @media all and (max-width: 580px) {
          display: none;
        }
      }

      strong {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #252525;
        display: block;
        margin-bottom: 4px;

        @media all and (max-width: 1200px) {
          font-size: 18px;
        }

        @media all and (max-width: 580px) {
          display: flex;
          align-items: center;
          justify-content: start;
          margin-bottom: 2px;
        }

        span{
          font-weight: 700;
          color: #252525;
          font-family: "Noto Sans KR";
          font-size: 20px;
          line-height: 26px;
          letter-spacing: -0.6px;
          margin-bottom: 4px;

          @media all and (max-width: 580px) {
            width: auto;
            max-width: calc(100% - 10.4rem);
            max-width: -webkit-calc(100% - 10.4rem);
            max-width: -moz-calc(100% - 10.4rem);
            max-width: -o-calc(100% - 10.4rem);
            font-size: 3.05rem;
            line-height: 4rem;
            margin-bottom: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      .icon-now{
        display: none;

        @media all and (max-width: 580px) {
          display: inline-block;
          color: #F76E33;
          font-family: Montserrat;
          font-style: normal;
          font-size: 2.29rem;
          font-weight: 700;
          line-height: normal;
          position: relative;
          margin-left: 1.15rem;
          padding-left: 2.78rem;

          &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            vertical-align: middle;
            width: 2.48rem;
            height: 2.48rem;
            border-radius: 100%;
            background: rgba(247,110,51,0.30);
          }

          &::after{
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(0.6rem,-50%);
            display: inline-block;
            vertical-align: middle;
            width: 1.34rem;
            height: 1.34rem;
            border-radius: 100%;
            background: #F76E33;
          }
        }
        
      }

      span {
        display: block;
        margin-bottom: 7px;
        color: #868686;
        font-family: "Noto Sans KR";
        font-size: 16px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: -0.48px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media all and (max-width: 580px) {
          margin-bottom: 0;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #333;
          font-family: "Noto Sans KR";
          font-size: 2.29rem;
          font-weight: 400;
          line-height: 1.415;
          letter-spacing: -0.36px;
        }
      }

      .mo-lot-num{
        display: none;
  
        @media all and (max-width: 580px) {
          display: block;
          color: #252525;
          font-family: Inter;
          font-size: 2.29rem;
          font-weight: 700;
          line-height: 1.332;
          letter-spacing: -0.36px;
          margin-bottom: 0;
          transform: translateY(-2px);
        }

        .mo-detail-info{
          display: none;

          @media all and (max-width: 640px){
            display: inline-block;
            margin-left: 1.15rem;

            img{
              width: 2.19rem;
              transform: translateY(-0.3rem);
            }

          }
        }
      }
    }

    .w_price_currency,
    .w_price {
      font-size: 16px;
      line-height: 18px;
      color: #c1c1c1;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-family: Inter;
      letter-spacing: -0.48px;

      @media all and (max-width: 1200px) {
        font-size: 14px;
      }

      @media all and (max-width: 580px) {
        font-size: 2.67rem;
        display: block;
        color: #868686;
        font-family: "Noto Sans KR";
        font-weight: 500;
        line-height: 1.285;
        letter-spacing: -0.42px;
      }

      br {
        display: none;
      }
    }

    .w_price{
      align-items: baseline;
    }

    .lot-num-info {
      @media all and (max-width: 580px) {
        font-size: 2.4rem;
      }

      i {
        color: #868686;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: -0.42px;

        @media all and (max-width: 580px) {
          font-size: 2.67rem;
        }

        &.now {
          color: #252525;
        }
      }
    }

    .detail-info {
      color: #333;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-family: "Noto Sans KR";
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: -0.42px;
      transform: translateY(-2px);

      img {
        width: 15px;
        margin-right: 2px;

        @media all and (max-width: 580px) {
          transform: translateY(2px);
        }
      }

      @media all and (max-width: 580px) {
        display: none;
      }
    }
  }
`;

interface props {
  currentLotInfo: AuctionWorkResponse;
  currentLotStat: AucStateResType;
  nowWorkDetailRef: MutableRefObject<any>;
}

const BiddingSelectInfo = ({ currentLotInfo, currentLotStat, nowWorkDetailRef }: props) => {
  const {
    w_low_price,
    w_high_price,
    usd_w_low_price,
    usd_w_high_price,
    jpy_w_low_price,
    jpy_w_high_price,
    cny_w_low_price,
    cny_w_high_price,
    hkd_w_low_price,
    hkd_w_high_price,
    eur_w_low_price,
    eur_w_high_price,
  } = currentLotInfo;
  const { auc_num } = currentLotStat;
  // currency 통화
  const { currency } = useSelector((state: RootState) => state.auction);

  const nowDetail = () => {
    nowWorkDetailRef.current?.classList.toggle('hidden');
  }

  return (
    <CurrentLotWrap>
      <div className='mo-lot-now'>
        <span className="lot-num-info">
          <i className="now">{currentLotStat.lot_row_num}</i>/<i className="total">{currentLotStat.lot_total_cnt}</i>
        </span>
        <div>
          <b>LOT{currentLotInfo.lot_num} {currentLotInfo.a_name}</b>
        </div>
        <button className="btn" onClick={nowDetail}></button>
      </div>
      <div className='now-wrap'>
        <div className="img-wrap">
          <img src={currentLotInfo.img_file_name} alt="이미지링크" loading="lazy" onError={onErrorImage} />
        </div>

        <div className="lot_content">
          <div className="w_info">
            <div>
              <span className="lot_num">LOT {currentLotInfo.lot_num}</span>
              <span className="lot-num-info">
                <i className="now">{currentLotStat.lot_row_num}</i>/<i className="total">{currentLotStat.lot_total_cnt}</i>
              </span>
            </div>
            <span className="mo-lot-num">
              LOT {currentLotInfo.lot_num}
              <a target="_blank" href={`/Auction/Major/${auc_num}/${currentLotInfo.work_seq}`} rel="noreferrer" className="mo-detail-info">
                <img alt="작품 이미지" src={linkIconImage} loading="lazy" onError={onErrorImage} />
              </a>
            </span>
            <strong><span>{currentLotInfo.a_name}</span><i className='icon-now'>NOW</i></strong>

            <span>{currentLotInfo.w_name}</span>
          </div>

          <div className="w_price">
            <div>
              <span>KRW <br className="mo" />{priceChange(w_low_price)} ~ {priceChange(w_high_price)}</span>


              {currency === 'USD' ? (
                <div className="w_price_currency">
                  ( USD {priceChange(usd_w_low_price)} ~ {priceChange(usd_w_high_price)} )
                </div>
              ) : currency === 'JPY' ? (
                <div className="w_price_currency">
                  ( JPY {priceChange(jpy_w_low_price)} ~ {priceChange(jpy_w_high_price)} )
                </div>
              ) : currency === 'CNY' ? (
                <div className="w_price_currency">
                  ( CNY {priceChange(cny_w_low_price)} ~ {priceChange(cny_w_high_price)} )
                </div>
              ) : currency === 'HKD' ? (
                <div className="w_price_currency">
                  ( HKD {priceChange(hkd_w_low_price)} ~ {priceChange(hkd_w_high_price)} )
                </div>
              ) : currency === 'EUR' ? (
                <div className="w_price_currency">
                  ( EUR {priceChange(eur_w_low_price)} ~ {priceChange(eur_w_high_price)} )
                </div>
              ) : null}
            </div>
            <a
              target="_blank"
              href={`/Auction/Major/${auc_num}/${currentLotInfo.work_seq}`}
              rel="noreferrer"
              className="detail-info"
            >
              <img alt="작품 이미지" src={linkIconImage} loading="lazy" onError={onErrorImage} />
              <span>
                <FormattedMessage id="LOT_INFO" />
              </span>{' '}
            </a>
          </div>

        </div>
      </div>
    </CurrentLotWrap>
  );
};

export default BiddingSelectInfo;
