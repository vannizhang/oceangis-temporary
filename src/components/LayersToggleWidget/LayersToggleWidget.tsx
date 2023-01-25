import React, { FC } from 'react';

import { loadModules } from 'esri-loader';

import IMapView from 'esri/views/MapView';
import ILayerList from 'esri/widgets/LayerList';
import IExpand from 'esri/widgets/Expand';

interface Props {
    mapView?: IMapView;
}

const LayersToggleWidget: FC<Props> = ({ mapView }: Props) => {
    const init = async () => {
        type Modules = [typeof ILayerList, typeof IExpand];

        try {
            const [LayerList, Expand] = await (loadModules([
                'esri/widgets/LayerList',
                'esri/widgets/Expand',
            ]) as Promise<Modules>);

            const layerLIst = new LayerList({
                view: mapView,
            });

            const legendWidgetExpand = new Expand({
                view: mapView,
                content: layerLIst,
                expandIconClass: 'esri-icon-layers',
                expanded: false,
                mode: 'floating',
            });

            mapView.ui.add(legendWidgetExpand, 'top-left');
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default LayersToggleWidget;
