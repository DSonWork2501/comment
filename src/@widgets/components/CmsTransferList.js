import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types'
import {
  Divider, List, ListItemIcon, Checkbox, ListItemText, 
  ListItem, Grid, Button, Card, CardHeader, FormControl, Typography
} from '@material-ui/core'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles'
import { CmsTextField } from '.';

/**
 * @description Định nghĩa css
 */
 const useStyles = makeStyles(theme => ({
  formGroup: {
      width: '100%',
      position: 'relative',
      border: '1px solid ' + theme.palette.divider,
      borderRadius: 2,
      // padding: '12px 12px 0 12px',
      // margin: '24px 0 16px 0'
  },
  formGroupTitle: {
      position: 'absolute',
      top: -10,
      left: 8,
      padding: '0 4px',
      backgroundColor: theme.palette.background.paper
  },
  formControl: {
      margin: '6px 0',
      width: '100%',
      '&:last-child': {
          marginBottom: '6px'
      }
  },
  inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function CmsTransferList(props) {
  const classes = useStyles(props);
  const { value, data, onChange, className, error, required, label, helperText, 
    placeholderSearch, isSearch 
  } = props
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState(value);
  const [leftSearch, setLeftSearch] = React.useState('')
  const [rightSearch, setRightSearch] = React.useState('')

  useEffect(() => {
    setLeft(data.filter(x => value.filter(i => x.id === i.id).length === 0))
    setRight(value)
  }, [data, value])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = indexOfObject(checked, value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersectionObject(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    onChange && onChange(right.concat(leftChecked))
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    onChange && onChange(not(right, rightChecked))
    setChecked(not(checked, rightChecked));
  };

  const indexOfObject = (a, b) => {
    for (var i = 0; i < a.length; i++) {
      if (a[i].id === b.id) {
        return i;
      }
    }
    return -1;
  }

  const intersectionObject = (a, b) => {
    const array = []
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if (a[i].id === b[j].id) {
          array.push(b[j])
        }
      }
    }
    return array
  }

  const handleOnKeyDown = (event, search) => {

  }

  const customList = (title, items, search, setSearch) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected"
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length}`}
      />
      {isSearch && <CmsTextField
        variant="standard"
        placeholder={placeholderSearch}
        value={search}
        onKeyDown={(event)=>handleOnKeyDown(event, search)}
        onChange={(event)=>setSearch(event.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />}
      <Divider />
      <List className="overflow-y-auto block max-h-200 min-h-200"
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto"
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;
          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={JSON.stringify(checked).indexOf(JSON.stringify(value)) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  return (
    <div className={clsx(classes.formGroup, className, error && "border-red")}>
      <Typography className={classes.formGroupTitle} color={error ? "error" : "primary"}>{required ? `${label} *` : label}</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <Grid container spacing={2} alignItems="center" className="place-content-center">
          <Grid item>{customList("Lựa chọn", left.filter(x=> x.name.toLowerCase().includes(leftSearch.toLowerCase())), leftSearch, setLeftSearch)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList("Đã chọn", right.filter(x=> x.name.toLowerCase().includes(rightSearch.toLowerCase())), rightSearch, setRightSearch)}</Grid>
        </Grid>
        <div className="w-full flex justify-center">
          {helperText && <Typography variant="caption" component="p" color={error ? "error" : "primary"}>{helperText}</Typography>}
        </div>
      </FormControl>
    </div>
  );
}
CmsTransferList.propTypes = {
  value: PropTypes.array,
  data: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholderSearch: PropTypes.string,
  isSearch: PropTypes.bool
}

CmsTransferList.defaultProps = {
  value: [],
  data: [],
  onChange: null,
  className: '',
  label: '',
  required: true,
  placeholderSearch: 'Tìm kiếm ...',
  isSearch: false
}
export default React.memo(CmsTransferList)