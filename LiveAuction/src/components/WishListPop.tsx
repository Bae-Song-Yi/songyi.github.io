import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { AucStateResType } from '../type';
import WorkCard from '../components/WorkCard';
import { RootState } from '../reducers';
import popCloseIconImage from '../assets/img/icon_pop_close.png';
import { getScheduleRequest } from '../actions/auction';
import { IModalProps } from '../hooks/useModal';

interface Props {
  currentLotStat: AucStateResType;
}

const WishListPop: React.FC<IModalProps<Props>> = ({ currentLotStat, close }) => {
  const dispatch = useDispatch();
  const { auc_num, auc_kind, workList, tSeq } = useSelector((state: RootState) => state.auction);
  
  const [isWishItemTSeq0, setIsWishItemTSeq0] = useState<boolean>(false);
  const [isWishItemTSeq1, setIsWishItemTSeq1] = useState<boolean>(false);


  useEffect(() => {
    dispatch(getScheduleRequest({ auc_kind, auc_num }));
  }, []);

  const handleOnClose = () => {
    close();
  };

  useEffect(() => {
    const tSeq0 = tSeq[0]?.t_seq;
    const tSeq1 = tSeq[1]?.t_seq;

    const getWishCount = (tSeqValue: number) => workList.filter((work) => work.t_seq === tSeqValue && work.isWish).length;

    const wishCountTSeq0 = getWishCount(tSeq0);
    const wishCountTSeq1 = getWishCount(tSeq1);

    setIsWishItemTSeq0(wishCountTSeq0 > 0);
    setIsWishItemTSeq1(wishCountTSeq1 > 0);
  }, [workList, tSeq]);

  return (
    <WishListPopWrapper>
      <div className="wish-popup-wrap">
        <div className="wish-popup-data">
          <h3>
            <FormattedMessage id="위시리스트" />
          </h3>
          <button className="pop-close">
            <img alt="팝업 닫기 아이콘" src={popCloseIconImage} onClick={handleOnClose} />
          </button>
          <div className="wish-list-wrap">
            {/* 근현대 위시리스트 */}
            {isWishItemTSeq0 && (
              <div className="wish-list modern-wish">
                <span className="type">
                  <FormattedMessage id="근현대" />
                </span>
                <div>
                  {workList
                    .filter((list) => list.isWish === true)
                      
                      .map((auctionWork) => {

                        return (
                          auctionWork?.t_seq === tSeq[0]?.t_seq &&  (
                            <WorkCard
                              key={auctionWork.lot_num}
                              auctionWork={auctionWork}
                              className="wish-slide"
                              id={auctionWork.lot_num.toString()}
                              currentLotStat={currentLotStat}
                            />
                          )
                        );
                      })
                    }
                </div>
              </div>
            )}
            
            {/* 한국화&고미술 위시리스트 */}
            {isWishItemTSeq1 && (
              <div className="wish-list korean-wish">
                <span className="type">
                  <FormattedMessage id="한국화&고미술" />
                </span>
                <div>
                  {workList
                    .filter((list) => list.isWish === true)
                      .map((auctionWork) => {
                        return (
                          auctionWork?.t_seq === tSeq[1]?.t_seq && (
                            <>
                              <WorkCard
                                auctionWork={auctionWork}
                                className="wish-slide"
                                id={auctionWork.lot_num.toString()}
                                currentLotStat={currentLotStat}
                              />
                            </>
                          )
                        );
                      }
                    )}
                </div>
              </div>
            )}

            {/* 한국화&고미술 위시리스트 없을경우 */}
            {!isWishItemTSeq0 && !isWishItemTSeq1 ? (
              <div className="data-none">
                <p>
                  <FormattedMessage id="내역이 없습니다" />
                </p>
              </div>
            ) : null}

          </div>
        </div>
        <div className="overlay" onClick={handleOnClose} />
      </div>
    </WishListPopWrapper>
  );
};

export default WishListPop;

