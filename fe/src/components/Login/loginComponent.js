import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import authApi from '../../services/authApi';

export const LoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log('values: ', values);
    // TODO: handle remember account here
    const { email, password } = values;

    try {
      await authApi.login(email, password);
      navigate(config.routes.home);
    } catch (error) {
      console.log('error: ', error);
      const {
        response: {
          data: { message },
        },
      } = error;
      setErrorMessage(message);
    }

    // fetch('https://clinicly.fly.dev/api/v1/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    //   credentials: 'include',
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
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
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" size="large" shape="round" className="text-white lg:w-[35rem]">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
