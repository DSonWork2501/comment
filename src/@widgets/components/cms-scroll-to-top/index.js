
import { Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import React from 'react'
import ScrollTop from './ScrollTop';

function CmsScrollTop(props) {

  return (
    <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUp />
      </Fab>
    </ScrollTop>
  );
}

CmsScrollTop.propTypes = {
};
export default CmsScrollTop