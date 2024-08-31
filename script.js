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
