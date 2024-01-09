import callApi from "../utils/callApi";

const FriendApi = {
  getListFolllowing(token, userId, page) {
    return callApi(
      `user/get-list-connect?userId=${userId}&page=${page}&size=10`,
      "GET",
      null,
      token
    );
  },
  getListFollower(token, userId, page) {
    return callApi(
      `user/get-list-connector?userId=${userId}&page=${page}&size=5`,
      "GET",
      null,
      token
    );
  },
  getRandomFriend(token){
    return callApi(`user/get-list-recommend`,"GET",null,token)
  }
};

export default FriendApi;
