import callApi from "../utils/callApi"

const UserApi = {
    getUserInfoApi(token){
        return callApi("user/get-user-info","GET",null,token)
    }
}

export default UserApi