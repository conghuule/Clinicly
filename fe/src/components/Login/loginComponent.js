import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { AuthContext } from '../../context/authContext';
import authApi from '../../services/authApi';

export const LoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      const { data } = await authApi.login(email, password);
      localStorage.setItem('auth_data', JSON.stringify(data));
      authContext.setAuth(data);
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

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          shape="round"
          className="text-white lg:w-[35rem] mt-[12px]"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
