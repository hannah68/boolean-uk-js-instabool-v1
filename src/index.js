
let state = {
    inputTitle: "",
    inputImage: "",
    posts: []
}

const setState = (newState) => {
    state = {...state,...newState};
    console.log('first state: ', state);
    renderFn(state);
}

// update Like==================================================
const updateLikes = (num,id) => {
    fetch(`http://localhost:3000/images/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: num })
    })
}

// listen To Like Buttons=========================================
const listenToLikeButton = () => {
    const likeBtn = document.querySelectorAll('.like-button');
    likeBtn.forEach(btn => {
        const previous = btn.previousElementSibling;
        const tempArr = previous.innerText.split(' ');
        let num = Number(tempArr[0]);
        btn.addEventListener('click', () => {
            const likeId = btn.id
            num ++
            previous.innerText = num + ' likes'
            updateLikes(num,likeId);
        })
    })
}


// listen to delete post button ===============================
function listenToDeletePostBtn(state){
    const deleteBtn = document.querySelectorAll('.delete-post');
    deleteBtn.forEach(btn => {
        const titleValue = btn.previousElementSibling.textContent;
        btn.addEventListener('click', () => {
            for(let post of state.posts){
                if(post.title === titleValue){
                    fetch(`http://localhost:3000/images/${post.id}`, {
                        method: 'DELETE'
                    })
                }
            }
        })
    })
   
}

// listen to delete comment=====================================
const listenToDeletecomment = (post) => {
    const comment = document.querySelectorAll('.delete-comment');
    comment.forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = post.id;
            const commentId = btn.parentElement.attributes[1].value;
            const parentId = btn.parentElement.parentElement.parentElement.attributes[0].value;
            if(postId === Number(parentId)){
                for(let post of state.posts){
                    for(let comment of post.comments){
                        if(comment.id === Number(commentId)){
                            console.log(postId);
                            fetch(`http://localhost:3000/comments/${comment.id}`, {
                                method: 'DELETE'
                            });
                    
                        }
                    }
                }
            }
        })
    })
}


// listen to comment button======================================
const listenToCommentButton = (form,commentInput,post) => {
    form.addEventListener('submit',(e) => {
        e.preventDefault();
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content": commentInput.value,
                "imageId": post.id
            })
        })
    })
}

// render comment form===========================================
const renderCommentForm = (post,article) => {
    const form = document.createElement('form');
    form.classList.add('comment-form')
    const commentInput = document.createElement("input");
    const commentButton = document.createElement("button");

    commentInput.setAttribute("class","comment-input");
    commentInput.setAttribute("type","text");
    commentInput.setAttribute("name","comment");
    commentInput.setAttribute("placeholder","Add a comment...");

    commentButton.setAttribute("class","comment-button");
    commentButton.setAttribute("type","submit");
    commentButton.innerText = "Post";

    form.append(commentInput,commentButton);
    article.insertAdjacentElement('beforeend',form);
    listenToCommentButton(form,commentInput,post)
}


// render cards====================================================
const renderCards = (post) => {
    const imageContainer = document.querySelector('.image-container')
    const article = document.createElement('article');
    article.setAttribute('postId',`${post.id}`);
    article.classList.add('image-card');
    imageContainer.append(article);
    article.innerHTML = `
        <div class="container">
            <h2 class="title">${post.title}</h2>
            <button class="delete-post"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <img src="${post.image}" class="image" />
        <div class="likes-section">
            <span class="likes">${post.likes} likes</span>
            <button class="like-button" id="${post.id}">♥</button>
        </div>
    `
    const commentList = document.createElement('ul');
    commentList.classList.add('comments');
    commentList.innerHTML = post.comments.map(comment => {
        return `
        <div class="list-container" dataId=${comment.id}>
            <li class='listEl'>${comment.content}</li>
            <span class='delete-comment'><i class="fas fa-trash-alt"></i></span>
        </div>
        `
    }).join('');
    article.insertAdjacentElement('beforeend',commentList);
    renderCommentForm(post,article);
}


// create new post================================================
const createNewPost = (title,imgUrl) => {
    fetch('http://localhost:3000/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "likes": 0,
            "image": imgUrl
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(state);
    })
}


// listen to create new post=======================================
const listenToNewPost = () => {
    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = commentForm.querySelector('#title');
        const image = commentForm.querySelector('#image');
        const inputTitle = input.value;
        const imageUrl = image.value;
        setState({inputTitle:inputTitle, inputImage: imageUrl});
        createNewPost(inputTitle, imageUrl);
    })
}


// get image data==================================
const fetchImagesData = () => {
    fetch('http://localhost:3000/images')
    .then(res => res.json())
    .then(data => {
        setState({posts: data});
        state.posts = data
    })
}

// render funstions================================
const renderFn = (state)  => {
    listenToNewPost();
    state.posts.forEach(obj => {
        renderCards(obj);
        listenToDeletecomment(obj);
    });
    listenToLikeButton();
    listenToDeletePostBtn(state);
}

// init app=========================================
const init = () => {
    fetchImagesData();
}

init();