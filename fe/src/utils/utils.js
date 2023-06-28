import dayjs from 'dayjs';

export const DateFormat = (date) => dayjs(date).format('DD-MM-YYYY');
