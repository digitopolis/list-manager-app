import React from "react";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../forms/validators";

test("validateEmail validates presence of email", () => {
  const validEmail = "myname@email.com";
  const error = validateEmail(validEmail);
  expect(error).toBe("");
});

test("validateEmail generates error if email is missing", () => {
  const missingEmail = "";
  const error = validateEmail(missingEmail);
  expect(error).toBe("Required");
});

test("validateEmail validates correct format of email", () => {
  const invalidEmail = "myname.com";
  const error = validateEmail(invalidEmail);
  expect(error).toBe("Invalid email address");
});

test("validatePassword generates error if password is missing", () => {
  const missingPassword = "";
  const error = validatePassword(missingPassword);
  expect(error).toBe("Required");

  const validPassword = "password";
  expect(validatePassword(validPassword)).toBe("");
});

test("validatePasswordConfirm validates passwords match", () => {
  const password = "password";
  const passwordConfirm = "pass";
  const error = validatePasswordConfirm(password, passwordConfirm);
  expect(error).toBe("Passwords must match");
});
