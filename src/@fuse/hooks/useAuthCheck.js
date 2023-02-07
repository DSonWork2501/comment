import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useAuthCheck = (authValues) => {
    const authActions = useSelector(({ auth }) => auth.user.role)
    const authObjects = useMemo(() => {
        return authActions ? authActions.reduce((accumulator, value, index) => {
            return { ...accumulator, [value]: value };
        }, {}) : {};
    }, [authActions])

    return authValues.some((value) => authObjects[value])
        ? true
        : false;
}

export default useAuthCheck;
