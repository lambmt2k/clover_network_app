import callApi from "../utils/callApi"

const AuthApi = {
    loginApi(value)  {
        return callApi(`authenticate/login-by-email`,"POST",value)
    },
    registerApi(value){
        return callApi(`authenticate/signup-by-email`,"POST",value)
    }
}

export default AuthApi