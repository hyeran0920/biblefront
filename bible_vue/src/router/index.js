import { createRouter, createWebHistory } from "vue-router";
import store from "../store"; // Vuex 스토어 가져오기
import BookListMain from "../components/Book/components/BookListPage.vue";
import BookDetail from "../components/Book/components/BookDetail.vue";
import Main from "../components/MainPage/components/Main.vue";
import SignUp from "../components/Member/components/SignUp.vue";
import Login from "../components/Member/components/Login.vue";
import AdminLogin from '../components/Member/components/AdminLogin.vue'
import AdminFilter from "../components/Admin/AdminFilter.vue";
import AdminPage from "../components/Admin/AdminPage.vue";

import CartPage from "../components/Cart/components/CartPage.vue";
import OrderPage from "../components/Order/components/OrderPage.vue";

import BookRecommendation from "../components/BookRecommendation/BookRecommendation.vue";

import AddBookExcel from "../components/Admin/AdminAddBookExcel.vue";

import Mypage from "../components/Mypage/components/Mypage.vue";
import MypageMember from "../components/Mypage/components/MypageMember.vue";
import MypageReservation from "../components/Mypage/components/MypageReservation.vue"
import MypageRent from "../components/Mypage/components/MypageRent.vue";
import MyPageReview from "../components/Mypage/components/MyPageReview.vue";
import MyPageOrderList from "../components/Mypage/components/MyPageOrderList.vue";


const routes = [
  { path: "/", name: "main", component: Main },
  { path: "/book", name: "book-list", component: BookListMain },
  { path: "/book/best", name: "book-list-best", component: BookListMain },
  { path: "/book/:bookId", name: "book-detail", component: BookDetail, props: true },
  { path: "/signUp", name: "SignUp", component: SignUp },
  { path: "/login", name: "Login", component: Login },
  { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },
  { path: "/admin", name: "AdminFilter", component: AdminFilter },
  { path: "/", redirect: "/login" },

  { path: "/cart", name:"cart", component:CartPage},
  { path: "/order/:cartIds", name:"order", component:OrderPage, props:true},

  { path: "/bookRecommendation", name: "bookRecommendation", component: BookRecommendation, props: true},

  { path: "/book/excel", name:"addBookExcel", component: AddBookExcel},

  { path: "/admin-page", name: "AdminPage",component: AdminPage, beforeEnter: (to, from, next) => {
      // "/admin"을 거치지 않고 접근하면 강제 이동
      if (from.name !== "AdminFilter") {
        next("/admin"); // 필터를 먼저 거치게 강제
      } else {
        next(); // 필터를 통과한 경우만 "/admin-page"로 이동 가능
      }}, meta: { requiresAdmin: true },},

  { path: "/mypage", name: "Mypage", component: Mypage, children:[
    { path: "", redirect: "/mypage/mypageMember"},
    { path: "mypageMember", component:MypageMember },
    { path: "mypageReservation", component:MypageReservation },
    { path: "mypageRent", component:MypageRent },
    { path: "mypageReview", component:MyPageReview },
    { path: "mypageOrder", component:MyPageOrderList},
  ]},

 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});



export default router;
