import React from 'react';
// import { useSelector } from 'react-redux';
import './style.css';

// import { isSidebarVisibleSelector } from '../../store/reducers/UI';
import { SIDEBAR_WIDTH } from '../../constants/UI';

type Props = {
    width?: number;
    scrollToBottomHandler?: () => void;
    children: React.ReactNode;
};

const SideBar: React.FC<Props> = ({
    width = SIDEBAR_WIDTH,
    scrollToBottomHandler,
    children,
}: Props) => {
    const sidebarRef = React.createRef<HTMLDivElement>();

    const onScrollHandler = () => {
        if (!scrollToBottomHandler) {
            return;
        }

        const sidebarDiv = sidebarRef.current;

        if (
            sidebarDiv.scrollHeight - sidebarDiv.scrollTop <=
            sidebarDiv.clientHeight
        ) {
            // console.log('hit to bottom');
            scrollToBottomHandler();
        }
    };

    return (
        <div
            ref={sidebarRef}
            onScroll={onScrollHandler}
            className="fancy-scrollbar"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: width,
                boxSizing: 'border-box',
                padding: '1rem',
                overflowY: 'auto',
                boxShadow: '0 2px 6px rgba(0,0,0,.24)',
            }}
        >
            {children}
        </div>
    );
};

export default SideBar;
