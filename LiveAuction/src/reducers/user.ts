/* eslint-disable no-param-reassign */
import produce from 'immer';
import { MyBidInfoResType } from '../type';
import { ActionRequest } from '../actions/user';

// 내응찰내역조회
export const GET_MYBID_REQUEST = 'user/GET_MYBID_REQUEST' as const;
export const GET_MYBID_SUCCESS = 'user/GET_MYBID_SUCCESS' as const;
export const GET_MYBID_FAILURE = 'user/GET_MYBID_FAILURE' as const;

export interface AuctionState {
  getMyBidLoading: boolean;
  myBids: MyBidInfoResType[] | null; // 경매 작품 리스트
  getMyBidError: String | null; // 경매 스케쥴 조회
}

export const initialState: AuctionState = {
  getMyBidLoading: false,
  myBids: null,
  getMyBidError: null,
};

const reducer = (state = initialState, action: ActionRequest) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MYBID_REQUEST:
        draft.getMyBidLoading = true;
        draft.getMyBidError = null;
        break;
      case GET_MYBID_SUCCESS:
        draft.getMyBidLoading = false;
        draft.myBids = action.data;
        draft.getMyBidError = null;
        break;
      case GET_MYBID_FAILURE:
        draft.getMyBidLoading = false;
        draft.getMyBidError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
