import axios from 'axios'
import {getToken} from '@/utils/auth'
import router from '@/router/index'
import {ElMessage} from 'element-plus'

export const url = 'http://127.0.0.1:8080/api'

export const request = axios.create({
    baseURL: url
})

request.interceptors.request.use(
    (config) => {
        const token = getToken(); // 或者从其他地方获取JWT
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 跳转用户登录页方法
export const redirectLogin = () => {
    ElMessage.error('此操作需要登录，重定向至登录页')
    localStorage.setItem('oldPath', window.location.pathname)
    router.push('/login').then(() => {
    })
}
// 跳转管理员登录页方法
export const redirectAdminLogin = () => {
    ElMessage.error('此操作需要登录，重定向至登录页')
    router.push('/login').then(() => {
    })
}
// 登录成功跳回原登录页面方法
export const loginSuccess = () => {
    const redirectPath = localStorage.getItem('oldPath')
    if (redirectPath) {
        router.push(redirectPath).then(() => {
        })
    } else {
        router.push('/').then(() => {
        })
    }
}

// 管理员登录成功跳转后台
export const adminLoginSuccess = () => {
    router.push('/admin').then(() => {
    })
}

export const verifyUser = async (): Promise<Boolean> => {
    try {
        const {data} = await request.get('/protected/verifyUser')
        return data.data === '200';
    } catch (error) {
        return false
    }
}
