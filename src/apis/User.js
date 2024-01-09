import callApi from "../utils/callApi"

const UserApi = {
    getUserInfoApi(token){
        return callApi("user/get-user-info","GET",null,token)
    },
    updateUserAvatar(token,data){
        return callApi("user/change-user-avatar","POST",data,token)
    },
    updateUserInfo(token,data){
        return callApi(`user/edit-profile?firstname=${data.firstname}&lastname=${data.lastname}&phoneNo=${data.phoneNo}&gender=${data.gender}&dayOfBirth=${data.dayOfBirth}`,"POST",null,token)
    },
    getUserProfile(token,userId){
        return callApi(`user/get-user-profile/${userId}`,"GET",null,token)
    },
    updateUserBackGround(token,data){
        return callApi(`user/change-user-banner`,"POST",data,token)
    },
    connectUser(token,data){
        return callApi(`connection/connect-user`,"POST",data,token)
    }
}

export default UserApi