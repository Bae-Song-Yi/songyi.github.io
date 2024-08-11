// 공지사항 조회

export const LOAD_NOTICE_REQUEST = 'auction/LOAD_NOTICE_REQUEST' as const;
export const LOAD_NOTICE_SUCCESS = 'auction/LOAD_NOTICE_SUCCESS' as const;
export const LOAD_NOTICE_FAILURE = 'auction/LOAD_NOTICE_FAILURE' as const;
// 경매 정보 조회

export const GET_SCHEDULE_REQUEST = 'auction/GET_SCHEDULE_REQUEST' as const;
export const GET_SCHEDULE_SUCCESS = 'auction/GET_SCHEDULE_SUCCESS' as const;
export const GET_SCHEDULE_FAILURE = 'auction/GET_SCHEDULE_FAILURE' as const;
// 현재작품조회

export const GET_CURRENTLOT_REQUEST = 'auction/GET_CURRENTLOT_REQUEST' as const;
export const GET_CURRENTLOT_SUCCESS = 'auction/GET_CURRENTLOT_SUCCESS' as const;
export const GET_CURRENTLOT_FAILURE = 'auction/GET_CURRENTLOT_FAILURE' as const;
// 응찰등록

export const BIDDING_INSERT_REQUEST = 'auction/BIDDING_INSERT_REQUEST' as const;
export const BIDDING_INSERT_SUCCESS = 'auction/BIDDING_INSERT_SUCCESS' as const;
export const BIDDING_INSERT_FAILURE = 'auction/BIDDING_INSERT_FAILURE' as const;
// 응찰내역조회

export const GET_BIDS_REQUEST = 'auction/GET_BIDS_REQUEST' as const;
export const GET_BIDS_SUCCESS = 'auction/GET_BIDS_SUCCESS' as const;
export const GET_BIDS_FAILURE = 'auction/GET_BIDS_FAILURE' as const;
// 관심작품추가하기

export const LIKE_WORK_REQUEST = 'auction/LIKE_WORK_REQUEST' as const;
export const LIKE_WORK_SUCCESS = 'auction/LIKE_WORK_SUCCESS' as const;
export const LIKE_WORK_FAILURE = 'auction/LIKE_WORK_FAILURE' as const;
// 관심작품목록가져오기

export const WISH_INFO_SELECT_REQUEST = 'auction/WISH_INFO_SELECT_REQUEST' as const;
export const WISH_INFO_SELECT_SUCCESS = 'auction/WISH_INFO_SELECT_SUCCESS' as const;
export const WISH_INFO_SELECT_FAILURE = 'auction/WISH_INFO_SELECT_FAILURE' as const;
// 통화 변경

export const CURRENCY_REQUEST = 'auction/CURRENCY_REQUEST' as const;
export const CURRENCY_SUCCESS = 'auction/CURRENCY_SUCCESS' as const;
// 응찰내역 업데이트

export const BIDS_LIST_UPDATE_REQUEST = 'auction/BIDS_LIST_UPDATE_REQUEST' as const;
export const BIDS_LIST_UPDATE_SUCCESS = 'auction/BIDS_LIST_UPDATE_SUCCESS' as const;
// 클레임 응찰내역

export const BIDS_LIST_CLAIM_REQUEST = 'auction/BIDS_LIST_CLAIM_REQUEST' as const;
export const BIDS_LIST_CLAIM_SUCCESS = 'auction/BIDS_LIST_CLAIM_SUCCESS' as const;
// 언어 설정

export const SET_LANGUAGE = 'auction/SET_LANGUAGE' as const;
