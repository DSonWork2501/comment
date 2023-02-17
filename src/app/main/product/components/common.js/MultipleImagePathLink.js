import { CmsIconButton, CmsTextField } from "@widgets/components"
import React from "react"
import { useEffect, useState } from "react"
import noImage from '@widgets/images/noImage.jpg';

function MutipleImagePathLink({ images }) {
    const [array, setArray] = useState([])
    useEffect(() => {
        setArray(images || [])
    }, [images])

    const HandChangeImage = (event, index) => {
        let arr = Object.assign({}, array || [])
        arr[index] = event.target.value
        setArray(arr)
    }

    const HandAddArray = () => {
        let arr = array.length > 0 ? array : []
        arr.push('')
        console.log(arr)
        setArray(arr)
    }

    return (
        array.length > 0 ? array.map((x, index) => (
            <div key={`div_${index}`} className="flex flex-row items-center space-x-8">
                <CmsTextField key={`path_key_${index}`} label="Image" value={x || ''} onChange={(event) => HandChangeImage(event, 0)} />
                <img key={`image_key_${index}`} alt={`image_alt_${index}`} src={x || noImage} className="max-h-32 max-w-32"/>
                {index === array.length - 1 && <CmsIconButton icon="add" onClick={HandAddArray}/>}
            </div>
        )) : (
            <div key="div_0" className="flex flex-row items-center space-x-8">
                <CmsTextField key={`path_key_0`} label="Image" value={array[0] || ''} onChange={(event) => HandChangeImage(event, 0)} />
                <img key={`image_key_0`} alt={`image_alt_0`} src={array[0] || noImage} className="max-h-32 max-w-32"/>
                <CmsIconButton icon="add" onClick={HandAddArray}/>
            </div>
        )

    )
}
export default MutipleImagePathLink