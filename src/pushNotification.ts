import { notification } from 'antd';

import palette from 'palette';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const pushNotification = (type: NotificationType, message: string, description: string, duration = 5) => {
  notification[type]({
    message,
    description,
    placement: 'bottomRight',
    duration,
    style: { backgroundColor: palette.dadsRayOfSunshine },
  });
};

export default pushNotification;
