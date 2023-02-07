import { isArray } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const CmdAuthCheck = ({ children, authValues }) => {
    const authActions = useSelector(({ auth }) => {
        let aut = auth?.user?.role;
        if (!isArray(aut))
            aut = [aut];
        return aut
    })
    const authObjects = useMemo(() => {
        return authActions ? authActions.reduce((accumulator, value, index) => {
            return { ...accumulator, [value]: value };
        }, {}) : {};
    }, [authActions])

    return authValues.some((value) => authObjects[value])
        ? children
        : null;
}

export default CmdAuthCheck;
