// import { Form, Input, Button, Checkbox } from 'antd';
import { Form, Input, Button } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
// import { FormProps } from 'antd/lib/form/Form'
import './style.css'

interface FormFields {
  password: string
  [key: string]: any
}

const NormalLoginForm = () => {
  const onFinish = (values: FormFields) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {/* <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item> */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm
