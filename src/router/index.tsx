import React, { lazy, ReactNode } from 'react'
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';

const Login = lazy(() => import('../pages/login'))
const AdminList = lazy(() => import('../pages/admin/AdminList'))
const Dashboard = lazy(() => import('../pages/index/Dashboard'))
const Admin = lazy(() => import('../pages/admin/Admin'))
const Page404 = lazy(() => import('../pages/error/Page404'))
const RoleList = lazy(() => import('../pages/role/RoleList'))
const UserList = lazy(() => import('../pages/user/UserList'))
const CategoryList = lazy(() => import('../pages/category/CategoryList'))
export interface IRoute {
    path: string
    title: string
    redirect?: string
    component?: ReactNode
    icon?: ReactNode
    exact?: boolean
    children?: IRoute[]
}

export const leftRoute: IRoute[] = [
    {
        path: '/admin/dashboard',
        title: '仪表盘',
        component: <Dashboard />,
        icon: <DashboardOutlined />,
        exact: true
    },
    {
        path: '/admin/admin',
        title: '管理员',
        redirect: '/admin/admin/list',
        exact: true,
        icon: <UserOutlined />,
        children: [
            {
                path: '/admin/admin/list',
                title: '管理员管理',
                component: <AdminList />,
                icon: <UserOutlined />,
            },
            {
                path: '/admin/admin/detail',
                title: 'react中的hook',
                component: <Admin />,
                icon: <UserOutlined />,
            },
        ]
    },
    {
        path: '/admin/role',
        title: '角色管理',
        exact: true,
        icon: <UserOutlined />,
        children: [
            {
                path: '/admin/role/list',
                title: '角色列表',
                icon: <UserOutlined />,
                component: <RoleList />
            }
        ]
    },
    {
        path: '/admin/user',
        title: '用户管理',
        exact: true,
        icon: <UserOutlined />,
        children: [
            {
                path: '/admin/user/list',
                title: '用户列表',
                icon: <UserOutlined />,
                component: <UserList />
            }
        ]
    },
    {
        path: '/admin/category',
        title: '分类',
        icon: <UserOutlined />,
        children: [
            {
                path: '/admin/category/list',
                title: '分类列表',
                icon: <UserOutlined />,
                component: <CategoryList />
            }
        ]
    }
]
export const authRoute: IRoute[] = [
    ...leftRoute
]
export const unAuthRoute: IRoute[] = [
    {
        path: '/login',
        title: '登录',
        component: <Login />
    },
    {
        path: "*",
        title: '404',
        component: <Page404 />
    }
]
const router: IRoute[] = [
    ...authRoute,
    ...unAuthRoute
]
export default router
