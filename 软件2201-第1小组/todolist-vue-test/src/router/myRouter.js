//定义全局路由: 页面组件之间的跳转逻辑关系

//导入vue-router函数
import {createWebHistory,createRouter} from 'vue-router'

//需要路由的页面组件,都需要导入,再定义路由关系
import AdminIndex from "../components/admin/AdminIndex.vue";
import Login from "../components/login/Login.vue"
import UserInfo from "../components/common/UserInfo.vue"
import AdminHome from "../components/admin/AdminHome.vue"
import UserList from "../components/admin/UserList.vue"
import TodoList1 from "../components/admin/TodoList1.vue"
import TodoList2 from "../components/admin/TodoList2.vue"
import DepartmentList from "../components/admin/DepartmentList.vue";
import GoodsManage from "../components/admin/GoodsManage.vue";
import StorageManage from "../components/admin/StorageManage.vue";
import CharacterManage from "../components/admin/CharacterManage.vue";

//创建路由模式
const history = createWebHistory()
//定义路由组件
const router = createRouter({
    history,// 路由模式
    routes: [
        {
            path: '/',          //浏览器访问 / 时,重定向到/login
            redirect: 'login'
        },
        {//所有的组件要跳转，必须先命名路由
            path: '/login',     //访问的url
            name: 'login',
            component: Login    //页面组件名称
        },
        {//所有的组件要跳转，必须先命名路由
            path: '/admin/index',
            name: 'adminindex',
            component: AdminIndex,
            children:[//adminindex组件包含的子组件
                { path: '/admin/login', redirect: to => '/login'},
                { path: '/admin/home', name: 'adminhome', component: AdminHome },
                { path: '/admin/userinfo', name: 'admin/userinfo', component: UserInfo },
                { path: '/admin/userlist', name: 'userlist', component: UserList },
                { path: '/admin/departmentlist', name: 'departmentlist', component: DepartmentList },
                { path: '/admin/todolist1', name: 'todolist1', component: TodoList1 },
                { path: '/admin/todolist2', name: 'todolist2', component: TodoList2 },
                { path: '/admin/goodsmanage', name: 'goodsmanage', component: GoodsManage},
                { path: '/admin/storagemanage', name: 'storagemanage', component: StorageManage},
                { path: '/admin/charactermanage', name: 'charactermanage', component: CharacterManage},
            ]
        },
    ]
})
//全局路由守护，必须登录后，才能访问vue中的页面组件
router.beforeEach(async (to, from) => {
    let userInfo = sessionStorage.getItem('userInfo');
    // 检查用户是否已登录 ，并且要访问的url不等于/login 避免无限重定向
    if (!userInfo && to.path !== '/login') {
        // 重定向到登录页面
        return { path: '/login' }
    }
})
export default router;