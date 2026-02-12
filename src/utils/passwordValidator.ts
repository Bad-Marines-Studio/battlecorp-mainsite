import { PASSWORD_SPECIAL_CHARS } from "../constants/auth";

export const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    let typesCount = 0;

    if (/[A-Z]/.test(password)) typesCount++; // Uppercase
    if (/[a-z]/.test(password)) typesCount++; // Lowercase
    if (/\d/.test(password)) typesCount++;    // Digit
    if (new RegExp(`[${PASSWORD_SPECIAL_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`).test(password)) typesCount++; // Special

    if (password.length < 8) errors.push("PasswordErrorMinLength");
    if (typesCount < 3) errors.push("PasswordErrorTypes");

    return errors;
};

// Returns boolean for quick validation
export const isPasswordValid = (password: string): boolean => validatePassword(password).length === 0;
