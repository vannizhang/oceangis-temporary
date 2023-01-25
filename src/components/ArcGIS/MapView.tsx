import React, { useEffect } from 'react';

import { loadModules, loadCss } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IWebMap from 'esri/WebMap';
import IwatchUtils from 'esri/core/watchUtils';
import { MapCenterLocation } from '../../utils/hash-params-manager/hashParamsManager';
// import { BACKGROUND_WEB_MAP_ID } from '../../constants/ArcGIS';

import { AppContext } from '../../contexts/AppContextProvider';
loadCss();

interface Props {
    itemId: string;
    zoom?: number;
    center?: [number, number]; // [lon, lat]
    onStationary: (mapCenter: MapCenterLocation) => void;
    children?: React.ReactNode;
}

const MapView: React.FC<Props> = ({
    zoom,
    center,
    itemId,
    onStationary,
    children,
}: Props) => {
    const mapDivRef = React.useRef<HTMLDivElement>();

    const [mapView, setMapView] = React.useState<IMapView>(null);

    const { inIframe } = React.useContext(AppContext);

    const initMapView = async () => {
        type Modules = [typeof IMapView, typeof IWebMap];

        try {
            const [MapView, WebMap] = await (loadModules([
                'esri/views/MapView',
                'esri/WebMap',
            ]) as Promise<Modules>);

            const view = new MapView({
                container: mapDivRef.current,
                map: new WebMap({
                    portalItem: {
                        id: itemId,
                    },
                }),
                center,
                zoom,
                navigation: {
                    mouseWheelZoomEnabled: inIframe ? false : true,
                },
            });

            view.when(() => {
                setMapView(view);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const setWebmap = async () => {
        type Modules = [typeof IWebMap];

        try {
            const [WebMap] = await (loadModules(['esri/WebMap']) as Promise<
                Modules
            >);

            const webmap = new WebMap({
                portalItem: {
                    id: itemId,
                },
            });

            mapView.map = webmap;
        } catch (err) {
            console.error(err);
        }
    };

    const addWatchEvent = async () => {
        type Modules = [typeof IwatchUtils];

        try {
            const [watchUtils] = await (loadModules([
                'esri/core/watchUtils',
            ]) as Promise<Modules>);

            watchUtils.whenTrue(mapView, 'stationary', () => {
                // console.log('mapview is stationary', mapView.center, mapView.zoom);

                if (mapView.zoom === -1) {
                    return;
                }

                const centerLocation: MapCenterLocation = {
                    lat:
                        mapView.center && mapView.center.latitude
                            ? +mapView.center.latitude.toFixed(3)
                            : 0,
                    lon:
                        mapView.center && mapView.center.longitude
                            ? +mapView.center.longitude.toFixed(3)
                            : 0,
                    zoom: mapView.zoom,
                };

                onStationary(centerLocation);
            });
        } catch (err) {
            console.error(err);
        }
    };

    // useEffect(() => {
    //     initMapView();
    // }, []);

    useEffect(() => {
        if (mapView) {
            setWebmap();
        } else {
            initMapView();
        }
    }, [itemId]);

    useEffect(() => {
        if (mapView) {
            addWatchEvent();
        }
    }, [mapView]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                ref={mapDivRef}
            ></div>
            {mapView
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </>
    );
};

export default MapView;
