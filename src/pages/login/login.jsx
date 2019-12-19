import React, { Component } from 'react'
import {
    Form,
    Input,
    Icon,
    Button,
    message,
    } from 'antd'
import  logo from '../../assets/images/logo.png'
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
import {reqLogin}  from  '../../api/index'
import   storageUtils from  '../../utils/storageUtils'



const Item = Form.Item
/* 登录的路由组件*/
class Login extends Component {



    handleSubmit = (event) => {
        
        event.preventDefault()
    
    // 进行表单所有控件的校验
    this.props.form.validateFields(async (err, values) => {
        if (!err) {
            // 校验成功
            const {username, password} = values
            const result = await reqLogin(username, password)
            if(result.status === 0) {
                // 提示登录成功
                message.success('登录成功', 2)
                // 保存用户数据
                const user = result.data
                storageUtils.saveUser(user)
                // 保存用户登录信息
                memoryUtils.user = user
                // 跳转到主页面
                this.props.history.replace('/')
            } else {
                // 登录失败, 提示错误
                message.error(result.msg)
            }
        } else {
            // 校验失败
            console.log(err)
         }
        })
    }

/**
* 自定义表单的校验规则
*/
    validator = (rule, value, callback) => {
                // console.log(rule, value)
                const length = value && value.length
                const pwdReg = /^[a-zA-Z0-9_]+$/
                if (!value) {
                // callback 如果不传参代表校验成功， 如果传参代表校验失败， 并且会提示错误
                callback('必须输入密码')
                } else if (length < 4) {
                callback('密码必须大于 4 位')
                } else if (length > 12) {
                callback('密码必须小于 12 位')
                } else if (!pwdReg.test(value)) {
                callback('密码必须是英文、 数组或下划线组成')
                } else {
                callback() // 必须调用 callback
            }
    }


    render() {
        const form = this.props.form
        const {getFieldDecorator} = form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                

                <section className='login-content'>
                <h3>用户登陆</h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                        {
                        getFieldDecorator('username', {
                         rules: [
                            {required: true, whitespace: true, message: '必须输入用户名'},
                            {min: 4, message: '用户名必须大于 4 位'},
                            {max: 12, message: '用户名必须小于 12 位'},
                            {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、 数组或下划线组成'},
                         ],
                         initialValue: 'admin' //指定初始值
                         })(
                          <Input prefix={<Icon type="user" 
                          style={{color:'rgba(0,0,0,.25)'}}/>} 
                          placeholder="用户名"/>
                            )
                        }
                    </Item>

                    <Item>
                        {
                          getFieldDecorator('password', {
                            rules: [
                                // 自定义表单校验规则
                              {validator: this.validator}
                            ]
                        })(
                        <Input prefix={<Icon type="lock" 
                        style={{color:'rgba(0,0,0,.25)'}}/>} 
                        type="password"
                        placeholder="密码"/>
                        )
                        }
                    </Item>

                <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                登录
                </Button>
                </Item>
                </Form>
                </section>
            </div>
        )
   }
 } 
            /* 用
            户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于 4 位
            3). 必须小于 12 位
            4). 必须是英文、 数组或下划线组成
            */

const WrapLogin = Form.create()(Login)
export default WrapLogin
