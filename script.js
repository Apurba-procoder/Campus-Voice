// Load posts from localStorage or initialize empty array
let posts = JSON.parse(localStorage.getItem('posts')) || [];

const postsContainer = document.getElementById('posts-container');
const addPostBtn = document.getElementById('add-post-btn');
const postContentInput = document.getElementById('post-content');

// Render all posts
function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    // Post content
    const contentP = document.createElement('p');
    contentP.textContent = post.content;
    postDiv.appendChild(contentP);

    // Votes section
    const voteSection = document.createElement('div');
    voteSection.className = 'vote-section';

    const upvoteBtn = document.createElement('span');
    upvoteBtn.className = 'vote-btn';
    upvoteBtn.textContent = '▲ Upvote';
    upvoteBtn.onclick = () => vote(index, 1);

    const downvoteBtn = document.createElement('span');
    downvoteBtn.className = 'vote-btn';
    downvoteBtn.textContent = '▼ Downvote';
    downvoteBtn.onclick = () => vote(index, -1);

    const scoreSpan = document.createElement('span');
    scoreSpan.textContent = `Score: ${post.score}`;

    voteSection.appendChild(upvoteBtn);
    voteSection.appendChild(downvoteBtn);
    voteSection.appendChild(scoreSpan);

    postDiv.appendChild(voteSection);

    postsContainer.appendChild(postDiv);
  });
}

// Vote function: update score & save
function vote(index, value) {
  posts[index].score += value;
  savePosts();
  renderPosts();
}

// Add new post
addPostBtn.addEventListener('click', () => {
  const content = postContentInput.value.trim();
  if(content === '') {
    alert('Please enter some text before submitting.');
    return;
  }
  const newPost = {
    content: content,
    score: 0,
    timestamp: new Date().toISOString()
  };
  posts.unshift(newPost); // Newest on top
  savePosts();
  postContentInput.value = '';
  renderPosts();
});

// Save posts array to localStorage
function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Initial render on page load
renderPosts();
