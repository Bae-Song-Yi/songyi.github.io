import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { Modal, Select } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import palette from '../../styles/palette';
import { RootState } from '../../reducers';
import logoImage from '../../assets/img/logo.png';
import dropMenuBid from '../../assets/img/icon_dropmenu01.png';
import dropMenuWishList from '../../assets/img/icon_dropmenu02.png';
import dropMenuSetting from '../../assets/img/icon_dropmenu03.png';
import SettingPop from '../SettingPop';
import MyBidListPop from '../MyBidListPop';
import CurrencyAgreePop from '../CurrencyAgreePop';
import noticeAlarm from '../../assets/img/icon_alarm.png';
import noticeAlarmOn from '../../assets/img/icon_alarm_on.png';
import { currencyRequest, setLanguageRequest } from '../../actions/auction';
import { useModal } from '../../hooks/useModal';

interface Props {
  langOptions: { opt_name: string; value: string }[];
}

const Header = (props: { showWishPop: any }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { formatMessage } = useIntl();
  const { noticeCnt, currency, language, auc_num } = useSelector((state: RootState) => state.auction);

  const returnUrl = `${process.env.PUBLIC_REDIRECT_URL}/${auc_num}`;
  const scheduleCnt = useSelector((state: RootState) => state.auction.scheduleCnt);

  const langOptions: Props['langOptions'] | undefined = [
    {
      opt_name: 'KOR',
      value: 'ko',
    },
    {
      opt_name: 'ENG',
      value: 'en',
    },
  ];

  const handleLanguageChange = (value: string) => {
    const langOption = langOptions.find((o) => o.value === value);
    dispatch(setLanguageRequest(langOption?.value ?? 'ko'));
    location.href = `/Home/SetLanguage?culture=${langOption.value}&returnUrl=${returnUrl}`;
  };

  const currencyAgreeModal = useModal();
  const [currencyState, setCurrencyState] = useState<string>(currency ?? 'KRW');

  const handleCurrencyState = useCallback((currency: string) => {
    setCurrencyState(currency);
  }, []);

  const handleCurrencyChange = useCallback((currencyState: string) => {
    setCurrencyState(currencyState);

    if (currencyState !== currency) {
      if (currencyState === 'KRW') {
        dispatch(currencyRequest(currencyState ?? 'KRW'));
      } else {
        currencyAgreeModal.open();
      }
    }
  }, []);

  const logoutModal = useModal();

  const handleOnLogoutOk = useCallback(() => {
    logoutModal.open();
    location.href = '/Member/Logout?redirect=/';
    alert(formatMessage({ id: 'EtcMsg.Mdl_Logout_End' }));
  }, []);

  const handleOnLogoutCancel = useCallback(() => {
    logoutModal.close();
  }, []);

  const moSetRef = useRef(null);
  const overlayRef = useRef(null);

  const hiddenScroll = () => {
    document.body.classList.add('no-scroll')
  }

  const autoScroll = () => {
    document.body.classList.remove('no-scroll')
  }

  // MO 메뉴 (패들 드롭박스)
  const showDropBox = () => {
    moSetRef.current.style.display = 'block';
    overlayRef.current.style.display = 'block';
    hiddenScroll();
  };

  // MO 메뉴 Hide
  const menuClose = () => {
    hideMobileDropbox();
    autoScroll();
  };

  // 내응찰내역 Show
  const myBidModal = useModal();

  const showMyBid = () => {
    hideMobileDropbox();
    myBidModal.open();
  };

  // MO 위시리스트 Show
  const showWishlist = () => {
    hideMobileDropbox();
    props.showWishPop();
  };

  const settingModal = useModal();

  // MO 설정 Show
  const handleOnShowSettingPop = () => {
    hideMobileDropbox();
    settingModal.open();
  };

  const closeSettingPop = useCallback(() => {
    settingModal.close();
  }, []);

  const hideMobileDropbox = () => {
    moSetRef.current.style.display = 'none';
    overlayRef.current.style.display = 'none';

    autoScroll();
  };

  const [badgeClass, setBadgeClass] = useState('show-badge');

  useEffect(() => {
    setBadgeClass('show-badge');
  }, [noticeCnt]);

  const handleOnResizeNoticePop = useCallback(() => {
    const screenWidth = window.innerWidth;
    const noticeAlarmPop = document.querySelector('.notice-wrap') as HTMLElement;
    if (screenWidth > 581) {
      noticeAlarmPop.style.display = 'block';
    } else {
      noticeAlarmPop.style.display = 'none';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleOnResizeNoticePop);
  });

  const handleNoticeAlarmClick = () => {
    const noticeAlarmPop = document.querySelector('.notice-wrap') as HTMLElement;
    noticeAlarmPop.style.display = 'block';
    setBadgeClass('hide-badge');

    hiddenScroll();

    return () => {
      window.removeEventListener('resize', handleOnResizeNoticePop);
    };
  };

  return (
    <>
      <Global />
      <ModalWrapper
        title={formatMessage({ id: 'Popup_Notice' })}
        visible={logoutModal.isOpen}
        onOk={handleOnLogoutOk}
        onCancel={handleOnLogoutCancel}
        centered
        width={350}
      >
        <p>
          <FormattedMessage id="EtcMsg.Mdl_Logout" />
        </p>
        <div className="btn_wrap">
          <button onClick={handleOnLogoutCancel} className="cancel">
            <FormattedMessage id="Btn.CANCEL" />
          </button>
          <button onClick={handleOnLogoutOk} className="confirm">
            <FormattedMessage id="확인" />
          </button>
        </div>
      </ModalWrapper>

      <Wrapper>
        <div className="row">
          <LogoWrap>
            <Link to="/">
              <img src={logoImage} alt="로고" />
            </Link>
            <span>{scheduleCnt?.auc_title}</span>
          </LogoWrap>

          <UtilMenuWrap>
            <Select
              className="lang-select"
              defaultValue={language}
              style={{ width: 40 }}
              bordered={false}
              onChange={handleLanguageChange}
            >
              <Option value="ko">KOR</Option>
              <Option value="en">ENG</Option>
            </Select>

            <Select
              className="currency-select"
              defaultValue={currency ?? 'KRW'}
              style={{ width: 40 }}
              bordered={false}
              value={currencyState}
              onChange={handleCurrencyChange}
            >
              <Option value="KRW">KRW</Option>
              <Option value="USD">USD</Option>
              <Option value="JPY">JPY</Option>
              <Option value="HKD">HKD</Option>
              <Option value="CNY">CNY</Option>
              <Option value="EUR">EUR</Option>
            </Select>

            <div className="alarm">
              <button className={`notice-alarm ${badgeClass}`} onClick={handleNoticeAlarmClick} />
            </div>

            <div className="paddle_no_wrap">
              {scheduleCnt?.my_paddle_num ? (
                <>
                  <span className="paddle_num" onClick={showMyBid}>
                    <FormattedMessage id="MyPaddleNum" />
                  </span>
                  <strong onClick={showDropBox}>{scheduleCnt?.my_paddle_num}</strong>
                </>
              ) : (
                <span className="guest" onClick={showDropBox}>
                  GUEST
                </span>
              )}

              <ul className="mo-dropbox" ref={moSetRef}>
                <li>
                  <a href="#" onClick={showMyBid}>
                    <FormattedMessage id="내 응찰내역" /> <img alt="내 응찰내역" src={dropMenuBid} />
                  </a>
                </li>
                <li>
                  <a href="#" onClick={showWishlist}>
                    <FormattedMessage id="위시리스트" /> <img alt="위시리스트" src={dropMenuWishList} />
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleOnShowSettingPop}>
                    <FormattedMessage id="설정" /> <img alt="설정" src={dropMenuSetting} />
                  </a>
                </li>
              </ul>
              <div className="overlay" ref={overlayRef} onClick={menuClose} />
            </div>

            <button onClick={logoutModal.open}>
              <FormattedMessage id="LOG_OUT" />
            </button>
          </UtilMenuWrap>
        </div>

        {/* MO 내 응찰내역 */}
        {myBidModal.isOpen && <MyBidListPop close={myBidModal.close} />}
        {/* //MO 내 응찰내역 */}

        {/* MO 설정 */}
        {settingModal.isOpen && (
          <SettingPop
            handleCurrencyChange={handleCurrencyChange}
            handleLanguageChange={handleLanguageChange}
            close={closeSettingPop}
          />
        )}
        {/* //MO 설정 */}

        {/* 통화 전환 팝업 */}
        {currencyAgreeModal.isOpen && (
          <CurrencyAgreePop
            currencyState={currencyState}
            setCurrencyState={handleCurrencyState}
            close={currencyAgreeModal.close}
          ></CurrencyAgreePop>
        )}
        {/* //통화 전환 팝업 */}
      </Wrapper>
    </>
  );
};

