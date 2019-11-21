export const validationForm = ({ firstName, lastName, email, password }) => {
    let errors = {};

    if (!email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = "Invalid email format";
    }

    if (!password) {
        errors.password = "Required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    }

    if (!firstName) {
        errors.firstName = "Required";
    }

    if (!lastName) {
        errors.lastName = "Required";
    }

    return errors;
};