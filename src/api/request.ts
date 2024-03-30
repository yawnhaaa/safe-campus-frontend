import axios from 'axios'
import {getToken} from '@/utils/auth'
import router from '@/router/index'
import {ElMessageBox} from 'element-plus'

export const url = 'http://127.0.0.1:8080/api'

export const request = axios.create({
    baseURL: url
})

export const requestJWT = axios.create({
    baseURL: url
})

// 跳转登录页方法
const redirectLogin = () => {
    localStorage.setItem('oldPath', window.location.pathname)
    router.push('/login')
}
// 登录成功跳回原登录页面方法
export const loginSuccess = () => {
    const redirectPath = localStorage.getItem('oldPath')
    if (redirectPath) {
        router.push(redirectPath)
    } else {
        router.push('/')
    }
}

// 检测登录状态
export const useLogin = async () => {
    if (await verifyUser()) {
        router.push('/')
    }
}

// 请求后端验证token
export const verifyUser = async (): Promise<boolean> => {
    try {
        const body = {
            user: localStorage.getItem('user'),
            jwt: getToken()
        }

        const {data} = await request.post('/verifyUser', body)
        // 假设 data.data 是一个布尔值
        return data.data
    } catch (error) {
        return false // 如果请求失败，则返回 false
    }
}

requestJWT.interceptors.request.use(
    async (config) => {
        const token = getToken()
        const status = await verifyUser()
        if (token && status) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            await new Promise((resolve, reject) => {
                ElMessageBox.alert('需要登录', '注意', {
                    confirmButtonText: '确认',
                    callback: () => {
                        redirectLogin()
                        reject('Need login')
                    }
                })
            })
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 管理员登录成功跳转后台
export const adminLoginSuccess = () => {
    router.push('/admin')
}
// admin验证 Token
export const verifyAdmin = async (): Promise<boolean> => {
    try {
        const body = {
            user: 'admin',
            jwt: getToken()
        }

        const {data} = await request.post('/verifyUser', body)
        // 假设 data.data 是一个布尔值
        return data.data
    } catch (error) {
        return false // 如果请求失败，则返回 false
    }
}
