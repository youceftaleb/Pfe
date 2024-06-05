import httpCommon from '../utils/http-common'
import { successNotification, errorNotification, infoNotification } from '../helpers/notifications'
import { loginStart, loginSuccess } from '../redux/userReducer'

export const signUpParent = ({ userName, email, password }) => {
    httpCommon
        .post("/auth/register/parent", { userName, email, password })
        .then(
            res => {
                if (res.status === 201) {
                    successNotification(res.data.message)
                }
            })
        .catch(err => {
            if (err.response.status === 409) {
                infoNotification(err.response.data.message)
            } else {
                errorNotification(err.response.data.message)
            }
        })
}

export const signUpEnseignant = ({ email, password, userName, CV, days, experience, identite, modules, adresse }) => {
    httpCommon
        .post("/auth/register/enseignant", { email, password, userName, CV, experience, modules, identite, disponibilite: days, adresse })
        .then(res => { if (res.status === 201) { successNotification(res.data.message) } })
        .catch(err => {
            if (err.response.status === 409) {
                console.log(err);
                infoNotification(err.response.data.message)
            } else {
                errorNotification(err.response.data.message)
            }
        })
}

export const login = ({ email, password }, dispatch) => {
    dispatch(loginStart())
    httpCommon
        .post("/auth/login", { email, password })
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_type", res.data.type)
                successNotification(res.data.message)
                dispatch(loginSuccess(res.data.data))
                setTimeout(() => {
                    switch (res.data.type) {
                        case "parent":
                            window.location = "/parent/dashboard"
                            break;
                        case "enseignant":
                            window.location = "/enseignant/dashboard"
                            break;
                        case "admin":
                            window.location = "/admin/dashboard"
                            break;
                    }
                }, 3000);
            }
        })
        .catch(err => {
            errorNotification(err.response.data.message)
        })
}
