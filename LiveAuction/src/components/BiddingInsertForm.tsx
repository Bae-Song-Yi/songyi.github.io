import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { priceChange } from '../utils';
import { AucStateResType } from '../type';
import { RootState } from '../reducers';
import { biddingInsertRequest } from '../actions/auction';
import bidLoading from '../assets/img/icon_loading.gif';
import bidCheck from '../assets/img/icon_check_wt.png';
import bidArrowOn from '../assets/img/icon_bid_arrow_on.png';

interface Props {
  currentLotStat: AucStateResType;
  my_paddle_num: number;
}

const BiddingInsertForm = ({ currentLotStat, my_paddle_num }: Props) => {
  const dispatch = useDispatch();
  const {
    lot_num,
    bid_price,
    next_bid_price,
    usd_next_bid_price,
    jpy_next_bid_price,
    cny_next_bid_price,
    hkd_next_bid_price,
    eur_next_bid_price,
    lot_stat_cd,
    successful_bid_price,
    pre_bid_proc_yn,
    usd_bid_price,
    jpy_bid_price,
    cny_bid_price,
    hkd_bid_price,
    eur_bid_price,
  } = currentLotStat;

  const { auc_kind, auc_num, currency, bidsList } = useSelector((state: RootState) => state.auction);
  const [animateBidPrice, setAnimateBidPrice] = useState(false);

  // 입찰가 입력 후 애니메이션 효과
  useEffect(() => {
    setAnimateBidPrice(true);
    const timer = setTimeout(() => {
      setAnimateBidPrice(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [next_bid_price]);

  const handleOnBidInsert = useCallback(() => {
    dispatch(
      biddingInsertRequest({
        auc_kind,
        auc_num,
        lot_num,
        paddle_num: my_paddle_num,
        bid_price: next_bid_price,
      }),
    );
  }, [lot_num, my_paddle_num, next_bid_price]);

  return (
    <>
      <Wrapper>
        {lot_stat_cd !== 'F' && (
          <div className="current-price-wrap">
            <div>
              <span>
                <FormattedMessage id="CurrentBid" />
              </span>{' '}
              <strong>KRW {priceChange(bid_price)}</strong>
            </div>
            {currency === 'USD' ? (
              <p>(USD {priceChange(usd_bid_price)})</p>
            ) : currency === 'JPY' ? (
              <p>(JPY {priceChange(jpy_bid_price)})</p>
            ) : currency === 'CNY' ? (
              <p>(CNY {priceChange(cny_bid_price)})</p>
            ) : currency === 'HKD' ? (
              <p>(HKD {priceChange(hkd_bid_price)})</p>
            ) : currency === 'EUR' ? (
              <p>(EUR {priceChange(eur_bid_price)})</p>
            ) : null}
          </div>
        )}
        <>
          {!my_paddle_num ? (
            <div className="bidding-btn-wrap preparing unbid">
              <div className="btn-handler">
                <i>
                  <FormattedMessage id="사전 등록한 고객만 경매에 참여할 수 있습니다" />
                </i>
              </div>
              <p className="price">KRW {priceChange(next_bid_price)}</p>
              <input type="text" className="hidden-txt" value={priceChange(bid_price)} readOnly />
            </div>
          ) : (
            <>
              {lot_stat_cd === 'F' ? (
                bidsList?.length === 0 || bidsList?.filter((x) => !x.isCancel)?.length === 0 ? (
                  <div className="bidding-btn-wrap preparing wait">
                    <span>
                      <FormattedMessage id="유찰" />
                    </span>
                  </div>
                ) : (
                  <div className="bidding-btn-wrap success">
                    <span>
                      {/* 마감된 경매일 경우 낙찰가 데이터가 전달되지 않아 bid_price로 대체합니다. */}
                      <FormattedMessage id="SuccessfulBid" /> KRW{' '}
                      {priceChange(successful_bid_price === 0 ? bid_price : successful_bid_price)}
                    </span>
                  </div>
                )
              ) : lot_stat_cd === 'W' ? (
                <div className="bidding-btn-wrap preparing wait">
                  <span>
                    <FormattedMessage id="Preparing_Lot" />
                  </span>
                </div>
              ) : lot_stat_cd === 'S' && pre_bid_proc_yn === false ? (
                <div className="bidding-btn-wrap pre-bid">
                  <span>
                    <FormattedMessage id="Absentee_bidding_Lot" />
                  </span>
                </div>
              ) : lot_stat_cd === 'S' ? (
                <div role="presentation" className="bidding-btn-wrap bid" onClick={handleOnBidInsert}>
                  <div className={`btn-handler ${animateBidPrice ? 'active' : ''}`}>
                    <div>
                      <b>
                        KRW <span>&nbsp;{priceChange(next_bid_price)}</span>
                      </b>
                      <i>
                        <FormattedMessage id="PlaceBid" />
                      </i>
                    </div>

                    {currency === 'USD' ? (
                      <p className="currency_price">(USD {priceChange(usd_next_bid_price)})</p>
                    ) : currency === 'JPY' ? (
                      <p className="currency_price">(JPY {priceChange(jpy_next_bid_price)})</p>
                    ) : currency === 'CNY' ? (
                      <p className="currency_price">(CNY {priceChange(cny_next_bid_price)})</p>
                    ) : currency === 'HKD' ? (
                      <p className="currency_price">(HKD {priceChange(hkd_next_bid_price)})</p>
                    ) : currency === 'EUR' ? (
                      <p className="currency_price">(EUR {priceChange(eur_next_bid_price)})</p>
                    ) : null}
                  </div>
                  <input type="text" className="hidden-txt" value={priceChange(next_bid_price)} readOnly />
                </div>
              ) : lot_stat_cd === 'N' ? (
                <div className="bidding-btn-wrap processing">
                  <span>
                    <FormattedMessage id="Confirming_Lot" />
                  </span>
                </div>
              ) : lot_stat_cd === 'P' ? (
                <div className="bidding-btn-wrap processing">
                  <span>
                    <FormattedMessage id="PauseLot" />
                  </span>
                </div>
              ) : null}
            </>
          )}
        </>
      </Wrapper>
    </>
  );
};

export default BiddingInsertForm;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fafafd;
  border-width: 1px 0px;
  border-style: solid;
  border-color: #eaeaea;
  padding: 20px 24px 27px;
  position: relative;

  @media all and (max-width: 840px) {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    z-index: 400;
    padding: 20px 24px 40px;
  }

  @media all and (max-width: 580px) {
    padding: 2rem 2rem 6rem;
  }

  .current-price-wrap {
    width: 100%;
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      line-height: 1.2em;
      display: flex;
      align-items: center;
      justify-content: center;

      > span {
        display: inline-block;
        font-weight: 500;
        font-size: 14px;
        color: #6a6a6a;
        margin-right: 8px;
        font-size: 14px;
        line-height: normal;
        letter-spacing: -0.42px;
      }

      > strong {
        font-weight: 500;
        font-size: 14px;
        color: #6a6a6a;
        font-family: Inter;
        line-height: normal;
        letter-spacing: -0.42px;

        &.success {
          font-family: Inter;
        }
      }
    }

    > p {
      color: #6a6a6a;
      font-family: Inter;
      font-size: 14px;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.42px;
      margin-left: 8px;
    }
  }

  > .bidding-btn-wrap {
    width: 100%;
    height: 72px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    @media all and (max-width: 580px) {
      height: 10.67rem;
    }

    &.pre-bid {
      > span {
        font-size: 16px;
      }
    }

    &.pre-bid,
    &.processing {
      justify-content: center;
      border: 1px solid #101b4d;

      > span {
        display: block;
        width: 100% !important;
        color: #101b4d;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.54px;

        @media all and (max-width: 1200px) {
          font-size: 16px;
        }
      }
    }

    &.preparing,
    &.bid {
      position: relative;

      .btn-handler {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        background-color: #101b4d;
        border-radius: 4px;

        @media all and (max-width: 840px) {
          min-width: 180px;
        }

        @media all and (max-width: 580px) {
          min-width: 24.77rem;
        }

        &.on {
          width: 100% !important;
        }

        > i {
          font-style: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          color: #fff;
          font-family: 'Noto Sans KR';
          font-size: 16px;
          font-weight: 900;
          line-height: 21px;
          letter-spacing: -0.48px;
          margin-left: 8px;

          @media all and (max-width: 840px) {
            font-size: 16px;
            background: #101b4d;
            width: auto;
          }

          @media all and (max-width: 580px) {
            font-size: 3.05rem;
          }
        }

        b {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: Inter;
          font-size: 18px;
          font-weight: 700;
          line-height: 21px;
          letter-spacing: -0.54px;

          @media all and (max-width: 580px) {
            font-size: 3.43rem;
          }
        }

        &.click {
          background: #071839 url(${bidArrowOn}) no-repeat right center;
          background-size: 24px;
          background-position-x: calc(100% - 15px);
          background-position-x: -webkit-calc(100% - 15px);
          background-position-x: -moz-calc(100% - 15px);
          background-position-x: -o-calc(100% - 15px);

          @media all and (max-width: 840px) {
            background-size: 24px;
          }

          @media all and (max-width: 580px) {
            background-size: 2.8rem;
          }

          > i {
            background: #071839;
          }

          img {
            display: none !important;
          }

          b {
            right: 45px;
            height: 100%;

            @media all and (max-width: 840px) {
              font-size: 16px;
            }

            @media all and (max-width: 580px) {
              font-size: 3.43rem;
            }

            &::after {
              right: var(--after-right, -15px);
              background: linear-gradient(90deg, #071839 78.91%, rgba(16, 27, 77, 0) 100%);
            }

            span {
              opacity: 1;
            }
          }
        }

        &.wait {
          justify-content: center;
          pointer-events: none;
          background: #101b4d;
          border-radius: 4px;

          i {
            padding-right: 29px;
            background: url(${bidLoading}) no-repeat right center;
            background-size: 24px;
          }

          b {
            display: none;
          }
        }

        &.success {
          background: #071839;

          i {
            background: url(${bidCheck}) no-repeat right center;
            background-size: 24px;
          }
        }

        span {
          text-align: right;
          font-size: 18px;
          font-weight: 700;
          line-height: 21px;
          letter-spacing: -0.54px;
          color: #fff;
        }

        img {
          margin-left: 15px;
          width: 24px;
          vertical-align: middle;
          transform: translate(-20px, 1px);
          display: none;

          @media all and (max-width: 840px) {
            display: block;
            width: 24px;
          }

          @media all and (max-width: 580px) {
            width: 4.5rem;
          }
        }
      }
    }

    &.unbid {
      .btn-handler {
        background: #c1c1c1;
        min-width: 100%;
        justify-content: center;

        > i {
          background: none;
          padding-left: 0;

          img {
            display: none;
          }
        }
      }
    }

    &.bid {
      background: #eaeaea;
      flex-wrap: wrap;

      .btn-handler {
        flex-direction: column;

        > div {
          display: flex;
          align-items: center;

          span {
            transition: all 0.3s;
          }

          i {
            font-style: normal;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            color: #fff;
            font-family: 'Noto Sans KR';
            font-size: 16px;
            font-weight: 900;
            line-height: 21px;
            letter-spacing: -0.48px;
            margin-left: 8px;

            @media all and (max-width: 840px) {
              font-size: 16px;
              background: #101b4d;
              width: auto;
            }

            @media all and (max-width: 580px) {
              font-size: 3.05rem;
            }
          }
        }

        &.active {
          span {
            color: #ff9c00;
            font-size: 20px;
            transition: all 0.3s;

            @media all and (max-width: 580px) {
              font-size: 3.9rem !important;
            }
          }
        }
      }

      .currency_price {
        color: #fff;
        width: 100%;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.42px;
        margin-top: 4px;

        @media all and (max-width: 580px) {
          font-size: 2.67rem;
        }
      }
    }

    &.preparing {
      border: 1px solid #ccc;

      span {
        background: #c1c1c1;
      }
    }

    &.wait {
      border: none;
      pointer-events: none;

      &::before {
        width: 100%;
        background: #c1c1c1;
      }

      span {
        width: 100%;
        font-weight: 700;
        font-size: 18px;
        letter-spacing: -0.03em;
        color: #ffffff;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
    }

    &.success {
      background: #ffffff;
      border: 1px solid #f76e33;
      border-radius: 6px;
      cursor: unset;
      justify-content: center;

      span {
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #f76e33;
      }
    }

    > .price {
      color: #4e4e4e;
      text-align: right;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: -0.54px;
      width: 100%;
      position: relative;
      margin-left: 130px;
      padding-right: 15px;
      transition: all 0.5s;

      @media all and (max-width: 1200px) {
        font-size: 16px;
      }

      @media all and (max-width: 840px) {
        font-size: 16px;
        line-height: normal;
        letter-spacing: -0.48px;
      }

      @media all and (max-width: 580px) {
        font-size: 3.05rem;
      }

      i {
        font-style: normal;
        transition: ease 0.5s;
      }
    }

    > .hidden-txt {
      position: absolute;
      z-index: -999;
      opacity: 0;
    }

    > .currency_price {
      font-size: 14px;
      width: 100%;
      text-align: center;
      font-weight: 500;

      @media all and (max-width: 840px) {
        margin-left: 0;
        margin-top: 5px;
      }

      @media all and (max-width: 580px) {
        margin-top: 1rem;
      }
    }

    span {
      display: block;
      width: 100%;
      text-align: center;
      color: #101b4d;
      font-size: 18px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.36px;

      @media all and (max-width: 1200px) {
        font-size: 16px;
      }

      @media all and (max-width: 580px) {
        font-size: 3.43rem !important;
        line-height: normal !important;
        margin-left: 4px;
      }
    }

    &.drag {
      &:before {
        width: 100%;
        transition: all 0.5s;
      }

      span {
        &:first-child {
          img {
            display: none;
          }
        }
      }

      .price {
        color: #fff;
      }
    }

    span {
      i {
        @media all and (max-width: 1200px) {
          font-size: 14px;
        }
      }
    }
  }
`;
