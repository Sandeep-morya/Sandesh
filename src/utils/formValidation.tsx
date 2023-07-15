import { FormType, IRegistranstionForm } from "../../types";

const formValidation = (form: FormType, formData: IRegistranstionForm) => {
	if (form == "login") {
		if (formData.email.trim() === "" || formData.password.trim() === "") {
			return false;
		} else {
			return true;
		}
	} else {
		return Object.keys(formData).every((e) => e.trim() !== "");
	}
};

export default formValidation;
