import { message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const key = 'updatable';

const notify = (data) => {
  const type = data.type;
  const mess = data.mess;
  const duration = data.duration ? data.duration : 3;
  const loading = data.loading ? data.loading : 0;
  const align = data.align ? data.align : 'center';
  loading && message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message[type]({
      content: (
        <span>
          {mess}
          <span
            style={{ marginLeft: 20 }}
            onClick={() => {
              message.destroy();
            }}
          >
            <CloseOutlined style={{ color: 'gray', cursor: 'pointer', width: 20, height: 20 }} />
          </span>
        </span>
      ),
      duration: duration,
      style: {
        textAlign: align,
      },
      key,
    });
  }, loading * 1000);
};

export { notify };
