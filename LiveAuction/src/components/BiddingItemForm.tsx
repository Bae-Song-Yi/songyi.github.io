import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { currentBidHstResType } from '../type';
import { priceChange } from '../utils';
import { RootState } from '../reducers';

const ListWrap = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #EAEAEA;
  position: relative;

  @media all and (max-width: 580px) {
    background: #fff;
    padding: 2.286rem 0;

    &:last-child{
      border-bottom: none;
    }
  }

  > p.date {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #868686;
    font-family: Inter;
    line-height: 22px;
    letter-spacing: -0.48px;
    display: flex;
    align-items: center;

    @media all and (max-width: 1200px) {
      font-size: 14px;
    }

    @media all and (max-width: 580px) {
      font-size: 2.29rem;
      line-height: 1.42;
      letter-spacing: -0.36px;
    }

    &.active {
      text-decoration-line: line-through;
    }
  }

  > .bid-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div:first-child {
      display: flex;
      align-items: center;

      > span {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.54px;
        color: #252525;

        @media all and (max-width: 1200px) {
          font-size: 16px;
        }

        @media all and (max-width: 580px) {
          font-size: 3.05rem;
          line-height: 1.249;
          letter-spacing: -0.48px;
          margin-bottom: 2px;
          font-weight: 700;
        }

        &.active {
          text-decoration-line: line-through;
          color: #c1c1c1;
        }
      }
    }

    > div.price {
      font-weight: 700;
      font-size: 20px;
      line-height: 29px;
      letter-spacing: -0.6px;
      color: #252525;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-family: Inter;

      @media all and (max-width: 1200px) {
        font-size: 18px;
      }

      > div{
        &:last-child{
          @media all and (max-width: 840px) {
            display: flex;
            flex-direction: column-reverse;
            align-items: end;
            line-height: normal;
          }
        }
      }

      .unit{
        @media all and (max-width: 840px) {
          color: #868686;
          font-weight: 400;
          margin-top: 3px;
          font-size: 14px;

          @media all and (max-width: 580px) {
            font-size: 2.29rem;
          }
        }
      }

      &.high {
        padding-left: 44px;
        color: #F76E33;
        display: flex;
        align-items: center;
        flex-direction: row;

        @media all and (max-width: 840px) {
          align-items: start;
        }
        
        @media all and (max-width: 580px) {
          padding-left: 0;
        }

        .bid-price {
          @media all and (max-width: 580px) {
            font-size: 3.05rem;
            line-height: 1.25;
          }
        }

        .unit{
          color: #F76E33;
          font-family: Inter;
          font-weight: 700;

          @media all and (max-width: 840px) {
            color: #868686;
            font-weight: 400;
          }
        }
      }

      &.active {
        text-decoration-line: line-through;
        color: #c1c1c1;

        .bid-price {
          @media all and (max-width: 580px) {
            font-weight: 500;
          }
        }
      }

      @media all and (max-width: 580px) {
        display: flex;
        flex-direction: column-reverse;
        align-items: end;
        font-size: 3.05rem;
        line-height: normal;
        right: 2rem;
      }

      > .unit {
        @media all and (max-width: 580px) {
          font-size: 2.29rem;
        }
      }
    }
  }
`;

const MyBid = styled.span`
  padding-left: 6px;
  color: #F76E33;
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.48px;

  @media all and (max-width: 1200px) {
    font-size: 14px;
  }

  @media all and (max-width: 580px) {
    font-size: 2.29rem;
    line-height: 1.42;
    letter-spacing: -0.36px;
  }
`;
const BidSucIcon = styled.div`
  font-style: normal;
  font-weight: 700;
  border-radius: 100px;
  background: #f76e33;
  padding: 3px 8px;
  color: #fff;
  font-family: "Noto Sans KR";
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.36px;
  margin-right: 8px;

  @media all and (max-width: 840px) {
    transform: translateY(4px);
  }

  @media all and (max-width: 580px) {
    top: inherit;
    bottom: 0;
    transform: translateY(0.5rem);
    font-size: 2.4rem;
  }
`;

interface props {
    list: currentBidHstResType;
    index: number;
}

const BiddingItemForm = ({ list, index }: props) => {
    const { bid_price, bid_stat_cd, paddle_num, bid_hst_seq } = list;

    const { my_paddle_num } = useSelector((state: RootState) => state.auction?.scheduleCnt);
    const { bidListClaimLoading } = useSelector((state: RootState) => state.auction);

    return (
        <>
            {/* 응찰 리스트 */}
            <ListWrap style={bid_stat_cd === 'DEL' ? { display: 'none' } : {}}>
                <div className="bid-info">
                    <div className="paddle">
                        {list.bid_type_cd === 'FLD' ? (
                            <>
                                {!bidListClaimLoading && bid_stat_cd === 'CNL' ? (
                                    <span className="active">
                                        <FormattedMessage id="FLD" />
                                    </span>
                                ) : (
                                    <span>
                                        <FormattedMessage id="FLD" />
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                                {!bidListClaimLoading && bid_stat_cd === 'CNL' ? (
                                    <span className="active">{paddle_num}</span>
                                ) : (
                                    <span>{paddle_num}</span>
                                )}
                            </>
                        )}

                    </div>
                    {index === 0 ? (
                        <div className={bid_stat_cd === 'CNL' ? 'price high active' : 'price high'}>
                            {/* 낙찰일 경우 */}
                            {list.successful_bid === false && <BidSucIcon><FormattedMessage id="낙찰" /></BidSucIcon>}
                            <div>
                                <span className="unit">KRW</span> <span className="bid-price">{priceChange(bid_price)}</span>
                            </div>
                        </div>
                    ) : (
                        // price active
                        <div className={bid_stat_cd === 'CNL' ? 'price active' : 'price'}>
                            <div>
                                <span className="unit">KRW</span> <span className="bid-price">{priceChange(bid_price)}</span>
                            </div>
                        </div>
                    )}
                </div>
                <p className={bid_stat_cd !== 'BID' ? 'date active' : 'date'}>
                    {bid_stat_cd !== 'BID' && list.bid_reg_date.indexOf('T') !== -1 ? (
                        <span>{list.bid_reg_date.replace('T', ' ').replace(/\..*/, '').split(' ')[1]}</span>
                    ) : (
                        <span>{list.bid_reg_date}</span>
                    )}

                    {list.paddle_num === `#${my_paddle_num.toString()}` && <MyBid>My Bid</MyBid>}
                </p>
            </ListWrap>
        </>
    );
};

export default BiddingItemForm;
