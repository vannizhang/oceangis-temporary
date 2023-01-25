import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ActiveMapSwitcher from './ActiveMapSwitcher';

import { activeWebmapSelector } from '../../store/reducers/Map';

interface Props {
    isMinimal: boolean;
}

const ActiveMapSwitcherContainer: React.FC<Props> = ({ isMinimal }: Props) => {
    // const dispatch = useDispatch();

    const activeWebmapItem = useSelector(activeWebmapSelector);

    return (
        <ActiveMapSwitcher
            isMinimal={isMinimal}
            activeItemId={activeWebmapItem?.id}
            activeItemTitle={activeWebmapItem?.title}
        />
    );
};

export default ActiveMapSwitcherContainer;
