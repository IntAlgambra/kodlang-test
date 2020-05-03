import 'materialize-css/dist/css/materialize.min.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import '../css/style.css';
import Quill from 'quill'

var quill = new Quill('#editor', {
  theme: 'snow',
});

//Для наполнения контентом при тестировании фронта с webpack-dev-server
// const articlesRow = document.querySelector('.articles .row');
// const articleCard = articlesRow.querySelector('.col');


// for (let i = 0; i < 8; i++) {
//   articlesRow.appendChild(articleCard.cloneNode(true));
// }

class ArticleForm {
  constructor() {
    this.form = document.querySelector('#input-article-form');
    this.submitBtn = this.form.querySelector('#send-button');
    this.title = this.form.querySelector('#input-article-title');
    this.imageInput = document.querySelector('#article-img-input');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.sendData();
    })
  }

  collectData() {
    const data = new FormData();
    if (this.imageInput.files.length !== 0) {
      data.append("file", this.imageInput.files[0], this.imageInput.files[0].name);
    }
    data.append('title', this.title.value);
    data.append('text', quill.getText());
    return data
  }

  async sendData() {
    const data = this.collectData()
    const response = await fetch('api/articles/', {
      method: 'post',
      body: data,
    });
    console.log(response.status);
  }
}

class App {
  constructor() {
    this.articlesContainer = document.querySelector('.articles .row');
    this.mainArticleContainer = document.querySelector('.main-article');
    this.articles = [];
    this.form = new ArticleForm()
    this.setFormEvents();
    this.renderPage();
  }

  renderPage() {
    const path = window.location.pathname
    console.log(path)
    if (path === '/addArticle') {
      document.querySelector('.main-article').classList.add('d-none');
      document.querySelector('.articles').classList.add('d-none');
      document.querySelector('.line').classList.add('d-none');
      document.querySelector('.add-article-container').classList.remove('d-none')
    }
  }

  setFormEvents() {
    const imgInput = document.querySelector('#article-img-input');
    imgInput.addEventListener('change', App.previewImg);
  }

  static previewImg() {
    const imgInput = document.querySelector('#article-img-input');
    const img = document.querySelector('.image-container').querySelector('img');
    let reader = new FileReader();
    reader.onload = (e) => {
      img.setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(imgInput.files[0])
    img.setAttribute('style', 'display: flex');
  }

  async getArticles() {
    const response = await fetch('api/articles');
    const articles = await response.json();
    this.articles = JSON.parse(articles)
  }

  static renderArticle(article) {
    const html = `
    <div class="col s4">
      <div class="article card z-depth-0 d-flex-column align-items-center">
          <span class="align-self-start">${article.timePosted}</span>
          <img src="/static/frontend/articles_images/${article.imagePath}" alt="article img" class="responsive-img">
          <span class="highlighted-text">Профессии будущего</span>
          <h5>${article.title}</h5>
          <div class="article-socials d-flex-row align-self-start">
            <div class="likes-container d-flex-row align-items-center">
                <img src="/static/frontend/likes_icon.svg" alt="likes icon">
                <span>25</span>
            </div>
            <div class="comments-container d-flex-row align-items-center">
                <img src="/static/frontend/comments_icon.svg" alt="comments icon">
                <span>25</span>
            </div>
            <div class="views-container d-flex-row align-items-center">
                <img src="/static/frontend/views_icon.svg" alt="views icon">
                <span>25</span>
            </div>
          </div>
      </div>
    </div>
    `
    return html
  }

  static renderMainArticle(article) {
    const html = `
    <div class="row">
      <div class="main-article-content col s7">
          <div class="main-article-socials d-flex-row align-items-center">
              <span>NEW</span>
              <div class="likes-container d-flex-row align-items-center">
                  <img src="/static/frontend/likes_icon.svg" alt="likes icon">
                  <span>25</span>
              </div>
              <div class="comments-container d-flex-row align-items-center">
                  <img src="/static/frontend/comments_icon.svg" alt="comments icon">
                  <span>25</span>
              </div>
              <div class="views-container d-flex-row align-items-center">
                  <img src="/static/frontend/views_icon.svg" alt="views icon">
                  <span>25</span>
              </div>
          </div>
          <h3>${article.title}</h1>
          <p>
              ${article.text.slice(0, 100)}...
          </p>
          <a class="button">Читать</a>
      </div>
      <div class="main-article-img col s5">
          <img src="/static/frontend/articles_images/${article.imagePath}" alt="article image">
      </div>
    </div>
    `
    return html
  }

  async renderArticles() {
    await this.getArticles();
    this.mainArticleContainer.innerHTML = App.renderMainArticle(this.articles[0])
    this.articles.slice(1).forEach((article) => {
      this.articlesContainer.insertAdjacentHTML('beforeend', App.renderArticle(article))
    })
  }

  async sendArticle() {
    const form = document.forms.articleForm;
    const title = document.querySelector('#input-article-title').value;
    const text = quill.getText();
    const imageInput = document.querySelector('#article-img-input');
    const data = new FormData();
    if (imageInput.files.length !== 0) {
      data.append("file", imageInput.files[0], imageInput.files[0].name);
    }
    data.append('title', title);
    data.append('text', text);
    const response = await fetch('api/articles/', {
      headers:{
        "X-CSRFToken": getCookie('csrftoken')
      },
      method: 'post',
      body: data,
    });
    console.log(response.status);
    form.reset()
  }
}

const app = new App();
app.renderArticles();
