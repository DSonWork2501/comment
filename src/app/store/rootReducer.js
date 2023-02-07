import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import widgets from '@widgets/store'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		i18n,
		...asyncReducers,
		widgets
	});

export default createReducer;
