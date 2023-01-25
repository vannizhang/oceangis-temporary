import './style.scss';
import React from 'react';

export interface NavLinkData {
    label: string;
    path: string;
    isActive?: boolean;
}

interface Props {
    siteName: string;
    links?: NavLinkData[];
    infoBtnOnClick: () => void;
}

export const getNavLinksData = (links: NavLinkData[]): NavLinkData[] => {
    const pathnames = window.location.pathname.split('/').filter((d) => d);
    // pathname of the current page
    const currentPath = pathnames[pathnames.length - 1];

    return links.map((d, i) => {
        const targetPathnames = d.path.split('/').filter((d) => d);

        const isActive =
            currentPath === targetPathnames[targetPathnames.length - 1];

        return {
            ...d,
            isActive,
        };
    });
};

const SiteNav: React.FC<Props> = ({
    siteName = '',
    links = [],
    infoBtnOnClick,
}: Props) => {
    const navLinksData = React.useMemo(() => getNavLinksData(links), [links]);
    return (
        <>
            <div className="esri-sub-nav-wrapper">
                <nav className="esri-sub-nav">
                    <div className="esri-sub-nav-items-container">
                        <div className="esri-sub-nav-title">
                            <a className="link-white" href="../">
                                {' '}
                                {siteName}{' '}
                            </a>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '1rem',
                                cursor: 'pointer',
                            }}
                            onClick={infoBtnOnClick}
                        >
                            <svg height="32" width="32" viewBox="0 0 32 32">
                                <path
                                    d="M16.5 9.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM17 23V12h-2v1h1v10h-1v1h3v-1zm12.8-6.5A13.3 13.3 0 1 1 16.5 3.2a13.3 13.3 0 0 1 13.3 13.3zm-1 0a12.3 12.3 0 1 0-12.3 12.3 12.314 12.314 0 0 0 12.3-12.3z"
                                    stroke="#efefef"
                                    fill="#efefef"
                                />
                            </svg>
                        </div>

                        {/* <div className='esri-sub-nav-link-list tablet-hide'>
                            { 
                                navLinksData.map((d)=>{
                                    return (
                                        <div className='esri-sub-nav-link-item' key={d.label}>
                                            <a 
                                                className='esri-sub-nav-link' 
                                                href={d.path}
                                                data-is-current={d.isActive}
                                            > 
                                                { d.label } 
                                            </a>
                                        </div>
                                    );
                                })
                            }
                        </div> */}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default SiteNav;
