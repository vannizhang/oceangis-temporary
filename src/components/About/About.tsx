import React from 'react';

type Props = {
    onClose: () => void;
};

const About: React.FC<Props> = ({ onClose }: Props) => {
    return (
        <div className="js-modal modal-overlay is-active">
            <div
                className="modal-content column-12"
                role="dialog"
                aria-labelledby="modal"
            >
                <div className="trailer-half text-right">
                    <span
                        className="text-blue"
                        onClick={onClose}
                        style={{ cursor: 'pointer' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 32 32"
                            className="svg-icon"
                        >
                            <path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" />
                        </svg>
                    </span>
                </div>

                <h3 className="trailer-1">U.S. Federal Maps</h3>

                <p>
                    U.S. government agencies are the authoritative source for
                    understanding the structure and function of the nation, and
                    many of these key products are available as web services.
                    Esri has been working with these authoritative sources to
                    make their layers and maps available in{' '}
                    <a
                        target="_blank"
                        href="https://livingatlas.arcgis.com/en/browse/#d=2&q=a16"
                        rel="noreferrer"
                    >
                        ArcGIS Living Atlas of the World
                    </a>
                    .{' '}
                </p>

                <p>
                    The U.S. Federal Maps application provides an easy way to
                    browse this rich collection, including many of the A-16
                    layers, and incorporate them into your own maps.{' '}
                </p>

                <p>
                    For questions on how to include other U.S. federal maps,
                    please contact{' '}
                    <a
                        target="_blank"
                        href="mailto:ArcGIScomNationalMaps@esri.com"
                        rel="noreferrer"
                    >
                        ArcGIScomNationalMaps@esri.com
                    </a>
                    .
                </p>

                <div className="text-right">
                    <button className="btn btn-clear" onClick={onClose}>
                        close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
