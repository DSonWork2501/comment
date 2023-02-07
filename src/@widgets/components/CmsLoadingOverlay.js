import React from 'react'
import * as PropTypes from 'prop-types';
import styled, { css } from "styled-components"
import LoadingOverlay from 'react-loading-overlay';
/**
 * 
 * @description Component CmsImageBox
 */

const DarkBackground = styled.div`
 display: none; /* Hidden by default */
 position: absolute; /* Stay in place */
 z-index: 999; /* Sit on top */
 left: 0;
 top: 7px;
 width: 100%; /* Full width */
 height: 100%; /* Full height */
 overflow: auto; /* Enable scroll if needed */
 background-color: rgb(0, 0, 0); /* Fallback color */
 background-color: rgba(0, 0, 0, 0.4);
 ${props =>
        props.disappear &&
        css`
 display: block; /* show */
 `}
`;
/**
 * 
 * @description Component Label
 */
function CmsLoadingOverlay({ loading, id, title = "Loading..."}) {

    return (
        <DarkBackground disappear={loading} id={`image-file_${id}_loading`}>
            <LoadingOverlay
                className='absolute h-full'
                styles={{
                    wrapper: {
                        height: '100%',
                        width: '100%'
                    },
                }}
                active={true}
                // spinner={<BounceLoader />}
                spinner={true}
                text={title}
            >
            </LoadingOverlay>
        </DarkBackground>
    )
}

CmsLoadingOverlay.propTypes = {
    loading: PropTypes.bool,
    id: PropTypes.string,
}

CmsLoadingOverlay.defaultProps = {
    loading: false,
    id: "body1",
}

export default React.memo(CmsLoadingOverlay)
