export const VNToENCharacter = (str) => {
    return !str ? '' : str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}