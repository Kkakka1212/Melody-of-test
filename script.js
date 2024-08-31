function previewImages() {
    imagePreview.innerHTML = ''; // 이전 이미지 미리보기 삭제
    const files = document.getElementById('files').files;

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.src = event.target.result;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.onclick = function() {
                imageItem.remove(); // 미리보기에서 이미지 항목 삭제
                // 이 부분은 실제로 업로드된 파일에서 해당 이미지를 제거하지 않습니다.
            };

            imageItem.appendChild(img);
            imageItem.appendChild(deleteButton);
            imagePreview.appendChild(imageItem);
        };

        reader.readAsDataURL(file);
    });
}
function likePost(button) {
    let likeCount = button.querySelector('.like-count');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function filterPosts(tag) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        if (post.dataset.tags.includes(tag)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function searchPosts() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.getAttribute('data-title').toLowerCase();
        const tags = post.getAttribute('data-tags').toLowerCase();
        if (title.includes(filter) || tags.includes(filter)) {
            post.style.display = "";
        } else {
            post.style.display = "none";
        }
    });
}

function toggleComments(element) {
    const commentSection = element.nextElementSibling;
    if (commentSection.style.display === "block") {
        commentSection.style.display = "none";
        element.textContent = "댓글 보기";
    } else {
        commentSection.style.display = "block";
        element.textContent = "댓글 숨기기";
    }
}
function toggleComments(element) {
    const commentSection = element.nextElementSibling;

    if (commentSection.style.display === 'block') {
        commentSection.style.display = 'none';
        element.textContent = '댓글 보기';
    } else {
        commentSection.style.display = 'block';
        element.textContent = '댓글 숨기기';
    }
}
function searchPosts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.getAttribute('data-title').toLowerCase();
        const tags = post.getAttribute('data-tags').toLowerCase();

        if (title.includes(input) || tags.includes(input)) {
            post.style.display = ''; // 해당 게시글을 보이도록 설정
        } else {
            post.style.display = 'none'; // 해당 게시글을 숨기도록 설정
        }
    });
}
<script>
    // 좋아요 버튼 클릭 시 좋아요 수 증가 및 취소
    function likePost(button) {
        // 현재 버튼 상태와 게시글의 좋아요 수 확인
        const likeCountSpan = button.querySelector('.like-count');
        let likeCount = parseInt(likeCountSpan.textContent, 10);
        const isLiked = button.classList.contains('liked');

        if (isLiked) {
            // 좋아요 취소
            likeCount--;
            button.classList.remove('liked');
        } else {
            // 좋아요 추가
            likeCount++;
            button.classList.add('liked');
        }

        // 좋아요 수 업데이트
        likeCountSpan.textContent = likeCount;
    }

    // 게시글을 로컬 스토리지에 저장하는 함수
    function savePost() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const tags = Array.from(document.querySelectorAll('.selected-tags .tag')).map(tag => tag.textContent);
        const files = document.getElementById('files').files;

        // 게시글 데이터를 객체로 구성
        const post = {
            title,
            content,
            tags,
            files: Array.from(files).map(file => URL.createObjectURL(file)),
            likes: 0  // 초기 좋아요 수
        };

        // 로컬 스토리지에 저장
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        // 게시글 작성 후 폼 초기화
        document.getElementById('postForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
        document.querySelectorAll('.selected-tags .tag').forEach(tag => tag.remove());
    }

    // 게시글 로드
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const container = document.querySelector('.container');

        posts.forEach(post => {
            // 게시글 HTML 구조 생성
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${post.content}</p>
                <div class="image-preview">
                    ${post.files.map(file => `<img src="${file}" alt="첨부 이미지">`).join('')}
                </div>
                <button class="like-btn" onclick="likePost(this)">좋아요 <span class="like-count">${post.likes}</span></button>
                <div class="toggle-comments" onclick="toggleComments(this)">댓글 보기</div>
                <div class="comment-section">
                    <h3>댓글</h3>
                    <textarea rows="3" placeholder="댓글을 작성하세요..."></textarea>
                    <button type="button">댓글 달기</button>
                </div>
            `;

            container.appendChild(postDiv);
        });
    }

    // 페이지 로드 시 게시글 불러오기
    document.addEventListener('DOMContentLoaded', loadPosts);

    // 게시글 저장 버튼 클릭 이벤트 추가
    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출 방지
        savePost();
    });
<script>
    // 좋아요 버튼 클릭 시 좋아요 수 증가 및 취소
    function likePost(button) {
        // 현재 버튼 상태와 게시글의 좋아요 수 확인
        const likeCountSpan = button.querySelector('.like-count');
        let likeCount = parseInt(likeCountSpan.textContent, 10);
        const isLiked = button.classList.contains('liked');

        if (isLiked) {
            // 좋아요 취소
            likeCount--;
            button.classList.remove('liked');
        } else {
            // 좋아요 추가
            likeCount++;
            button.classList.add('liked');
        }

        // 좋아요 수 업데이트
        likeCountSpan.textContent = likeCount;
    }

    // 게시글을 로컬 스토리지에 저장하는 함수
    function savePost() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const tags = Array.from(document.querySelectorAll('.selected-tags .tag')).map(tag => tag.textContent);
        const files = document.getElementById('files').files;

        // 게시글 데이터를 객체로 구성
        const post = {
            title,
            content,
            tags,
            files: Array.from(files).map(file => URL.createObjectURL(file)),
            likes: 0  // 초기 좋아요 수
        };

        // 로컬 스토리지에 저장
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        // 게시글 작성 후 폼 초기화
        document.getElementById('postForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
        document.querySelectorAll('.selected-tags .tag').forEach(tag => tag.remove());
    }

    // 게시글 로드
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const container = document.querySelector('.container');

        posts.forEach(post => {
            // 게시글 HTML 구조 생성
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${post.content}</p>
                <div class="image-preview">
                    ${post.files.map(file => `<img src="${file}" alt="첨부 이미지">`).join('')}
                </div>
                <button class="like-btn" onclick="likePost(this)">좋아요 <span class="like-count">${post.likes}</span></button>
                <div class="toggle-comments" onclick="toggleComments(this)">댓글 보기</div>
                <div class="comment-section">
                    <h3>댓글</h3>
                    <textarea rows="3" placeholder="댓글을 작성하세요..."></textarea>
                    <button type="button">댓글 달기</button>
                </div>
            `;

            container.appendChild(postDiv);
        });
    }

    // 페이지 로드 시 게시글 불러오기
    document.addEventListener('DOMContentLoaded', loadPosts);

    // 게시글 저장 버튼 클릭 이벤트 추가
    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출 방지
        savePost();
    });
</script>
