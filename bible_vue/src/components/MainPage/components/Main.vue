<template>
  <div id="app">
    <Header />


    <div>
      <WebSocketAlarm/>
    </div>

    <main class="main">
      <div class="carousel">
        <div class="main-image" :style="{ backgroundImage: `url(${images[currentSlide]})` }"
            @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></div>
      </div>
      <div class="pagination">
        <span v-for="(image, index) in images" :key="index" class="dot" 
            :class="{ active: currentSlide === index }" @click="setSlide(index)"></span>
      </div>             
      

      <div class="main-best">
        <h3>베스트 셀러</h3>
        <div class="main-best-slider">
          <button class="prev-btn" @click="scrollLeft()">◀</button>
          <div class="bookList" ref="bookList">
            <div v-for="(book, index) in limitedBooks" :key="index" class="main-best-item">
              <div class="main-best-book-image" @click="goToBookDetail(book.bookId)">
                <img :src="getBookImageUrl(book.bookId)" :alt="book.bookTitle"/>
              </div>
              <div class="main-best-info">
                <h3 class="main-best-title">{{ book.bookTitle }}</h3>
                <p class="main-best-author">{{ book.bookAuthor }} . {{ book.bookPublisher }}</p>
              </div>
            </div>
          </div>
          <button class="next-btn" @click="scrollRight()">▶</button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue';
import WebSocketAlarm from '../../Alarm/components/WebSocketAlarm.vue';

//배너 이미지 import
const imageModules = import.meta.glob('../../../assets/banner/*.{png,jpg,jpeg,svg}', { eager: true });
const images = Object.values(imageModules).map((module) => module.default);

//api 주소
const BEST_BOOKS = "/books/best";
const BOOKS = "/books";

export default {
  name: 'Main',
  components: {
    Header,  
    Footer,
    WebSocketAlarm
  },
  computed: {
    limitedBooks(){
      return this.books.slice(0, 30);
    }
  },
  data() {
    return {
      currentSlide: 0,
      touchStartX: 0,
      touchEndX: 0,
      images,
      autoSliceInterval: null,
      books:[],
      bookId: [],
      bookTitle: [],
      bookAuthor: [],
      bookPublisher: [],
    }
  },
  methods: {
    setSlide(index) {
      this.currentSlide = index;
    },
    touchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    touchMove(e) {
      this.touchEndX = e.touches[0].clientX;
    },
    touchEnd() {
      if (this.touchStartX - this.touchEndX > 50) {
        // Swipe left
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      } else if (this.touchEndX - this.touchStartX > 50) {
        // Swipe right
        this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
      }
    },
    startAutoSlide(){
      this.autoSliceInterval = setInterval(()=>{
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      }, 3000);
    },
    stopAutoSlide(){
      clearInterval(this.images.length);
    },
    getBookImageUrl(bookId){
      return `${this.$axios.defaults.baseURL}/uploads/book-image?bookid=${bookId}`;
    },
    goToBookDetail(bookId){
      this.$router.push(`/book/${bookId}`);
    },
    scrollLeft(){
      this.$refs.bookList.scrollBy({left: -600, behavior: "smooth"});
    },
    scrollRight() {
      this.$refs.bookList.scrollBy({ left: 600, behavior: "smooth" });
    },
  },
  async mounted(){
    this.startAutoSlide();  //자동 슬라이드 시작
    try{
      const response = await this.$axios.get(BEST_BOOKS);
      this.books = response.data;

      if(this.books.length === 0) { // 인기 도서가 없을 경우
        const response = await this.$axios.get(BOOKS);
        this.books = response.data;
      }
    }catch{
        console.error("Error: ", error);
    }
  },
  beforeUnmount(){
    this.stopAutoSlide();
  }
}
</script>

<style>
/* Reset */
body, ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Main Content */
.carousel{
   display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin-top: 5px;
  padding: 0;
}

.main-image {
  height: 100%;
  width: 150%;
  background-color: #f0f0f0;
  border-radius: 8px;
  background-size: contain;
  background-position: center;
  transition: background-image 0.3s ease;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0%;
  height: 1px;
  margin: 0px;
  border-radius: 0%;
}

.dot {
  width: 5px;
  height: 5px; 
  background-color: #ccc;
  border-radius: 0%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  transform: scale(0.8);
}

.dot.active {
  background-color: #333;
  transform: scale(1);
}

.dot:not(.active):hover {
  background-color: #bbb;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .main-image {
    height: 30vh;
    border-radius: 0;
  }

  .dot {
    width: 1px;
    height: 2px;
    margin-bottom: 40px;
  }
}

.main-best-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bookList {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 10px;
  white-space: nowrap;
  padding: 30px;
  scroll-behavior: smooth;
  width: 100%;
}

.main-best-item {
  flex: 0 0 auto;
  width: 150px;
  scroll-snap-align: start;
  text-align: center;
}

.main-best-item img {
  width: 100%;
  height: 200px;
  margin: 5px;
}

.main-best-title {
  text-overflow:ellipsis;
  overflow: hidden; 
  white-space: nowrap; 
  border: none; 
  width: 85%; 
  margin: auto;
}

.main-best-author {
  text-overflow:ellipsis;
  overflow: hidden; 
  white-space: nowrap; 
  border: none; 
  width: 85%;
  margin:auto;
}

.prev-btn,
.next-btn {
  background: rgb(0, 0, 0, 0.0);
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 45px;
  color:#333
}

.prev-btn:hover,
.next-btn:hover {
  background: rgb(0, 0, 0, 0.05);
}
.main-best{
  margin-bottom: 50px;
}
.main-best h3{
  margin: 5px;
  margin-top: 30px;
}

/* 모바일에서 책 아이템 더 적게 표시 */
@media (max-width: 768px){
  .main-best-item{
    width:90px;
  }
  .prev-btn, .next-btn{
    font-size: 18px;
    width:40px;
  }
  .main-best-item img {
    width: 100%;
    height: 130px;
    margin: 1px;
  }
  .main-best-title {
    font-size: 14px;
    line-height: 1.2;
  }
  .main-best-author{
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
