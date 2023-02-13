import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsCardedPage } from "@widgets/components"
import React from "react"
import { useParams } from "react-router"

function EditProduct(props) {
    const params = useParams()

    // useEffect(() => {
    //     if (params.id) {

    //     }
    // }, [])
    return (
        (
            <CmsCardedPage
                title={params.id ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm'}
                subTitle={'Quản lý thông tin sản phẩm'}
                icon="whatshot"
                // leftBottomHeader={leftBottomHeader}
                rightHeaderButton={
                    <div>

                    </div>
                }
                content={
                    <FuseAnimateGroup className="flex flex-wrap pt-8 overflow-hidden" enter={{ animation: 'transition.slideUpBigIn' }}>

                    </FuseAnimateGroup>
                }
                toolbar={
                    <div className="w-full flex items-center justify-between px-12">
                        <div className="flex items-center justify-items-start">
                        </div>
                        <div className="flex items-center justify-end">
                        
                        </div>
                    </div>
                }
            />
        )
    )
}
export default EditProduct