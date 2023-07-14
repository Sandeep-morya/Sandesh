export type ColorMode = "light" | "dark";
export type Language = "en" | "hi";
export type Theme = "default" | "red" | "orange" | "lime";

export interface IAppSettigs {
	mode: ColorMode;
	theme: Theme;
	language: Language;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IRegistranstionForm extends ILoginForm {
	name?: String;
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	username: string;
	mobile: string;
	bio: string;
	verified: boolean;
	createdAt: string;
	__typename: string;
}
