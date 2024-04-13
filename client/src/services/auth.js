import httpCommon from '../utils/http-common'
import { successNotification, errorNotification, infoNotification } from '../helpers/notifications'

export const signUp = ({ userName, email, password }, type) => {
    if (type === "parent") {
        httpCommon
            .post("/auth/register-parent", { userName, email, password })
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
    } else { }
}

export const login = ({ email, password }) => {
    httpCommon
        .post("/auth/login", { email, password })
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                successNotification(res.data.message)
            }
        })
        .catch(err => {
            errorNotification(err.response.data.message)
        })



}
