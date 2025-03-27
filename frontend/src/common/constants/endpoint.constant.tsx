export const ENDPOINT = {
	AUTH: {
		LOGIN: `auth/login`,
		REGISTER: `auth/register`,
		REFRESHTOKEN: `auth/refresh-token`,
	},
	PICTURE: {
		PICTURES: `picture/pictures`,
		IMGDETAILS: `picture/details`,
		SAVEIMG: `picture/saved-pictures`,
		SAVEDIMGBYUSER: `picture/saved-picture-list-by-user`,
		CREATEDPICTURELIST: `picture/created-pictures-list`,
		UPLOAD: `picture/upload`,
		SEARCH: `picture/search-picture`,
		UPDATE: `picture/update`,
	},
	USER: {
		GETINFO: `user/getinfo`,
		UPLOADAVATARCLOUD: `user/uploadAvatarCloud`,
		UPLOADAVATARLOCAL: `user/uploadAvatarLocal`,
	},
	COMMENT: {
		ADDCOMMENT: `comment/add-comment`,
		GETCOMMENTS: `comment/get-comments`,
		GETREPLIES: `comment/get-replies`,
		REPLYTOCOMMENT: `comment/reply-to-comment`,
	},
};
