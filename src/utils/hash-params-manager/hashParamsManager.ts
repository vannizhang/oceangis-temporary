import { urlFns } from 'helper-toolkit-ts';

export type HashParamKey = 'itemId' | 'groupId' | '@' | 'mapOnly';

type HashParams = Record<HashParamKey, string>;

export type MapCenterLocation = {
    lon: number;
    lat: number;
    zoom: number;
};

const defaultHashParams: HashParams = urlFns.parseHash();

export const getValueFromHashParams = (key: HashParamKey) => {
    if (key === '@') {
        return getMapLocationFromHash();
    }

    return defaultHashParams[key] || null;
};

export const updateItemIdInHash = (itemId: string): void => {
    const key: HashParamKey = 'itemId';

    if (!itemId) {
        return;
    }

    urlFns.updateHashParam({
        key,
        value: itemId,
    });
};

export const updateMapLocationInHash = (
    mapCenterLocation: MapCenterLocation
): void => {
    const key: HashParamKey = '@';

    if (!mapCenterLocation) {
        return;
    }

    const { lon, lat, zoom } = mapCenterLocation;

    urlFns.updateHashParam({
        key,
        value: `${lon},${lat},${zoom}`,
    });
};

export const getMapLocationFromHash = (): MapCenterLocation => {
    const key: HashParamKey = '@';

    if (!defaultHashParams[key]) {
        return null;
    }

    const values: number[] = defaultHashParams[key]
        .split(',')
        .map((d: string) => +d);

    const [lon, lat, zoom] = values;

    return { lon, lat, zoom };
};