const WishListPopWrapper = styled.div`
  .wish-popup-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 401;
    display: block;

    .wish-popup-data {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 788px;
      width: 96%;
      height: 500px;
      background: #f9f9f9;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 18px 10px 0 20px;

      @media all and (max-width: 840px) {
        width: 100%;
        max-width: 100%;
        height: 100%;
        border-radius: 0;
        top: 0;
        left: 0;
        transform: translate(0);
      }

      @media all and (max-width: 580px) {
        max-width: 100%;
        width: 100%;
        height: 100%;
        transform: translate(0);
        left: 0;
        top: 0;
        border-radius: 0;
        padding: 0;
      }

      h3 {
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
        letter-spacing: -0.03em;
        color: #252525;

        @media all and (max-width: 580px) {
          text-align: center;
          padding: 2.55rem 0 1.82rem;
          font-size: 3.28rem;
          background: #fff;
        }
      }

      .pop-close {
        position: absolute;
        right: 16px;
        top: 18px;
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

      .data-none {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 20px 0;
        background: #fff;
        border: 1px solid #eaeaea;
        border-radius: 10px;

        @media all and (max-width: 580px) {
          border-radius: 0;
        }

        p {
          margin-top: 0;
          text-align: center;
          color: #6a6a6a;

          @media all and (max-width: 580px) {
            font-size: 2.8rem;
          }
        }
      }

      .wish-list-wrap {
        margin-top: 23px;
        height: 433px;
        overflow: hidden;
        overflow-y: auto;
        padding-right: 10px;
        padding-bottom: 18px;

        @media all and (max-width: 840px) {
          height: calc(100% - 60px);
          height: -webkit-calc(100% - 60px);
          height: -moz-calc(100% - 60px);
          height: -o-calc(100% - 60px);
        }

        @media all and (max-width: 580px) {
          height: calc(100% - 12rem);
          height: -webkit-calc(100% - 12rem);
          height: -moz-calc(100% - 12rem);
          height: -o-calc(100% - 12rem);
          margin-top: 0.8rem;
          padding-right: 0;
          padding-bottom: 0;
          overflow-y: auto;
        }

        &::-webkit-scrollbar:vertical {
          width: 4px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.3);
        }

        &::-webkit-scrollbar-track {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }

      .wish-list {
        background: #ffffff;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        position: relative;
        margin-top: 15px;

        @media all and (max-width: 580px) {
          border-radius: 0;
          margin-top: 3rem;
        }

        &.korean-wish {
          margin-top: 34px;

          @media all and (max-width: 580px) {
            margin-top: 6.8rem;
          }
        }

        > div {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          padding: 25px 20px;

          @media all and (max-width: 580px) {
            display: block;
            padding: 0;
          }
        }

        .wish-slide {
          width: 50%;
          border-radius: 0;
          position: relative;
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 15px;
          padding-bottom: 15px;

          @media all and (max-width: 580px) {
            width: 100%;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          &::after {
            content: '';
            position: absolute;
            width: 1px;
            height: calc(100% - 15px);
            height: -webkit-calc(100% - 15px);
            height: -moz-calc(100% - 15px);
            height: -o-calc(100% - 15px);
            background: #eaeaea;
            right: 0;
            top: 0;

            @media all and (max-width: 580px) {
              display: none;
            }
          }

          &:nth-child(2n) {
            &::after {
              background: transparent;
            }

            > button {
              right: 0;

              @media all and (max-width: 580px) {
                right: 3rem;
              }
            }

            .click-info {
              right: 20px;

              @media all and (max-width: 580px) {
                right: 6rem;
              }
            }
          }

          &:hover {
            border: 1px solid transparent;
            border-bottom: 1px solid #eaeaea;
          }

          > button {
            @media all and (max-width: 580px) {
              right: 3rem;
            }
          }

          > div {
            border: 1px solid transparent;
            padding-bottom: 15px;

            @media all and (max-width: 580px) {
              padding-bottom: 3.64rem;
            }

            &:hover {
              border: 1px solid transparent;

              @media all and (max-width: 580px) {
                border: none;
              }
            }

            .img_wrap {
              @media all and (max-width: 640px) {
                width: 60px;
                height: 60px;
              }

              @media all and (max-width: 580px) {
                width: 16.37rem;
                height: 16.37rem;
                margin-right: 2.73rem;
              }
            }

            > p {
              @media all and (max-width: 640px) {
                left: 20px;
                width: calc(100% - 120px);
                width: -webkit-calc(100% - 120px);
                width: -moz-calc(100% - 120px);
                width: -o-calc(100% - 120px);
                bottom: 10px;
              }

              @media all and (max-width: 580px) {
                left: 21.83rem;
                bottom: 3.5rem;
              }
            }
          }

          .toggle-wish {
            top: 11px;

            @media all and (max-width: 580px) {
              top: 2.8rem;
            }
          }

          .click-info {
            position: absolute;
            top: 0px;
            right: 25px;
            width: auto;
            height: auto;
            background: none;
            border: none;
            padding: 0;
            display: block;

            @media all and (max-width: 580px) {
              top: 1.2rem;
              right: 6rem;
            }

            .unit {
              display: none;
            }

            .size {
              display: none;
            }

            a {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;

              @media all and (max-width: 580px) {
                width: 4.58rem;
                height: 4.58rem;

                img {
                  transform: translateY(0);
                }
              }

              span {
                display: none;
              }
            }
          }

          .cnt_wrap {
            @media all and (max-width: 840px) {
              width: calc(100% - 75px);
              width: -webkit-calc(100% - 75px);
              width: -moz-calc(100% - 75px);
              width: -o-calc(100% - 75px);
            }

            @media all and (max-width: 580px) {
              width: calc(100% - 22.53rem);
              width: -webkit-calc(100% - 22.53rem);
              width: -moz-calc(100% - 22.53rem);
              width: -o-calc(100% - 22.53rem);
            }
          }
        }

        &.odd {
          .wish-slide {
            &:nth-last-child(2) {
              border-bottom: 1px solid transparent !important;
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
              &:hover {
                border-bottom: 1px solid transparent !important;
              }
            }
          }
        }

        &.even {
          .wish-slide {
            &:nth-last-child(2) {
              border-bottom: 1px solid transparent !important;
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
              &:hover {
                border-bottom: 1px solid transparent !important;
              }
            }
            &:nth-last-child(3) {
              border-bottom: 1px solid transparent !important;
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
              &:hover {
                border-bottom: 1px solid transparent !important;
              }
            }
          }
        }

        .type {
          display: inline-block;
          position: absolute;
          left: 10px;
          top: -15px;
          font-weight: 700;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: -0.03em;
          color: #4e4e4e;
          background: #ffffff;
          border: 1px solid #c1c1c1;
          height: 30px;
          border-radius: 30px;
          padding: 0 10px;
          z-index: 1;

          @media all and (max-width: 580px) {
            left: 2rem;
            top: -3rem;
            font-size: 2.8rem;
            line-height: 4rem;
            height: 6rem;
            border-radius: 6rem;
            padding: 0 2rem;
          }
        }
      }
    }
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
