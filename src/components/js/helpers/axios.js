import Axios from "axios"

export const axios = () => {
    Axios.defaults.baseURL = process.env.REACT_APP_API
    Axios.defaults.headers.common["X-API-KEY"] =
        process.env.REACT_APP_JWT_SECRET_KEY
    
    const token = localStorage.getItem("token")

    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse (token)}`
    }
    return Axios
}

export const axiosMongoose = () => {
    Axios.defaults.baseURL = process.env.REACT_APP_MONGOOSE
    Axios.defaults.headers.common["X-API-KEY"] =
        process.env.REACT_APP_JWT_SECRET_KEY
    
    const token = localStorage.getItem("token")

    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse (token)}`
    }
    return Axios
}

export const axiosMysql = () => {
    Axios.defaults.baseURL = process.env.REACT_APP_MYSQL
    Axios.defaults.headers.common["X-API-KEY"] =
    process.env.REACT_APP_JWT_SECRET_KEY

    const token = localStorage.getItem("token")

    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse (token)}`
    }
    return Axios
}

export const axiosSequelize = () => {
    Axios.defaults.baseURL = process.env.REACT_APP_MYSQL_SEQUELIZE
    Axios.defaults.headers.common["X-API-KEY"] =
    process.env.REACT_APP_JWT_SECRET_KEY

    const token = localStorage.getItem("token")

    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse (token)}`
    }
    return Axios
}