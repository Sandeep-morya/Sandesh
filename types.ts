export type ColorMode = "light" | "dark";
export type Language = "en" | "hi";
export type Theme = "default" | "red" | "orange" | "lime";

export interface IAppSettigs {
	mode: ColorMode;
	theme: Theme;
	language: Language;
}
export type FormType = "login" | "register";
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
	gender: string;
	image: string;
	mobile: string;
	bio: string;
	verified: boolean;
	createdAt: string;
	__typename: string;
}

export interface IUserSlice {
	loading: boolean;
	error: boolean;
	token: String;
	info: IUser | null;
	// settings:IUserSetting
}
type MessageStatus = "Pending" | "Sent" | "Recieved";
export interface MessageType {
	sender: string;
	recipient: string;
	content: string;
	createdAt: Date;
	status: MessageStatus;
}

export interface ChatSlice {
	activeUsers: string[] | null;
	messages: MessageType[] | null;
}
