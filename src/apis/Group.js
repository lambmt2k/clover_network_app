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
  }
};

export default GroupApi;
