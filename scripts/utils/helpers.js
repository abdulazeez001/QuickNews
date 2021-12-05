async function callPageUrl(method,url,page_num=1,data={}){
  try{
    const response = await axios[method](url,{
        params:{page:page_num,limit:10}
                 },data)
    return response.data
  }catch(error){
    return error.message
  }
}
async function callUrl(method,url,data={}){
  try{
    const response = await axios[method](url,data)
    return response.data
  }catch(error){
    return error.message
  }
}

const templatePage = (id,name,img,title)=>{
  let node = document.createElement('div')
  node.id = id
  node.addEventListener('click',function(){
      window.location = `/news.html?${id}`
  })
  node.innerHTML =
  `
  <div class="author">
      <img src=${img} alt="author image" width="50px">
      <p class='name'>${name}</p>
  </div>
  <div>
      <p class="title">${title}</p>
  </div> `
 
  return node
}

const templateCommentPage = (id,name,img,title)=>{
  let node = document.createElement('div')
  node.className = 'comment'
  // node.id = id
  node.innerHTML =
  `  <div class="author">
      <img src=${img} alt="author image" width="50px">
      <p class='name'>${name}</p>
  </div>
  <div>
      <p class="title">${title}</p>
  </div> 
  <div class='edit-btn' >
    <button class='dark-btn edit' onclick='editMe(event)' >edit</button>
    <button class='delete dark-btn' id=${id} onclick='deleteMe(event)' >Delete</button>
  </div>
  <div class="comments-search search edit-input">
            <input type="text" placeholder="Edit comment" id="edit-comment-${id}">
            <button class="dark-btn" onclick='editComments(event)' id=${id}>Post</button>
  </div>`
  
  return node
}

const templateNewsPage = ({id,author,avatar,title}) =>{
  let node = document.createElement('div')
  node.id = id
  node.innerHTML =
  `
  <div class="author">
      <img src=${avatar} alt="author image" width="100px">
      <p class='name'>${author}</p>
  </div>
  <div>
      <h1>${title}</h1>
      <p class='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti non vitae nam qui magnam corrupti aliquam rerum culpa iusto quam consectetur dignissimos nesciunt, 
      doloremque ex nihil dolores doloribus rem soluta.</p>
  </div> 
  
  `
  
  return node
}

function newsPostDataFormat(data){
  const {author,avatar,title,url} = data
   return {
     "author":author,
     "avatar":avatar,
     "title":title,
     "url":url
   }
}

function commentPostDataFormat(data){
  const {id,name,avatar,comment} = data
   return {
     "newsId":id,
     "name":name,
     "avatar":avatar,
     "comment":comment
   }
}
