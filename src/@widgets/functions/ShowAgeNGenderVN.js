import { age, gender} from '@widgets/metadatas'
export const ShowAgeNGender = (ageNGender) => {
    if(!ageNGender)
        return ''
    let arr = ageNGender.split(',')
    return arr.map(x=>{
        let genderName = gender.filter(i=> i.id === x.split(':')[0]).length > 0 ? gender.find(i=> i.id === x.split(':')[0]).name : '';
        let ageName = age.filter(i=> i.id === x.split(':')[1]).length > 0 ? age.find(i=> i.id === x.split(':')[1]).name : '';
        return `${genderName}:${ageName}`
    }).join(',')
} 