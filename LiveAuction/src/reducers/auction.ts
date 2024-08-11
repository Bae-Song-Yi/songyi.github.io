import produce from 'immer';
import equal from 'deep-equal';
import {
  AucStateResType,
  biddingInsertResType,
  bidsInfoResType,
  currentBidClaimType,
  noticeCntResType,
  tSeqResType,
  AuctionWorkResponse,
} from '../type';
import {
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE,
  GET_CURRENTLOT_SUCCESS,
  LOAD_NOTICE_REQUEST,
  LOAD_NOTICE_SUCCESS,
  LOAD_NOTICE_FAILURE,
  BIDDING_INSERT_REQUEST,
  BIDDING_INSERT_SUCCESS,
  BIDDING_INSERT_FAILURE,
  LIKE_WORK_REQUEST,
  LIKE_WORK_SUCCESS,
  LIKE_WORK_FAILURE,
  GET_BIDS_REQUEST,
  GET_BIDS_SUCCESS,
  GET_BIDS_FAILURE,
  CURRENCY_SUCCESS,
  BIDS_LIST_UPDATE_SUCCESS,
  BIDS_LIST_CLAIM_REQUEST,
  BIDS_LIST_CLAIM_SUCCESS,
  SET_LANGUAGE,
} from './auctionConsts';
import {
  ActionRequest,
  biddingInsertFailure,
  getBidsFailure,
  getScheduleFailure,
  likeWorkFailure,
  loadNoticeFailure,
} from '../actions/auction';

export interface AuctionState {
  auc_kind: number; // 경매 종류
  auc_num: number; // 경매 번호
  lotNoticeLoading: boolean;
  noticeCnt: noticeCntResType[] | null; // 공지사항
  lotNoticeError: String | null;
  getScheduleLoading: boolean;
  scheduleCnt: AucStateResType | null; // 경매 정보
  getScheduleError: string | null;
  currentLot: AucStateResType[] | null;
  workList: AuctionWorkResponse[] | null; // 경매 작품 리스트
  tSeq: tSeqResType[] | null;
  biddingInsertLoading: boolean;
  biddingInsertDone: boolean;
  biddingInsert: biddingInsertResType | null;
  biddingInsertError: String | null;
  likeWorkLoading: boolean;
  likeWorkError: String | null;
  likeWorkDone: boolean;
  getBidsLoading: boolean;
  getBidsError: string | null;
  bidsList: bidsInfoResType[] | null; // 응찰내역
  currency: string | null; // 통화
  bidListClaimLoading: boolean;
  bidListClaimDone: boolean;
  bidNoti: currentBidClaimType[] | null; // 클레임정보
  language: string;
}

export const initialState: AuctionState = {
  auc_kind: 1,
  auc_num: 0,
  lotNoticeLoading: false,
  noticeCnt: null,
  lotNoticeError: null,
  getScheduleLoading: false,
  scheduleCnt: null,
  getScheduleError: null,
  currentLot: null,
  workList: null,
  tSeq: null,
  biddingInsertLoading: false,
  biddingInsertDone: false,
  biddingInsert: null,
  biddingInsertError: null,
  likeWorkLoading: false,
  likeWorkError: null,
  likeWorkDone: false,
  getBidsLoading: false,
  getBidsError: null,
  bidsList: null,
  currency: null,
  bidListClaimLoading: false,
  bidListClaimDone: false,
  bidNoti: [],
  language: 'ko',
};

