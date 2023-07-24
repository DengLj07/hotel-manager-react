import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 图标
import {
  SettingOutlined,
  NotificationFilled,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
const { Header, Sider, Content } = Layout;
import './index.scss'

export default function () {
  // 顶部菜单项
  const items = [
    {
      label: '首页',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: '邮件',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: '通知',
      key: 'noti',
      icon: <NotificationFilled />,
    },
    {
      label: '个人中心',
      key: 'mine',
      icon: <UserOutlined />,
      children: [
        {
          key: 'my',
          label: '个人信息'
        },
        {
          key: 'pwd',
          label: '修改密码'
        },
        {
          key: 'exit',
          label: '退出系统'
        }
      ],
    }
  ];
  // 左侧菜单项
  const items2 = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: '账户管理',
      children:[
        {
          key:'1-1',
          label:'角色管理'
        },
        {
          key:'1-2',
          label:'用户管理'
        }
      ]
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: '客房管理',
      children:[
        {
          key:'2-1',
          label:'房型管理'
        },
        {
          key:'2-2',
          label:'房间管理'
        },
        {
          key:'2-3',
          label:'营业统计'
        }
      ]
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: '客户管理',
    },
  ];
  const navigate = useNavigate()
  const onClickMenu = (e)=>{
    setCurrent(e.key)
    // 判断点击的菜单项
    switch(e.key){
      case 'exit':
        // 退出系统
        sessionStorage.clear()
        localStorage.clear()
        navigate('/')
        break
    }
  }
  const [current, setCurrent] = useState('home');
  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="log">{collapsed ? '酒店' : '酒店管理系统'}</div>
        <Menu onClick={onClickMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items2}
        />
      </Sider>
      <Layout className='right'>
        <Header className='header'>
          <Button className='trigger'
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Menu onClick={onClickMenu} theme='dark' className='menu' selectedKeys={[current]} mode="horizontal" items={items} />
        </Header>
        <Content className='content'>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};