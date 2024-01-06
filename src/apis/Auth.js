import callApi from "../utils/callApi"

const AuthApi = {
    loginApi(value)  {
        return callApi(`authenticate/login-by-email`,"POST",value)
    },
    registerApi(value){
        return callApi(`authenticate/signup-by-email`,"POST",value)
    },
    findAccount(email){
        return callApi(`authenticate/forgot-password?email=${email}`,"GET")
    },
    resetPassword(value){
        return callApi(`authenticate/reset-password`,"POST",value)
    },
    changePassword(token,value){
        return callApi(`authenticate/change-password`,"POST",value,token)
    }
}

export default AuthApi