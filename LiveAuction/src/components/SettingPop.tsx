import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { IModalProps } from '../hooks/useModal';
import { useNavigate } from 'react-router-dom';

interface Props {
  handleLanguageChange: (value: string) => void;
  handleCurrencyChange: (value: string) => void;
}

const currencyOptions = ['KRW', 'USD', 'JPY', 'HKD', 'CNY', 'EUR'];

const SettingPop: React.FC<IModalProps<Props>> = ({ handleLanguageChange, handleCurrencyChange, close }) => {
  const { currency, language } = useSelector((state: RootState) => state.auction);
  const currentLanguage = language ?? 'ko';
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const currentCurrency = currency ?? 'KRW';
  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency);
  const nav = useNavigate();

  const handleConfirmClick = () => {
    if (currentLanguage !== selectedLanguage) {
      handleLanguageChange(selectedLanguage);
    }
    if (currentCurrency !== selectedCurrency) {
      handleCurrencyChange(selectedCurrency);
    }

    close();
  };

  return (
    <SettingPopWrapper>
      <div className="mo-setting-wrap">
        <h3>
          <FormattedMessage id="설정" />
        </h3>
        <a className="pop-save" onClick={handleConfirmClick}>
          <FormattedMessage id="확인" />
        </a>
        <div className="setting-popup-data">
          <div>
            <span className="txt">
              <FormattedMessage id="언어" />
            </span>
            <ul className="lang-wrap">
              <li>
                <FormattedMessage id="한국어" />
                <input
                  type="radio"
                  name="language"
                  value="ko"
                  checked={selectedLanguage === 'ko'}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
              </li>
              <li>
                English
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={selectedLanguage === 'en'}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
              </li>
            </ul>
          </div>

          <div>
            <span className="txt">
              <FormattedMessage id="통화" />{' '}
            </span>
            <ul className="currency-wrap">
              {currencyOptions.map((currencyOption) => (
                <li key={currencyOption} className={currencyOption === selectedCurrency ? 'on' : ''}>
                  {currencyOption}
                  <input
                    type="radio"
                    name="currency"
                    value={currencyOption}
                    checked={selectedCurrency === currencyOption}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <p>
            <FormattedMessage id="통화 관련 안내문구. 통화변경은 편의를 위해 제공되며 최종 결제 가격은 KRW를 따릅니다." />
          </p>
          <button className="logout-btn" onClick={() => (location.href = '/Member/Logout?redirect=/')}>
            <FormattedMessage id="로그아웃" />
          </button>
        </div>
      </div>
    </SettingPopWrapper>
  );
};

export default SettingPop;

const SettingPopWrapper = styled.div`
  .mo-setting-wrap {
    display: block;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #edeff0;
    z-index: 7;

    @media all and (max-width: 840px) {
      z-index: 401;
    }

    h3 {
      text-align: center;
      color: #252525;
      font-weight: 700;
      letter-spacing: -0.54px;
      background: #fff;
      font-size: 25px;
      padding: 15px 0;

      @media all and (max-width: 580px) {
        padding: 2.67rem 0 2rem;
        font-size: 3.43rem;
      }
    }

    .pop-save {
      position: absolute;
      color: #f76e33;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
      top: 16px;
      right: 20px;
      font-size: 20px;

      @media all and (max-width: 580px) {
        top: 3.24rem;
        right: 2.67rem;
        font-size: 3.05rem;
      }
    }

    .setting-popup-data {
      position: relative;
      height: calc(100% - 160px);
      height: -webkit-calc(100% - 160px);
      height: -moz-calc(100% - 160px);
      height: -o-calc(100% - 160px);
      overflow: auto;

      @media all and (max-width: 840px) {
        height: calc(100% - 68px);
        height: -webkit-calc(100% - 68px);
        height: -moz-calc(100% - 68px);
        height: -o-calc(100% - 68px);
        padding-bottom: 20px;
      }

      @media all and (max-width: 580px) {
        height: calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: -moz-calc(100% - 80px);
        height: -o-calc(100% - 80px);
      }

      > div {
        padding: 0 20px;

        @media all and (max-width: 580px) {
          padding: 0 2.29rem;
        }

        .txt {
          display: block;
          color: #000;
          opacity: 0.5;
          line-height: 22px;
          letter-spacing: -0.408px;
          font-size: 18px;
          padding: 15px 0;

          @media all and (max-width: 580px) {
            font-size: 2.7rem;
            padding: 3.24rem 3.81rem 1.15rem;
          }
        }

        .lang-wrap,
        .currency-wrap {
          background: #fff;
          border-radius: 4px;

          li {
            border-bottom: 1px solid #eaeaea;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            color: #252525;
            font-size: 16px;
            line-height: 19.2px;
            letter-spacing: -0.48px;
            padding: 15px 20px;

            @media all and (max-width: 580px) {
              padding: 2.1rem 3.81rem 2.7rem;
              font-size: 3.05rem;
            }

            input {
              appearance: none;
              width: 24px;
              height: 24px;
              border-radius: 100%;
              border: 2px solid #c1c1c1;
              background: none;

              @media all and (max-width: 580px) {
                width: 3.81rem;
                height: 3.81rem;
              }

              &:checked {
                border: 5px solid #f76e33;
              }
            }

            &.on {
              input {
                border: 5px solid #f76e33;
              }
            }

            &::last-child {
              border-bottom: none;
            }
          }
        }
      }

      p {
        color: #000;
        font-weight: 400;
        line-height: 1.28;
        letter-spacing: -0.408px;
        opacity: 0.5;
        font-size: 16px;
        margin-top: 10px;
        padding: 0 20px;

        @media all and (max-width: 580px) {
          font-size: 2.7rem;
          padding: 0 6.1rem;
          margin-top: 1.15rem;
        }
      }

      .logout-btn {
        border-radius: 5px;
        background: #fff;
        color: #868686;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        line-height: normal;
        width: 130px;
        height: 60px;
        display: block;
        margin: 40px auto 0;

        @media all and (max-width: 580px) {
          font-size: 2.7rem;
          width: 20.77rem;
          height: 5.91rem;
          margin: 60px auto 0;
        }
      }
    }
  }
`;
