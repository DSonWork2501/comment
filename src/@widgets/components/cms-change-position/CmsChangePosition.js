import React, { } from 'react'
// import PropTypes from 'prop-types'
import { CmsBoxLine, CmsButton, CmsLabel } from '@widgets/components'
import { Icon } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons'

function CmsChangePosition(props) {
    const { position1, position2, setIsPosition, HandleChangePosition, setPosition1, setPosition2 } = props

    return (
        <div className="min-h-72 h-72 sm:h-128 sm:min-h-128">
            <div className="w-full items-center pl-6 flex flex-col justify-items-center">
                <CmsBoxLine label="Từ" className="w-full m-12">
                    {position1 && (
                        <div className="w-full space-y-2 items-center py-4">
                            <Icon className="text-green">adjust</Icon>
                            <CmsLabel className="font-bold" content={`${position1.name}`} />
                            <CmsLabel content={`ID  : ${position1.id}`} />
                            <CmsLabel content={`Vị trí: ${position1.position}`} />
                        </div>
                    )}
                </CmsBoxLine>
                <ArrowDownward />
                <CmsBoxLine label="Đến" className="w-full m-12 ">
                    {position2 ? (
                        <div className="w-full space-y-2 items-center py-4">
                            <Icon className="text-orange">place</Icon>
                            <CmsLabel className="font-bold" content={`${position2.name}`} />
                            <CmsLabel content={`ID  : ${position2.id}`} />
                            <CmsLabel content={`Vị trí: ${position2.position}`} />
                        </div>
                    )
                        : <CmsLabel content="Vui lòng chọn vị trí !" />}
                </CmsBoxLine>
                <div className="flex flex-row">
                    {position1 && position2 && (
                        <CmsButton className="mr-8 mt-10" size="small" label="Di Chuyển" startIcon="low_priority" onClick={() => HandleChangePosition(position1, position2)} />)}
                    {(position1 || position2) && (
                        <CmsButton
                            className="mt-10"
                            size="small"
                            label="Bỏ Qua"
                            color="default"
                            startIcon="clear"
                            onClick={() => {
                                setPosition1 && setPosition1(null) 
                                setPosition2 && setPosition2(null)
                                setIsPosition(false)
                                // dispatch(setSelected(null))
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

CmsChangePosition.propTypes = {


}
CmsChangePosition.defaultProps = {

}

export default React.memo(CmsChangePosition)