
import PropTypes from 'prop-types';
import React from 'react'
import { Zoom, Box, useScrollTrigger } from '@material-ui/core';

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const scroll = document.getElementsByClassName('scroll-top')[0]
    scroll.scrollTo({
      top: 0,
    });
  
    // const anchor = (event.target.ownerDocument || document).querySelector(
    //   '#back-to-top-anchor',
    // );

    // if (anchor) {
    //   anchor.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center',
    //   });
    // }
  };

  return (
    <Zoom in={trigger}>
      <Box
        // css={{position: 'fixed', bottom: 16, right: 16 }}
        // sx={{ position: 'fixed', bottom: 16, right: 16 }}
        style={{ position: 'fixed', bottom: '16px', right: '16px', transform: 'scale(1)', visibility: 'visible' }}
        onClick={handleClick}
        role="presentation"
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default ScrollTop