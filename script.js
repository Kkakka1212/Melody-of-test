function addPost() {
    // 입력된 제목, 내용 및 태그를 가져오기
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const tags = document.getElementById('post-tags').value;

    // 제목이나 내용이 비어 있으면 경고창 띄우기
    if (title === '' || content === '') {
        alert('제목과 내용을 모두 입력하세요.');
        return;
    }

    // 게시글 컨테이너 생성
    const postContainer = document.createElement('div');
    postContainer.className = 'post';
    postContainer.setAttribute('data-tags', tags);

    // 제목 요소 생성
    const postTitle = document.createElement('h2');
    postTitle.textContent = title;

    // 내용 요소 생성
    const postContent = document.createElement('p');
    postContent.textContent = content;

    // 태그 요소 생성
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags';
    tags.split(',').forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag.trim();
        tagsContainer.appendChild(tagElement);
    });

    // 생성된 요소들을 컨테이너에 추가
    postContainer.appendChild(postTitle);
    postContainer.appendChild(tagsContainer);
    postContainer.appendChild(postContent);

    // 게시글 목록에 추가
    const postsContainer = document.getElementById('posts-container');
    postsContainer.insertBefore(postContainer, postsContainer.firstChild);

    // 입력 필드 초기화
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-tags').value = '';
}

function searchPosts() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const tags = post.getAttribute('data-tags').toLowerCase();

        if (title.includes(query) || content.includes(query) || tags.includes(query)) {
            post.style.display = '';
        } else {
            post.style.display = 'none';
        }
    });
}
