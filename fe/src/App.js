import {
  faChalkboardUser,
  faChartSimple,
  faFileInvoiceDollar,
  faHospitalUser,
  faPills,
  faRectangleList,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import HeaderBar from './components/HeaderBar';

function App() {
  return (
    <div className="App">
      <HeaderBar
        title="Tổng quan"
        icon={faChartSimple}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
      <HeaderBar
        title="Danh sách đợi khám"
        icon={faUserClock}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
      <HeaderBar
        title="Danh sách khám"
        icon={faRectangleList}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
      <HeaderBar
        title="Bệnh nhân"
        icon={faHospitalUser}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
      <HeaderBar
        title="Kho thuốc"
        icon={faPills}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
      <HeaderBar
        title="Hoá đơn"
        icon={faFileInvoiceDollar}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
      <HeaderBar
        title="Quản lý"
        icon={faChalkboardUser}
        image="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=826&t=st=1686372367~exp=1686372967~hmac=5ed72ea4c0a2bb32e07d6864e95e4ecabbc08b4d2ae0a9a712482a46bacdad4f"
        name="Nguyen Long Vu"
        role="Bac Si"
      />
    </div>
  );
}

export default App;
