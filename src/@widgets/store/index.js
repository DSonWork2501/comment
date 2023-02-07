import { combineReducers } from '@reduxjs/toolkit'
import editor from './editorSlice'
import country from './countrySlice'
import copyright from './copyrightSlice'
import folders from './foldersSlice'
import user from './userSlice'
import categories from './categoriesSlice'
import person from './personSlice'
import permissions from './permissionSlice'
import department from './departmentSlice'
import reasons from './reasonDownSlice'
import sport from './sportSlice'

const reducer = combineReducers({
    editor,
    country,
    copyright,
    folders,
    user,
    categories,
    person,
    permissions,
    department,
    reasons,
    sport,
});

export default reducer;
