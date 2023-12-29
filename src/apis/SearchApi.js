import callApi from "../utils/callApi"

const SearchApi = {
    search(token,keyword){
        return callApi(`search/search-by?keyword=${keyword}`,"GET",null,token)
    }
}

export default SearchApi