const reducer = (state = initialState, action: ActionRequest) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 경매 정보 조회
      case GET_SCHEDULE_REQUEST:
        draft.getScheduleLoading = true;
        draft.getScheduleError = null;
        break;
      case GET_SCHEDULE_SUCCESS:
        draft.getScheduleLoading = false;
        draft.scheduleCnt = action.data.data.Table[0];
        draft.workList = action.data.data.Table2;
        draft.tSeq = action.data.data.Table1;
        draft.currentLot = action.data.data.Table3;
        draft.getScheduleError = null;
        draft.auc_num = action.data.data.Table[0]?.auc_num ?? 0;
        break;
      case GET_SCHEDULE_FAILURE:
        draft.getScheduleLoading = false;
        draft.getScheduleError = (action as ReturnType<typeof getScheduleFailure>).error;
        break;
      // 현재 진행중인 랏조회
      case GET_CURRENTLOT_SUCCESS:
        draft.currentLot.pop();
        draft.currentLot.push(action.data);
        break;
      // 공지사항 조회
      case LOAD_NOTICE_REQUEST:
        draft.lotNoticeLoading = true;
        draft.lotNoticeError = null;
        break;
      case LOAD_NOTICE_SUCCESS:
        draft.lotNoticeLoading = false;
        if (!equal(draft.noticeCnt, action?.data?.data?.Table)) {
          draft.noticeCnt = action.data.data.Table;
        }
        draft.lotNoticeError = null;
        break;
      case LOAD_NOTICE_FAILURE:
        draft.lotNoticeLoading = false;
        draft.lotNoticeError = (action as ReturnType<typeof loadNoticeFailure>).error;
        break;
      // 응찰등록
      case BIDDING_INSERT_REQUEST:
        draft.biddingInsertLoading = true;
        draft.biddingInsertDone = false;
        draft.biddingInsertError = null;
        break;
      case BIDDING_INSERT_SUCCESS:
        draft.biddingInsertLoading = false;
        draft.biddingInsertDone = true;
        draft.biddingInsert = action.data;
        draft.biddingInsertError = null;
        break;
      case BIDDING_INSERT_FAILURE:
        draft.biddingInsertLoading = false;
        draft.biddingInsertError = (action as ReturnType<typeof biddingInsertFailure>).error;
        break;
      // 관심작품 목록 추가하기
      case LIKE_WORK_REQUEST:
        draft.likeWorkLoading = true;
        draft.likeWorkError = null;
        draft.likeWorkDone = false;
        break;
      case LIKE_WORK_SUCCESS:
        draft.likeWorkLoading = false;
        draft.likeWorkError = null;
        const list = draft.workList.find((v) => v.lot_num === action.data);
        const wishState = list.isWish;
        list.isWish = !wishState;
        draft.likeWorkDone = true;
        break;
      case LIKE_WORK_FAILURE:
        draft.likeWorkLoading = false;
        draft.likeWorkError = (action as ReturnType<typeof likeWorkFailure>).error;
        break;
      // 응착내역 조회
      case GET_BIDS_REQUEST:
        draft.getBidsLoading = true;
        draft.getBidsError = null;
        break;
      case GET_BIDS_SUCCESS:
        draft.getBidsLoading = false;
        draft.bidsList = action.data;
        draft.getBidsError = null;
        break;
      case GET_BIDS_FAILURE:
        draft.getBidsLoading = false;
        draft.getBidsError = (action as ReturnType<typeof getBidsFailure>).error;
        break;
      // 통화 바꾸기
      case CURRENCY_SUCCESS:
        draft.currency = action.data;
        break;
      // 응찰내역 업데이트 (5개씩 가져오는 응찰내역과 비교하여 응찰내역 업데이트 처리)
      case BIDS_LIST_UPDATE_SUCCESS:
        if (!draft.bidsList || draft.bidsList == null) {
          draft.bidsList = action.data;
        } else {
          let idx = 0;
          action.data.forEach((e: any) => {
            idx = draft.bidsList.findIndex((b) => b.bid_hst_seq === e.bid_hst_seq);

            if (idx > -1) {
              draft.bidsList[idx] = e;
            } else {
              draft.bidsList.unshift(e);
            }
          });
          draft.bidsList
            ?.sort((a, b) => {
              return a.bid_hst_seq - b.bid_hst_seq;
            })
            .reverse();
        }
        break;
      // 클레임정보 업데이트 (응찰이 취소되거나 삭제되었을 경우 업데이트 처리)
      case BIDS_LIST_CLAIM_REQUEST:
        draft.bidListClaimLoading = true;
        draft.bidListClaimDone = false;
        break;
      case BIDS_LIST_CLAIM_SUCCESS:
        action.data?.forEach((e: any) => {
          // 현재진행중인 랏의 클레임정보
          draft.currentLot[0].claim_bid_hst_seq = e.bid_hst_seq;
        });
        // 클레임정보
        draft.bidNoti = action.data;
        draft.bidListClaimLoading = false;
        draft.bidListClaimDone = true;
        break;
      case SET_LANGUAGE:
        if (action.data !== draft.language) {
          draft.language = action.data;
        }
        break;
      default:
        break;
    }
  });

export default reducer;
