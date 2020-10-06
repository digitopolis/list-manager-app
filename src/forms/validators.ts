export const validateEmail = (value: string) => {
  let error: string = "";
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

export const validatePassword = (password: string) => {
  let error: string = "";
  if (!password) {
    error = "Required";
  }
  return error;
};

export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
) => {
  let error: string = "";
  if (!passwordConfirm) {
    error = "Required";
  } else if (password !== passwordConfirm) {
    error = "Passwords must match";
  }
  return error;
};

export const validatePresence = (value: string) => {
  let error: string = "";
  if (!value) {
    error = "Required";
  }
  return error;
};
