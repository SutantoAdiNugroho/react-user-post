import axios from "axios";

export const loginValidation = async values => {
    const API = process.env.REACT_APP_API;

    let errors = {};

    try {
        const { data: result } = await axios.post(
            `${API}/validate/signin`,
            values
        );

        return { ...errors, ...result };
    } catch (err) {
        throw err;
    }
};