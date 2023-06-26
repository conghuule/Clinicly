import React from 'react';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InvoiceForm from '../../components/Form/InvoiceForm';
import HeaderBar from '../../components/HeaderBar';
import { Button } from 'antd';
import config from '../../config';
import invoiceAPI from '../../services/invoiceAPI';

export default function InvoiceDetail() {
  const { id } = useParams();
  const [invoiceDetail, setInvoiceDetail] = useState({});
  // TODO: get bill detail here
  useEffect(() => {
    getInvoiceDetail(id);
  });
  async function getInvoiceDetail(id) {
    const res = await invoiceAPI.getInvoiceDetail(id);
    const json = res.data;
    setInvoiceDetail(json.data);
  }

  return (
    <div>
      <HeaderBar title="Hoá đơn" icon={faFileInvoiceDollar} image="" name="Nguyen Long Vu" role="Bac si" />
      <div className="mt-[20px] flex justify-between">
        <Link to={config.routes.invoices}>
          <Button type="primary">Trở về</Button>
        </Link>
      </div>
      <h3 className="text-[32px] font-semibold mt-[20px]">Chi tiết hoá đơn {invoiceDetail.id}</h3>
      <InvoiceForm invoice={invoiceDetail} />
    </div>
  );
}
