/**
 * @description 1000 -> 1,000
 */
export const NumberWithCommas = (str) => {
    return str?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '';
}