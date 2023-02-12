import React from "react"
export const ArrayButton = ({arr = [], name = ''}) => {
    return (
        <div className="w-full leading-3">
            {Array.isArray(arr) && arr.length > 0 ? arr?.map((x, index) => <button key={`${index}_${name}`} className="m-2 p-4 border-1 rounded-12 bg-grey-300 hover:bg-grey-400 shadow-2">{x}</button>) : '-'}
        </div>
    )
}