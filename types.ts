export type ColorMode = "light" | "dark";
export type Language = "en" | "hi";
export type Theme = "default" | "red" | "orange" | "lime";

export interface IAppSettigs {
	mode: ColorMode;
	theme: Theme;
	language: Language;
}
