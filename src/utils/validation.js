export const validateUsername = (username) => {
  if (username.trim().length === 0) {
    return "Input field cannot be empty!";
  } else if (username.trim().length <= 2) {
    return "Username should be more than 2 characters";
  }

  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (email.trim().length === 0) {
    return "Input field cannot be empty!";
  } else if (!emailRegex.test(email.trim())) {
    return "Invalid Email Address!";
  }

  return "";
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

  if (password.trim().length === 0) {
    return "Input field cannot be empty!";
  } else if (!passwordRegex.test(password.trim())) {
    return "Password should contain at least: 6 characters, an uppercase letter, a lowercase letter, and a digit";
  }
  return "";
};
export const validateLoginEmail = (email) => {
  if (email.trim().length === 0) {
    return "Please fill in your email address!";
  }
  return "";
};

export const validateLoginPassword = (password) => {
  if (password.trim().length === 0) {
    return "Please fill in your password!";
  }
  return "";
};

export const validateTaskInput = (task) => {
  if (task.trim().length === 0) {
    return "Input field cannot be empty!";
  }
  return "";
};
export const validateTodoInput = (todo) => {
  if (todo.trim().length === 0) {
    return "Input field cannot be empty!";
  }
  return "";
};
export const validateTodoTitleInput = (todoTitle) => {
  if (todoTitle.trim().length === 0) {
    return "Input field cannot be empty!";
  }
  return "";
};
