/**
 * @description Tùy Chọn Hệ Thống
 * @description PlayOnSystem
 */
const bitBand = {
    SD:       { id: '10000000', name: 'SD', className: "bg-purple-500" },
    VODCN:    { id: '01000000', name: 'VODCN', className: "bg-indigo-400" },
    FBOX:     { id: '00100000', name: 'FBOX', className: "bg-orange-800" },
    ISTREAM:  { id: '00010000', name: 'ISTREAM', className: "bg-green-500" },
    BHD:      { id: '00001000', name: 'BHD', className: "bg-brown-500" },
    FilmPlus: { id: '00000100', name: 'Film+', className: "bg-blue-gray-800" },
}

export const getName = strPlayOnSystem => {
    let item = Object.values(bitBand).find(item=>item.id === strPlayOnSystem)
    return item ? item.name : ""
}

export default bitBand