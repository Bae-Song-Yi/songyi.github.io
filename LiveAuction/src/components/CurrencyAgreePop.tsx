import React, { useState } from 'react';
import styled from 'styled-components';
import popCloseIconImage from '../assets/img/icon_pop_close.png';
import checkIconImage from '../assets/img/icon_check.png';
import { FormattedMessage } from 'react-intl';
import { currencyRequest } from '../actions/auction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { IModalProps } from '../hooks/useModal';

interface Props {
  currencyState: string;
  setCurrencyState: (currency: string) => void;
}

const CurrencyAgreePop: React.FC<IModalProps<Props>> = ({ currencyState, setCurrencyState, close }) => {
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.auction);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const handlePopClose = () => {
    close();
    setCurrencyState(currency ?? 'KRW');
  };

  const handleSubmitCurrency = () => {
    dispatch(currencyRequest(currencyState ?? 'KRW'));
    close();
  };

  const handleCheck = () => {
    setChecked(!checked);
    setSubmitDisabled(!submitDisabled);
  };

  return (
    <ReadWrapper>
      <div className="currency-agree-pop open">
        <div className="currency-agree-data">
          <h3>
            <FormattedMessage id="PleaseRead" />
          </h3>
          <button className="pop-close" onClick={handlePopClose}>
            <img alt="pop close" src={popCloseIconImage} />
          </button>
          <p>
            <FormattedMessage id="ChkCurrencyAgree" />
          </p>
          <div className="check-box">
            <input type="checkbox" id="chkCurrencyAgree" checked={checked} onChange={handleCheck} />
            <label htmlFor="chkCurrencyAgree">
              <FormattedMessage id="ChkCurrencyMsg" />
            </label>
          </div>
          <div className="btn-area">
            <button type="button" className="cancel-btn" onClick={handlePopClose}>
              <FormattedMessage id="Btn.CANCEL" />
            </button>
            <button type="button" className="ok-btn" disabled={submitDisabled} onClick={handleSubmitCurrency}>
              <FormattedMessage id="확인" />
            </button>
          </div>
        </div>
        <div className="overlay" onClick={handlePopClose}></div>
      </div>
    </ReadWrapper>
  );
};

export default CurrencyAgreePop;

const ReadWrapper = styled.div`
  .currency-agree-pop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 7;
    display: none;

    &.open {
      display: block;
    }

    .currency-agree-data {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 560px;
      width: 90%;
      border-radius: 5px;
      background: #fff;
      padding: 20px 30px 30px;
    }

    h3 {
      color: #252525;
      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 22px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.66px;
      margin-bottom: 24px;
    }

    .pop-close {
      width: 24px;
      position: absolute;
      right: 30px;
      top: 23px;

      img {
        width: 100%;
      }
    }

    p {
      color: #252525;
      font-family: 'Noto Sans KR';
      font-size: 14px;
      line-height: 24px;
      letter-spacing: -0.42px;
      margin-bottom: 20px;
    }

    .check-box {
      display: flex;
      align-items: center;

      input {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 1.111px;
        border: 1.5px solid #c1c1c1;
        position: relative;
        background: none;
        cursor: pointer;

        &:checked::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #000;
          background: url(${checkIconImage}) no-repeat center;
          outline: none;
          background-size: 18px;
        }
      }
    }

    label {
      color: #252525;
      font-family: 'Noto Sans KR';
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.48px;
      margin-left: 12px;
      cursor: pointer;
    }
  }

  .btn-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;

    button {
      border-radius: 4px;
      height: 56px;
      line-height: 56px;
      width: 49%;
      text-align: center;
      font-family: 'Noto Sans KR';
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.48px;
    }

    .cancel-btn {
      color: #101b4d;
      border: 1px solid #101b4d;
      background: #fff;
    }

    .ok-btn {
      background: #101b4d;
      color: #fff;
    }

    .ok-btn:disabled {
      background: #c1c1c1;
      color: #fff;
      cursor: not-allowed;
    }
  }

  .overlay {
    display: block;
    z-index: -1;
  }
`;
