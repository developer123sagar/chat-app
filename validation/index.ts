const usernameRegex = /^[a-zA-Z ]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

export const validateUsername = (username: string): boolean => usernameRegex.test(username.trim());

export const validatePassword = (password: string): boolean => passwordRegex.test(password.trim());

export const getPasswordValidationMessage = (password: string): string => {
    let message = "Password must have";
    if (!/[a-z]/.test(password)) message += " lowercase,";
    if (!/[A-Z]/.test(password)) message += " uppercase,";
    if (!/\d/.test(password)) message += " digit,";
    if (!/[@$!%*?&#]/.test(password)) message += " special character,";
    if (password.length < 6) message += " minimum 6 characters.";

    return message.replace(/,$/, "");
};
