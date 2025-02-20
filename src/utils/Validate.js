export const checkValidData = (name, email, password, isSignInForm) => {
    if (!isSignInForm) {
        const isNameValid = /^[a-zA-Z\s]+$/.test(name);
        if (!isNameValid) return "Name is not Valid";
    }

    const isEmailValid = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid) return "Email is not Valid";
    if (!isPasswordValid) return "Password is not Valid";

    return "";
};
