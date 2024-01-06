import callApi from "../utils/callApi";

const GroupApi = {
  getAllUserGroup(token) {
    return callApi(`group/list-all-group-of-user`, "GET", null, token);
  },
  createGroup(token, data) {
    return callApi(`group/create-new-group`, "POST", data, token);
  },
  getGroupInfo(token, groupId) {
    return callApi(`group/get-group-info/${groupId}`, "GET", null, token);
  },
  joinGroup(token,groupId){
    return callApi(`group/join?groupId=${groupId}`,"POST",null,token)
  },
  changeGroupBanner(token,data){
    return callApi(`group/change-group-banner`,"POST",data,token)
  },
  leaveGroup(token,groupId){
    return callApi(`group/leave?groupId=${groupId}`,"GET",null,token)
  },
  getListGroupMember(token,groupId,roleId,page){
    return callApi(`group/list-member-group?groupId=${groupId}&roleId=${roleId}&page=${page}&size=10`,"GET",null,token)
  },
  getListWaitingMember(token,groupId){
    return callApi(`group/list-member-waiting?groupId=${groupId}`,"GET",null,token)
  },
  approveMember(token,data){
    return callApi(`group/approve-member`,"POST",data,token)
  }
  
};

export default GroupApi;
