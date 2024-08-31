function addPost() {
    // 입력된 제목과 내용을 가져오기
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    // 제목이나 내용이 비어 있으면 경고창 띄우기
    if (title === '' || content === '') {
        alert('제목과 내용을 모두 입력하세요.');
        return;
    }

    // 게시글 컨테이너 생성
    const postContainer = document.createElement('div');
    postContainer.className = 'post';

    // 제목 요소 생성
    const postTitle = document.createElement('h2');
    postTitle.textContent = title;

    // 내용 요소 생성
    const postContent = document.createElement('p');
    postContent.textContent = content;

    // 태그 요소 생성 (기본 태그는 비워둠)
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags';

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
}
