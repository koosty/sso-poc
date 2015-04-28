package com.mascova.caliga.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.mascova.caliga.controller.form.ActivationForm;

/**
 * Created by zulfy on 31/12/14.
 */
public class PasswordValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return ActivationForm.class.equals(aClass);
	}

	@Override
	public void validate(Object o, Errors errors) {

		ActivationForm activationForm = (ActivationForm) o;
		if (!activationForm.getPassword().equals(activationForm.getPassword2())) {
			errors.rejectValue("password2", "valid.password.nomatch");
		}

	}
}
