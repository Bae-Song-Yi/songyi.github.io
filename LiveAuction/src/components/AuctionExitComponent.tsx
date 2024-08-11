import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../reducers';

const AuctionExitComponent = ({ AuctionStateCode }: { AuctionStateCode: string }) => {
  // 경매 제목
  const nav = useNavigate();
  const { scheduleCnt } = useSelector((state: RootState) => state.auction);

  return (
    <AuctionExitDiv>
      <div className="auc-end">
        <div className="intro-info">
          {AuctionStateCode === 'E' && (
            <>
              <span className="open-date">{scheduleCnt?.auc_title}</span>
              <p className="text">
                <FormattedMessage id="경매가 종료되었습니다. 감사합니다." />
              </p>
            </>
          )}
          <a href='/' className="home-btn">
            <FormattedMessage id="홈으로 이동" />
          </a>
        </div>
      </div>
    </AuctionExitDiv>
  );
};

export default AuctionExitComponent;

const AuctionExitDiv = styled.div`
  .auc-end {
    .intro-info {
      height: 100%;
      padding-bottom: 0;

      .text {
        text-align: center;
        white-space: pre-line;

        @media all and (max-width: 580px) {
          font-size: 24px;
          line-height: 34px;
          letter-spacing: -0.72px;
        }
      }

      .home-btn {
        border-radius: 4px;
        background: #fff;
        padding: 5px 16px;
        width: 220px;
        height: 56px;
        color: #252525;
        text-align: center;
        font-family: 'Noto Sans KR';
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.48px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 48px;

        @media all and (max-width: 580px) {
          width: 160px;
          height: 52px;
          margin-top: 40px;
        }
      }
    }
  }
`;
