import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import ShareDialog from './ShareDialog';

import { HashParamKey } from '../../utils/hash-params-manager/hashParamsManager';

export type SupportedSocialMedia = 'twitter' | 'facebook';

interface Props {
    onClose?: () => void;
}

const ShareDialogContainer: React.FC<Props> = ({ onClose }: Props) => {
    // const dispatch = useDispatch();

    const [shareDialogURL, setShareDialogURL] = React.useState<string>();

    const shareToSocialMedia = (name: SupportedSocialMedia) => {
        const socialmediaLookUp = {
            twitter: 'tw',
            facebook: 'fb',
        };

        const socialMedia = socialmediaLookUp[name];

        const text = 'Checkout this map';

        const urlToOpen = `https://www.arcgis.com/home/socialnetwork.html?t=${text}&n=${socialMedia}&u=${shareDialogURL}&h=policymaps`;

        window.open(urlToOpen);
    };

    const updateURL4ShareDialog = () => {
        const mapOnlyHashParamKey: HashParamKey = 'mapOnly';
        const newShareURL = window.location.href + `&${mapOnlyHashParamKey}=1`;
        setShareDialogURL(newShareURL);
    };

    useEffect(() => {
        window.onhashchange = () => {
            updateURL4ShareDialog();
        };

        updateURL4ShareDialog();
    }, []);

    return (
        <ShareDialog
            currentUrl={shareDialogURL}
            onClose={onClose}
            shareToSocialMediaOnClick={shareToSocialMedia}
        />
    );
};

export default ShareDialogContainer;
