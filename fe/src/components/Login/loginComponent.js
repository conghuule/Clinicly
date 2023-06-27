import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import authApi from '../../services/authApi';

export const LoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const { data } = await authApi.login(email, password);
      sessionStorage.setItem('user_id', data.id);
      navigate(config.routes.home);
    } catch (error) {
      const {
        response: {
          data: { message },
        },
      } = error;
      setErrorMessage(message);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={(values) => handleSubmit(values)}
    >
      <Form.Item
        label="Email"
        name="email"
        type="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input className="lg:w-[35rem]" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        type="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password className="lg:w-[35rem]" />
      </Form.Item>

      <p className="ml-[110px] text-danger">{errorMessage}</p>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
        <Checkbox>Ghi nhớ mật khẩu</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" size="large" shape="round" className="text-white lg:w-[35rem]">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
