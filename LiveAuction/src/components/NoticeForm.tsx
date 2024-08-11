import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import popClose from '../assets/img/icon_pop_close.png';
import refreshBtnPC from '../assets/img/icon_refresh_pc.png';
import refreshBtnMO from '../assets/img/icon_refresh_mo.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { loadNoticeRequest } from '../actions/auction';

const Wrapper = styled.div`
  @media all and (max-width: 580px) {
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    display: none;
  }

  > div{
    overflow: hidden;
    padding: 24px 24px 32px;
    background: #FFFFFF;
    border-radius: 0 0 6px 6px;
    transform: translateY(-4px);

    @media all and (max-width: 580px) {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 2.86rem 2.86rem 0;
      width: 51.43rem;
      border-radius: 10px;
    }
  }

  .notice-form-top {
    @media all and (max-width: 580px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.86rem;
    }

    .pop-close{
      display: none;

      @media all and (max-width: 580px) {
        display: block;

        img{
          width: 4.48rem;
        }
      }
    }

    > span {
      display: flex;
      align-items: center;
      flex-direction: row;
      font-size: 18px;
      color: #0F1F6A;
      margin-bottom: 5px;
      font-family: Inter;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.36px;


      @media all and (max-width: 580px) {
        color: #000;
        font-size: 3.05rem;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: -0.48px;
        margin-bottom: 0;
        width: calc(100% - 4.58rem);
        width: -webkit-calc(100% - 4.58rem);
        width: -moz-calc(100% - 4.58rem);
        width: -o-calc(100% - 4.58rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 3.04rem;
      }
    }

    .refresh-btn{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      border: 1px solid #D7D7D7;
      margin-left: 8px;
      background: url(${refreshBtnPC})no-repeat center;
      background-size: 16px;
      transition: all 0.5s;

      @media all and (max-width: 580px) {
        background: url(${refreshBtnMO})no-repeat center;
        background-size: cover;
        border: none;
      }
    }
  }

  .notice-form-bottom {
    overflow-y: auto;

    @media all and (max-width: 580px) {
      max-height: 60.2rem;
    }
  }
`;

const NoticeListWrap = styled.ul`
  > li {
    display: flex;
    aligin-items: flex-start;
    align-items: baseline;

    @media all and (max-width: 580px) {
      border-radius: 4px;
      background: #F9F9F9;
      padding: 1.91rem;
      margin-bottom: 1.53rem;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 18px;

      @media all and (max-width: 580px) {
        display: none;
      }

      > span {
        font-size: 12px;
        color: #6a6a6a;
      }
    }

    > p {
      font-size: 16px;
      line-height: 26px;
      color: #6A6A6A;
      font-family: "Noto Sans KR";
      font-weight: 400;
      letter-spacing: -0.48px;

      @media all and (max-width: 1200px) {
        font-size: 14px;
      }

      @media all and (max-width: 580px) {
        color: #4E4E4E;
        font-size: 2.7rem;
        line-height: 3.5rem;
        letter-spacing: -0.42px;
      }

    }
  }
`;

const NoticeForm = () => {
  const dispatch = useDispatch();
  const { noticeCnt, auc_kind, auc_num } = useSelector((state: RootState) => state.auction);

  const autoScroll = () => {
    document.body.classList.remove('no-scroll')
  }

  const noticeWrapRef = useRef<HTMLDivElement>(null);
  const handleOnClose = () => {
    noticeWrapRef.current.style.display = 'none';

    autoScroll();
  };

  const handleOnBackground = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleOnClose();

      autoScroll();
    }
  }

  const [rotationAngle, setRotationAngle] = useState(0);
  const handleOnRefresh = (event: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>) => {
    const newRotationAngle = rotationAngle + 360;
    setRotationAngle(newRotationAngle);

    event.preventDefault();
    dispatch(
      loadNoticeRequest({ auc_kind, auc_num }),
    );
  }

  return (
    <>
      <Wrapper className='notice-wrap' onClick={handleOnBackground} ref={noticeWrapRef}>
        <div>
          <div className="notice-form-top">
            <span>
              <FormattedMessage id="Notice" />
              <a href="#" className='refresh-btn' style={{ transform: `rotate(${rotationAngle}deg)` }} onClick={handleOnRefresh}></a>
            </span>
            <a href="#" className='pop-close' onClick={handleOnClose}><img src={popClose} /></a>
          </div>

          <div className="notice-form-bottom">
            <NoticeListWrap>
              {noticeCnt?.map((cnt) => (
                <li key={cnt.noti_sort_num}>
                  <div>
                    <span>•</span>
                  </div>
                  <p>{cnt.noti_memo}</p>
                </li>
              ))}
            </NoticeListWrap>
          </div>
        </div>

      </Wrapper>
    </>
  );
};

export default NoticeForm;
