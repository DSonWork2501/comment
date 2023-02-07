import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/**
 * @description Component biễu diễn tiến trình dựa trên giá trị truyền vào theo tỷ lệ %. Giá trị truyền vào trong đoạn từ [0 - 100]
 * @param {*} value number
 * @returns node
 * @example Một chương trình A có trạng thái = 3, và tập trạng thái có 5 giá trị theo thứ tự từ 1 đến 5. 
 * Cần phải tính giá trị(value) để truyền vào component theo công thức sau:
 * value = (current_value/max_value)*100
 * Áp dụng vào trường hợp trên: value = (3/5)*100 = 60
 * <CmsLinearProgressWithLabel value=60 />
 */
function CmsLinearProgressWithLabel(props) {
  const {value} = props
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={0}>
        <Typography variant="body2">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CmsLinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
}

CmsLinearProgressWithLabel.defaultProps = {
    value: 0,
}

export default React.memo(CmsLinearProgressWithLabel)