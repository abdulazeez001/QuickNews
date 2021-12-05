const author_name = document.getElementById('author_name');
const author_img = document.getElementById('author_img');
const news_title = document.getElementById('news_title');
const news_url = document.getElementById('news_url'); 
const submit = document.getElementById('submit');



submit.addEventListener('click',(event)=>{
    let name = author_name.value;
    let img = author_img.value;
    let title = news_title.value;
    let url = news_url.value
    event.preventDefault()
    if (img == '' || name == ''|| url== ''|| title== ''){
        alert('Please fill all the field')
        return
    }
    let data = {
        "author":name,
        "avatar":img,
        "title":title,
        "url":url
      }
    postNews(newsPostDataFormat(data)).then(()=>{ window.location = './' })
})
