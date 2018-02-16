import moment from 'moment';
import dateFormat from '../constants/dateFormat';

const timeFormat = (time, format) => {
  if (time && format) {
    return moment(time).format(format);
  } else if (time && !format) {
    return moment(time).format(dateFormat);
  } else if (!time && format) {
    return moment().format(format);
  } else {
    return moment().format(dateFormat);
  }
};

export default timeFormat;
