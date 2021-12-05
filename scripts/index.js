async function preloadIndexPage(){
    const pagesData = await getNewsByPage(1);
    loadDataToPage(pagesData)
}

function loadDataToPage(pagesData){
    if (pagesData.length == 0){
        dataListContainer.innerHTML =`
            <div class='preload'>
               <h2>No Match Found :(</h2>
            </div>
        `
        return
    }
    dataListContainer.innerHTML =''
    pagesData.map(({id,author,avatar,title})=>{
    dataListContainer.appendChild(templatePage(id,author,avatar,title))
})}

function filterPage(tag){
    tag.addEventListener('change',async function(event){
     let pagesData = await getAllNews();
     if(event.target.value==''){
        pagesData = await getNewsByPage(currentPage);
     }
     const data = pagesData.filter(({title})=>{
        return title.includes(event.target.value)
     })
     loadDataToPage(data)
 })
 }

async function changeActiveNav(targets){
    document.querySelectorAll(targets).forEach((data)=>{
        data.addEventListener('click',async function(){
            
            document.querySelectorAll(targets).forEach((data)=>{
                data.className=''
            })
            this.className='active'
            currentPage = Number(this.dataset.page)
            const pagesData = await getNewsByPage(currentPage);
            loadDataToPage(pagesData,dataListContainer)
   
        })
    })
}

function prevPageAction(div){
    div.addEventListener('click',async function(){
        if (currentPage===1 || currentPage===0){
            return
        }
        controlList.forEach((li)=>{
            li.className = ''
        })
        currentPage = currentPage - 1 
        controlList[currentPage-1].className = 'active'
        const pagesData = await getNewsByPage(currentPage);
        loadDataToPage(pagesData) 
          
    })

}

function nextPageAction(div){
    div.addEventListener('click',async function(){
        if (currentPage==8){
            currentPage = 0
        }
        
        controlList.forEach((li)=>{
            li.className = ''
        })
        controlList[currentPage].className = 'active'
        const pagesData = await getNewsByPage(currentPage+1);
        currentPage = currentPage + 1 
        loadDataToPage(pagesData)     
    })
}




let currentPage = 1
const dataListContainer = document.querySelector('#newsList')
const controlList = document.querySelectorAll('.control li')
const controlBtn = document.querySelectorAll('.control-btn')
const search = document.getElementById('search')



preloadIndexPage()
filterPage(search)
changeActiveNav(".control li")
prevPageAction(controlBtn[0])
nextPageAction(controlBtn[1])
