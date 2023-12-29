import callApi from "../utils/callApi";

const PostApi = {
  getAllPost(token, page) {
    return callApi(
      `feed/list-user-home-v2?page=${page}&size=5`,
      "GET",
      null,
      token
    );
  },
  likePost(token, data) {
    return callApi(`feed/react`, "POST", data, token);
  },
  getAllGroupPost(token, page, groupId) {
    return callApi(
      `feed/list-group-home?page=${page}&size=5&groupId=${groupId}`,
      "GET",
      null,
      token
    );
  },
  getAllPostAllGroup(token,page){
    return callApi(`feed/list-all-group-home?page=${page}&size=5`,"GET",null,token)
  },
  checkUserLike(token,feedId){
    return callApi(`feed/check-user-like?feedId=${feedId}`,"GET",null,token)
  },
  createPost(token,data){
    return callApi(`feed/post`,"POST",data,token)
  }
};

export default PostApi;
