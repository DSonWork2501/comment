import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import NumberFormat from "react-number-format";

/**
 * @description Định nghĩa css
 */
const useStyles = makeStyles(theme => ({
  boxLine: {
    background: 'rgb(76, 175, 150)',
    color: 'rgb(255, 255, 255)',
  },
}));

const YesNo = {
  Yes: { id: 1, },
  No: { id: 0 }
}

/**
 * 
 * @description Component Box
 */
function CmsBox(props) {
  const classes = useStyles(props);
  const {
    data,
    label,
    className,
    onClick,
    ...otherProps
  } = props

  return (
    data && (data.length > 0) && (
      <div className="flex flex-wrap py-24" initial="hidden" animate="show">
        {data.map((item) => {
          return (
            <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={item.name}>
              <Card className="flex flex-col h-256 shadow">
                <div className={clsx("flex flex-wrap shrink-0 items-center justify-between px-24 h-64", classes.boxLine)}>
                  <Typography className="font-bold text-center uppercase" color="inherit">
                    {item.name}
                  </Typography>
                </div>
                <CardContent className="flex flex-col flex-auto items-center justify-center">
                  <NumberFormat
                    className="text-center text-32 font-bold"
                    thousandsGroupStyle="thousand"
                    value={item.value}
                    decimalSeparator="."
                    displayType="input"
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true} />
                  {item.isActive === YesNo.Yes.id && <CardActions className="items-center justify-center">
                    <Button
                      {...otherProps}
                      onClick={onClick}
                      className={clsx("justify-start px-32", className)}
                      color="inherit"
                      variant="outlined"
                    >
                      {label}
                    </Button>
                  </CardActions>}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    )
  )
}

CmsBox.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func
}

CmsBox.defaultProps = {
  data: [],
  label: "",
  className: "",
  onClick: null
}


export default React.memo(CmsBox)