export default Header;

const { Option } = Select;

const Wrapper = styled.div`
  position: relative;
  height: 60px;
  border: 1px solid ${palette.gray[1]};
  background-color: #fff;

  @media all and (max-width: 640px) {
    height: 8.39rem;
    border: none;
  }

  > div {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media all and (max-width: 640px) {
      padding: 0px 5.36%;
    }
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;

  > a {
    font-size: 0;

    > img {
      width: 24px;

      @media all and (max-width: 640px) {
        width: 3.81rem;
      }
    }
  }

  > span {
    color: #000;
    margin-left: 16px;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.54px;
    font-family: 'Noto Sans KR';

    @media all and (max-width: 640px) {
      font-size: 18px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.48px;
      margin-left: 5px;
    }

    @media all and (max-width: 580px) {
      margin-left: 1.905rem;
      font-size: 3.1rem;
    }
  }
`;

const UtilMenuWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${palette.gray[6]};

  > a {
    margin-right: 15px;
  }

  .notice-alarm {
    display: none;

    @media all and (max-width: 580px) {
      display: block;
      position: relative;
      margin-right: 2.8rem;
      width: 4.573rem;
      height: 4.573rem;
      background: url(${noticeAlarm}) no-repeat center;
      background-size: cover;

      &.show-badge {
        background: url(${noticeAlarmOn}) no-repeat center;
        background-size: cover;
      }
    }
  }

  .notice-alarm.show-badge::before {
    display: block;
  }

  .notice-alarm.hide-badge::before {
    display: none;
  }

  > div.paddle_no_wrap {
    margin-right: 15px;
    padding-left: 17px;
    position: relative;
    margin-left: 3.5px;
    display: flex;
    align-items: center;

    @media all and (max-width: 640px) {
      margin-right: 0;
      padding-left: 0;
      margin-left: 0;
      display: block;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 13px;
      width: 1px;
      background: #c1c1c1;

      @media all and (max-width: 640px) {
        display: none;
      }
    }

    .paddle_num {
      cursor: pointer;

      @media all and (max-width: 640px) {
        display: none;
      }
    }

    > span.guest {
      display: inline-block;
      background: #c1c1c1;
      width: 48px;
      height: 26px;
      line-height: 26px;
      border-radius: 26px;
      text-align: center;
      font-weight: 500;
      font-size: 12px;
      color: #fff;
      cursor: pointer;

      @media all and (max-width: 640px) {
        width: 9.145rem;
        height: 4.96rem;
        line-height: 4.96rem;
        font-size: 2.29rem;
        cursor: pointer;
        pointer-events: auto;
      }
    }

    > strong {
      display: inline-block;
      width: 32px;
      line-height: 32px;
      border-radius: 100%;
      background: #273150;
      text-align: center;
      margin-left: 15px;
      color: #f9f9f9;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.42px;
      cursor: pointer;

      @media all and (max-width: 640px) {
        cursor: pointer;
        pointer-events: auto;
      }

      @media all and (max-width: 640px) {
        width: 5.72rem;
        line-height: 5.72rem;
        margin-left: 0;
        font-size: 2.67rem;
      }
    }

    .mo-dropbox {
      display: none;
      position: absolute;
      top: 30px;
      right: 0;
      width: 170px;
      z-index: 8;
      margin-top: 15px;

      a {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.95);
        height: 46px;
        line-height: 46px;
        color: #101b4d;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.54px;
        padding: 0 20px;
        margin-bottom: 2px;

        img {
          width: 15px;

          @media all and (max-width: 640px) {
            width: 20px;
          }
        }
      }

      @media all and (max-width: 640px) {
        width: 235px;
        z-index: 402;
        top: 50px;

        a {
          height: 56px;
          line-height: 56px;
          font-size: 18px;
        }
      }

      @media all and (max-width: 580px) {
        top: 4.2rem;
      }
    }
  }

  > button {
    padding: 0 12px;
    height: 22px;
    color: ${palette.gray[6]};
    font-size: 12px;
    border: 1px solid ${palette.gray[3]};
    border-radius: 4px;

    @media all and (max-width: 640px) {
      display: none;
    }
  }
