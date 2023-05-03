import React, { useMemo } from 'react'
import {
    Tabs,
    Tab,
    Icon
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';
import clsx from 'clsx';

/**
 * 
 * @description Component Tab
 */
function CmsTab(props) {
    const { data, isLink, ...otherProps } = props;
    const authActions = useSelector(({ auth }) => {
        let aut = auth?.user?.role;
        if (!isArray(aut))
            aut = [aut];
        return aut
    });
    const authObjects = useMemo(() => {
        if (!authActions) return;
        return authActions?.reduce((accumulator, value, index) => {
            return { ...accumulator, [value]: value };
        }, {});
    }, [authActions]);

    return (
        <Tabs
            {...otherProps}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: clsx('w-full h-full', otherProps.className) }}
            value={isLink ? data.find(e => e.link === window.location.pathname)?.id : otherProps?.value}
        >
            {data.map((item, index) => {
                if (item?.auth && !item?.auth.some((value) => authObjects[value])) {
                    return null;
                }
                return <Tab key={index} className="normal-case" label={item.name} value={item.id} icon={item.icon && <Icon>{item.icon}</Icon>} />
            })}
        </Tabs>
    )
}

CmsTab.propTypes = {
    data: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}

CmsTab.defaultProps = {
    data: []
}

export default React.memo(CmsTab)
