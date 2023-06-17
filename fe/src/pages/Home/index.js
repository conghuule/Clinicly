import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import HeaderBar from '../../components/HeaderBar';

export default function Home() {
  return (
    <div>
      <HeaderBar title="Tổng quan" icon={faChartSimple} image="" name="Nguyen Long Vu" role="Bac si" />
      Home
    </div>
  );
}
