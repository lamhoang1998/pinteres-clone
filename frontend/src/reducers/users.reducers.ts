import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken, logOut } from "../helpers/auth.helper";
import { AppDispatch } from "../store";
import { ENDPOINT } from "../common/constants/endpoint.constant";
import { ApiWithToken } from "../common/api/axios/axios";
import { TRes } from "../types/app.types";
import { UserInfo } from "../types/user.type";

type InitialState = {
	info: UserInfo | null;
	isLogin: boolean;
};

const initialState: InitialState = {
	info: null,
	isLogin: !!getAccessToken(),
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		SET_INFO: (state, { payload }) => {
			state.info = payload;
		},
		UPDATE_IS_LOGIN: (state) => {
			state.isLogin = !!getAccessToken();
		},
	},
});

export const { UPDATE_IS_LOGIN, SET_INFO } = userSlice.actions;

export default userSlice.reducer;

export const getInfo = () => {
	return async (dispatch: AppDispatch) => {
		ApiWithToken.get<TRes<UserInfo>>(ENDPOINT.USER.GETINFO)
			.then(({ data }) => {
				console.log("user data", data);
				dispatch(SET_INFO(data.metaData));
			})
			.catch(() => {
				logOut();
			});
	};
};
