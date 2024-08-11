import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import popCloseIconImage from '../assets/img/icon_pop_close.png';
import { priceChange } from '../utils';
import { MyBidInfoResType } from '../type';
import { RootState } from '../reducers';
import { getMyBidRequest } from '../actions/user';
import { IModalProps } from '../hooks/useModal';

const MyBidListPop: React.FC<IModalProps<{}>> = ({ close }) => {
  const dispatch = useDispatch();
  const { myBids } = useSelector((state: RootState) => state.user);
  const { auc_kind } = useSelector((state: RootState) => state.auction);
  const { auc_num } = useSelector((state: RootState) => state.auction?.scheduleCnt);

  useEffect(() => {
    dispatch(
      getMyBidRequest({
        auc_kind,
        auc_num: Number(auc_num),
        page_no: 1,
        page_size: 100,
      }),
    );
  }, []);

  const handleOnClose = () => {
    close();
  };

  return (
    <MyBidWrapper>
      <div className="bid-popup-wrap">
        <div className="bid-popup-data">
          <h3>
            <FormattedMessage id="내 응찰내역" />
          </h3>
          <dl className="bid-total">
            <dt>
              <FormattedMessage id="응찰" />
            </dt>
            <dd>
              {myBids?.filter((x) => x.successful_bid === true && x.bid_stat_cd === 'BID')?.length ?? 0}
              <FormattedMessage id="점" />
            </dd>
            <dt>
              <FormattedMessage id="낙찰" />
            </dt>
            <dd>
              {myBids?.filter((x) => x.successful_bid === false)?.length ?? 0}
              <FormattedMessage id="점" />
            </dd>
          </dl>
          <button className="pop-close" onClick={handleOnClose} aria-label="pop-close">
            <img alt="pop close" src={popCloseIconImage} />
          </button>
          <div className="bid-list">
            <div className="thead">
              <ul>
                <li>No.</li>
                <li>
                  <FormattedMessage id="작가명" />
                </li>
                <li>
                  <FormattedMessage id="작품명" />
                </li>
                <li>
                  <FormattedMessage id="접수일시" />
                </li>
                <li>
                  <FormattedMessage id="응찰가" />
                  (KRW)
                </li>
                <li>
                  <FormattedMessage id="진행상태" />
                </li>
              </ul>
            </div>

            <div className="tbody">
              {myBids?.map((bid: MyBidInfoResType, index: number) => (
                <div key={index}>
                  <span className="lot-num">LOT {bid.lot_num}</span>
                  <ul className="info">
                    <li>{index + 1}</li>
                    <li>{bid.a_name}</li>
                    <li>{bid.w_name}</li>
                    <li>{moment(bid.bid_reg_date).format('YY/MM/DD HH:mm:ss')}</li>
                    <li>{priceChange(bid.bid_price)}</li>
                    <li className={bid.successful_bid === true ? 'success' : ''}>
                      {bid.successful_bid === false ? (
                        <FormattedMessage id="낙찰" />
                      ) : bid.successful_bid === true && bid.bid_stat_cd === 'BID' ? (
                        <FormattedMessage id="응찰" />
                      ) : (
                        <FormattedMessage id="응찰취소" />
                      )}
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* 응찰내역 없을경우 */}
            <div className="data-none" style={{ display: 'none' }}>
              <p>
                <FormattedMessage id="내역이 없습니다" />
              </p>
            </div>
            {/* 응찰내역 없을경우 */}
          </div>
        </div>
        <div className="overlay open" onClick={handleOnClose} />
      </div>
    </MyBidWrapper>
  );
};

export default MyBidListPop;

const MyBidWrapper = styled.div`
  .bid-popup-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 401;
    display: block;

    .overlay {
      display: none;

      &.open {
        display: block;
        z-index: -1;

        @media all and (max-width: 640px) {
          display: none;
        }
      }
    }
  }

  .bid-popup-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    background: #edeff0;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    max-width: 788px;
    width: 96%;
    height: 500px;
    padding: 20px;

    @media all and (max-width: 840px) {
      max-width: 100%;
      width: 100%;
      height: 100%;
      border-radius: 0;
      top: 0;
      left: 0;
      transform: translate(0);
    }

    @media all and (max-width: 580px) {
      left: 0;
      top: 0;
      transform: translate(0);
      border-radius: 0;
      box-shadow: 0;
      width: 100%;
      height: 100%;
      padding: 0;
    }

    h3 {
      color: #252525;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.54px;
      padding-left: 10px;

      @media all and (max-width: 580px) {
        text-align: center;
        padding: 2.55rem 0 1.82rem;
        font-size: 3.28rem;
        background: #fff;
      }
    }

    .bid-total {
      position: absolute;
      right: 55px;
      top: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      @media all and (max-width: 580px) {
        position: static;
        background: #fff;
        margin-top: 0.77rem;
        padding: 2.86rem 3.05rem 2.29rem;
      }

      dt {
        color: #868686;
        text-align: right;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.48px;
        margin-right: 2px;

        @media all and (max-width: 580px) {
          font-size: 2.67rem;
        }
      }

      dd {
        color: #4e4e4e;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.48px;
        margin-right: 10px;

        @media all and (max-width: 580px) {
          font-size: 3.07rem;
        }

        &:last-child {
          color: #f76e33;
        }
      }
    }

    .pop-close {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 24px;

      @media all and (max-width: 580px) {
        right: 3rem;
        top: 2.8rem;
        width: 4.37rem;
      }

      img {
        width: 100%;
      }
    }

    .bid-list {
      height: 100%;

      @media all and (max-width: 840px) {
        height: 100%;
      }

      @media all and (max-width: 580px) {
        padding: 0 1.4rem 0 2rem;
        height: calc(100% - 30.37rem);
        height: -webkit-calc(100% - 30.37rem);
        height: -moz-calc(100% - 30.37rem);
        height: -o-calc(100% - 30.37rem);
      }

      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px 0;
      }

      li {
        padding: 0 2.5%;
        color: #4e4e4e;
        font-size: 14px;
        line-height: normal;
        letter-spacing: -0.6px;
        text-align: center;
        position: relative;

        @media all and (max-width: 580px) {
          padding: 0 0.8rem;
          font-size: 2.67rem;
        }

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 16px;
          background: #c1c1c1;
        }

        &:first-child {
          padding-left: 10px;
          width: auto;

          @media all and (max-width: 840px) {
            width: 6%;
          }

          @media all and (max-width: 580px) {
            padding-left: 0;
            width: 12.6%;
          }
        }

        &:nth-child(2),
        &:nth-child(3) {
          width: 138px;

          @media all and (max-width: 840px) {
            width: 20%;
          }

          @media all and (max-width: 580px) {
            width: auto;
          }
        }

        &:nth-child(4),
        &:nth-child(5) {
          width: 158px;

          @media all and (max-width: 840px) {
            width: 20%;
          }

          @media all and (max-width: 580px) {
            width: auto;
          }
        }

        &:nth-child(4) {
          @media all and (max-width: 580px) {
            width: 25.4%;
          }
        }

        &:nth-child(5) {
          @media all and (max-width: 580px) {
            width: 37%;
          }
        }

        &:last-child {
          padding-right: 10px;
          width: 80px;

          @media all and (max-width: 840px) {
            width: 14%;
          }

          @media all and (max-width: 580px) {
            width: 25%;
            padding-right: 2rem;
          }

          &::after {
            display: none;
          }
        }
      }
      .thead {
        ul {
          margin-top: 16px;

          @media all and (max-width: 580px) {
            margin-top: 0;
            padding: 2rem 0;
            justify-content: center;
          }
        }

        li {
          font-weight: 700;

          @media all and (max-width: 580px) {
            &:nth-child(2) {
              display: none;
            }

            &:nth-child(3) {
              display: none;
            }
          }
        }
      }

      .tbody {
        margin-top: 4px;
        overflow: hidden;
        overflow-y: auto;
        height: 364px;

        @media all and (max-width: 840px) {
          height: calc(100% - 80px);
          height: -webkit-calc(100% - 80px);
          height: -moz-calc(100% - 80px);
          height: -o-calc(100% - 80px);
        }

        @media all and (max-width: 580px) {
          background: #fff;
          overflow-y: auto;
          height: auto;
          max-height: 100%;
          margin-top: 0;
          padding-top: 2rem;
        }

        > div {
          margin-bottom: 6.5px;

          @media all and (max-width: 580px) {
            margin-bottom: 0;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            width: 100%;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              left: 0;
              top: 3rem;
              width: 100%;
              height: 1px;
              background: #eaeaea;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        .lot-num {
          display: inline-block;
          padding: 0 10px;
          height: 27px;
          line-height: 27px;
          border-radius: 27px;
          border: 1px solid #eaeaea;
          background: #fff;
          color: #4e4e4e;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.42px;
          position: relative;
          z-index: 1;

          @media all and (max-width: 580px) {
            padding: 1rem 2rem;
            height: auto;
            line-height: normal;
            border-radius: 0;
            font-size: 2.67rem;
            border-radius: 6.4rem;
          }
        }

        .info {
          border-radius: 10px;
          border: 1px solid var(--grey-200, #eaeaea);
          background: #fff;
          transform: translateY(-13px);
          padding: 14px 0;

          @media all and (max-width: 580px) {
            border-radius: 0;
            transform: translateY(0);
            padding: 0;
            width: 100%;
            border: none;
            justify-content: center;
          }

          li {
            padding-top: 10px;
            padding-bottom: 10px;

            @media all and (max-width: 580px) {
              padding-top: 1.15rem;
              padding-bottom: 1.15rem;
              word-wrap: break-word;
            }

            &::after {
              background: #eaeaea;
            }

            &.success {
              color: #f76e33;
            }

            &:last-child {
              font-weight: bold;
            }

            @media all and (max-width: 580px) {
              &:nth-child(2) {
                display: none;
              }

              &:nth-child(3) {
                display: none;
              }
            }
          }
        }
      }

      .data-none {
        display: block;
        height: 120px;
        line-height: 120px;
        text-align: center;
        background: #fff;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        margin-top: 20px;

        @media all and (max-width: 580px) {
          height: 24rem;
          line-height: 24rem;
          margin-top: 1rem;
        }

        p {
          color: #6a6a6a;

          @media all and (max-width: 580px) {
            font-size: 2.8rem;
          }
        }
      }
    }
  }
`;
