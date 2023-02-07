export const getErrorMessage = (err) => {
    return err?.response?.data?.errors[0]?.message || err.message
}

export default getErrorMessage;
