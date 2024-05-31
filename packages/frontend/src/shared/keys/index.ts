export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	VERIFY = '/verify',
	RESET = '/reset/:verificationToken',
	REGISTRATION = '/registration',
	PROFILE = '/profile',
	DASHBOARD = '/dashboard',
	CHANGENAME = '/changeName',
	CHANGEPASSWORD = '/changePassword',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
