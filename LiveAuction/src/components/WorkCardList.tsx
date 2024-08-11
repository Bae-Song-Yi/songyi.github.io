import React from 'react';
import WorkCard from '../components/WorkCard';
import { AucStateResType, AuctionWorkResponse } from '../type';

interface prop {
    artType: number,
    isArtListVisible: boolean,
    workList: AuctionWorkResponse[] | null,
    currentLotStat: AucStateResType,
    currentLotStyle: string,
};

const WorkCardList = ({ artType, isArtListVisible, workList, currentLotStat, currentLotStyle }: prop) => {
    return (
        isArtListVisible && (
            <div>
                {workList.map((auctionWork) => {
                    return (
                        auctionWork?.t_seq === artType && (
                            <WorkCard
                                key={auctionWork.lot_num}
                                auctionWork={auctionWork}
                                className={currentLotStat.lot_num === auctionWork.lot_num ? currentLotStyle : ''}
                                id={`lot${auctionWork.lot_num.toString()}`}
                                currentLotStat={currentLotStat}
                            />
                        )
                    );
                })}
            </div>
        )
    );
};

export default WorkCardList;