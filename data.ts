interface ICountryData {
	name: string;
	code: string;
}
export const countries: Record<string, ICountryData> = {
	"+91": {
		name: "India",
		code: "IN",
	},
	"+1": {
		name: "United States",
		code: "US",
	},
	"+44": {
		name: "United Kingdom",
		code: "GB",
	},
	"+61": {
		name: "Australia",
		code: "AU",
	},
	"+86": {
		name: "China",
		code: "CN",
	},
	"+55": {
		name: "Brazil",
		code: "BR",
	},
	"+92": {
		name: "Pakistan",
		code: "PK",
	},
	"+81": {
		name: "Japan",
		code: "JP",
	},
	"+98": {
		name: "Iran",
		code: "IR",
	},
};
