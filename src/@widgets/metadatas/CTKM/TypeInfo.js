import { ImageButtonTemplate, ImageButtonTemplate2, ImageButtonTemplate3, ImageTemplate, PromotionTemplate } from "."

export const TypeInfo = {
    image: {id: 'image', name: 'Chỉ có hình ảnh', type: 'package', block_type: 'html', template:(entity) => ImageTemplate(entity)},
    video: {id: 'video', name: 'Video', type: 'package', block_type: 'video', template: null},
    image_button_1: {id: 'image_button_1', name: 'Web canh trái và mobile canh giữa', type: 'package', block_type: 'html', template:(entity) => ImageButtonTemplate(entity)},
    image_button_2: {id: 'image_button_2', name: 'Hình ảnh và button canh giữa', type: 'package', block_type: 'html', template:(entity) => ImageButtonTemplate2(entity)},
    image_button_3: {id: 'image_button_3', name: 'Web canh trái và mobile canh dưới', type: 'package', block_type: 'html', template:(entity) => ImageButtonTemplate3(entity)},
    promotion_title: {id: 'promotion_title', name: 'Block tiêu đề', type: 'khuyenmai', block_type: 'html', template:(entity) => PromotionTemplate(entity, true)},
    promotion_content: {id: 'promotion_content', name: 'Block nội dung', type: 'khuyenmai', block_type: 'html', template:(entity) => PromotionTemplate(entity, false)},
    slide_head: {id: 'slide_head', name: 'Block slide', type: 'slide', block_type: 'slide'},
    slide_content: {id: 'slide_content', name: 'Block nội dung', type: 'slide', block_type: 'html', template:(entity) => (entity.description)},
    bongda: {id: 'bongda', name: 'Block đá bóng', type: 'bongda', block_type: 'bongda', template:(entity) => (entity.description)}
}

export const GetBlockType = (pageArr = [], pageId, typeInfo) => {
   let pageSlug = GetSlugName(pageArr, pageId)
   return pageSlug === '' ? '' : pageSlug === 'promotion' ? 'html' : TypeInfo[`_${typeInfo}`].block_type
}

export const GetSlugName = (pageArr = [], pageId) => {
    return pageArr.filter(x=>x.id === pageId).length > 0 ? pageArr.find(x=>x.id === pageId).pageSlug : ''
 }

 export const GetTypeInfoBySlug = (type) => {
    if(!type)
        return []
    return Object.values(TypeInfo).filter(x=>x.type === type)
}