`;

const ModalWrapper = styled(Modal)`
  .ant-modal {
    max-width: 350px;
  }
  .ant-modal-close {
    display: none;
  }
  .ant-modal-header {
    text-align: center;
  }
  .ant-modal-title {
    font-weight: 600;
  }
  .ant-modal-body {
    height: auto !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;

    > p {
      color: #000;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.48px;
      padding: 41px 0;
    }
  }
  .ant-modal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    > .ant-modal {
      padding-bottom: 0 !important;
    }
  }
  .ant-modal {
    padding-bottom: 0;
  }
  .btn_wrap {
    width: 100%;
    display: flex;
    align-items: flex-start;

    > button {
      width: 50%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -1px;

      &.cancel {
        color: #000;
        background-color: #c1c1c1;
      }

      &.confirm {
        background: #101b4d;
      }
    }
  }
`;

const Global = createGlobalStyle`
      .ant-dropdown-menu {
          padding: 0;
      }
      .ant-dropdown-menu-title-content {
          line-height: 1em;
      }
      .ant-dropdown-menu-title-content > a {
          font-size: 12px;
      }
      .ant-dropdown-trigger {
          position:relative;
          width: 50px;
      }
      .ant-space > div {
          color: ${palette.gray[6]};
      }
      .ant-space > div:last-child {
          position: absolute;
          top: 50%; right:0px;
          transform: translateY(-50%);
      }
  
      .ant-select:not(.ant-select-customize-input) .ant-select-selector {
          height: auto;
          padding: 0;
      }
  
      .ant-select-selection-item {
          padding-right: 0 !important;
          font-size: 12px;
      }
      
      .ant-select.ant-select-borderless.ant-select-single.ant-select-show-arrow{
          margin-right: 11.5px;
  
      }
  
      .ant-select.ant-select-borderless.ant-select-single span{
        color: #6A6A6A;
        margin-left: -3.5px;
        
      }
  
      .ant-select-arrow {
          right: 0;
          top: 52%
      }
  
      .ant-select-item {
        padding: 10px 6px;
        font-size: 12px;
  
      }
      .ant-select-dropdown {
        padding: 0;
        background: #FFFFFF;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
  
      }
      .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
        background: #fff;
      }
  
      .ant-select-item-option-selected.ant-select-item-option-active {
        background-color: #f5f5f5;
      }
  
      .ant-select-item-option-content{
        color: #868686;
  
      }
  
      .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-content{
        color: #F76E33;
      }
  
      .ant-select{
        @media all and (max-width: 640px) {
          display: none;
        }
      }
  
      .overlay{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.3);
        z-index: 7;
        display: none;
  
        @media all and (max-width: 640px) {
          z-index: 401;
        }
      }
`;
