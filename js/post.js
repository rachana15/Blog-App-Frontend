const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
  getPost();
};

const getPost = () => {
  const postId = getPostIdParam();
  const url = `${API_URL}${postId}`;
  console.log(url);
  fetch(url, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      buildPost(data);
    });
};

const buildPost = data => {
  let postContent = "";
  const postImage = `${API_BASE_URL}${data.post_image}`;
  const postDate = new Date(parseInt(data.added_date)).toDateString();
  postContent = `
    <div id="individual-post-title">${data.title}</div>
    <div id="individual-post-date">Published on ${postDate}</div>
    <div id="ndividual-post-content">${data.content}</div>
  `;
  document.querySelector("header").style.backgroundImage = `url(${postImage})`;
  document.querySelector(".post-container").innerHTML = postContent;
};

const getPostIdParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
};
