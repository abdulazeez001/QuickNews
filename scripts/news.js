async function preloadNewsPage(){
    const id = window.location.search.slice(1)
    if(!id){
        return
    }
    const pageData = await getNewsById(id)
    const pageComments = await getNewsComment(id)
    console.log(pageComments)
    loadDataToPage(pageData)
    loadCommentPage(pageComments)
    
}

function loadCommentPage(pagesData){
    if (pagesData.length == 0){
        commentContainer.innerHTML =`
            
            <div class='preload'>
               <p>Be the first to comment :)</p>
            </div>
        `
        return
    }
    const page = pagesData.map(({id,name,avatar,comment})=>{
    commentContainer.appendChild(templateCommentPage(id,name,avatar,comment))
})
return page
}

function loadDataToPage(pagesData){
    if (pagesData.length == 0){
       newsContainer.innerHTML =`
            <div class='preload'>
               <h2>No Match Found :(</h2>
            </div>
        `
        return
    }
   newsContainer.innerHTML =''  
   newsContainer.appendChild(templateNewsPage(pagesData))
}

function postMyComment(div){
    div.addEventListener('click',()=>{
        const id = window.location.search.slice(1)
        let comment = inputComment.value
        let avatar = 'https://i.pinimg.com/564x/98/0e/d8/980ed8d311f70645e81325727069b1ea.jpg'
        let name = 'Juju Dev'
        if(comment==''){
            return
        }
        postComment(commentPostDataFormat({id,name,avatar,comment})).then(()=>{
            inputComment.value=''
            location.reload()})
    })}

const editMe = (event) =>{
   event.target.parentElement.nextElementSibling.className = "comments-search search"
}

const editComments =(event) =>{
    const newsId = window.location.search.slice(1)
    let text = document.getElementById(`edit-comment-${event.target.id}`).value
    if(!text){
        alert('Fill the field')
        return
    }
    let id = event.target.id
    let data = {
        newsId,
        id,
        comment:text
    }
    editComment(data).then(()=>{
        location.reload()
    })
}

const deleteMe = (event) =>{
    // console.log(event.target.id)
    const newsId = window.location.search.slice(1)
    let id = event.target.id
    let data = {
        newsId,
        id,
    }
    deleteComment(data).then(()=>{
        location.reload()
    })
}


const newsContainer = document.getElementById('main-news')
const commentContainer = document.getElementById('comments')
const inputComment = document.getElementById('input-comment')
const postInputComment = document.getElementById('post-comment')
const editButton = document.getElementsByClassName('edit')



postMyComment(postInputComment)
preloadNewsPage()