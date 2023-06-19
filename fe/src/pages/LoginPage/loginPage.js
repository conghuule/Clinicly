import { Layout } from 'antd';
import React from 'react';
import { LoginComponent } from '../../components/Login/loginComponent';
import IMAGES from '../../components/assets/images/index';
const { Content } = Layout;

const LoginPage = () => {
  return (
    <Layout>
      <Content className="min-h-full h-screen flex !flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row mb-[5rem] lg:ml-[6rem] ">
          <img src={IMAGES.logoClinicly} className="h-[100px] w-[100px] mr-8" alt="Logo" />
          <h2 className="font-medium text-primary-200 text-[80px] capitalize">Clinicly</h2>
        </div>
        <h2 className="w-full text-center justify-center items-center font-medium text-primary-200 text-[53px] lg:ml-[9rem] mb-[3rem]">
          Đăng nhập
        </h2>
        <LoginComponent className="w-[10rem]" />
      </Content>
    </Layout>
  );
};
export default LoginPage;
