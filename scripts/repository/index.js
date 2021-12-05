const BASE_URL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news`


async function getAllNews(){
    return await callUrl(method='get',BASE_URL)
 }

async function getNewsByPage(page_num){
   return await callPageUrl(method='get',BASE_URL,page_num=page_num)
}

async function getNewsById(id){
    return await callUrl(method='get',BASE_URL+`/${id}`)
}

async function getNewsComment(id){
    return await callPageUrl(method='get',BASE_URL+`/${id}/comments`)
}

async function postNews(data){
    return await callUrl(method='post',BASE_URL,data=data)
}

async function postComment(data){
    return await callUrl(method='post',BASE_URL+`/${data.newsId}/comments`,data)
}

async function editComment(data){
    return await callUrl(method='put',BASE_URL+`/${data.newsId}/comments/${data.id}`,data)
}

async function deleteComment(data){
    return await callUrl(method='delete',BASE_URL+`/${data.newsId}/comments/${data.id}`,data)
}
