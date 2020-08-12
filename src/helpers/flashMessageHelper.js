import {hideMessage, showMessage} from 'react-native-flash-message';

const success_message = (message, description) => {
  showMessage({
    message,
    description,
    type: 'success',
    icon: 'auto',
  });
};
const error_message = (message, description) => {
  showMessage({
    message,
    description,
    type: 'danger',
    icon: 'auto',
  });
};
const warning_message = (message, description) => {
  showMessage({
    message,
    description,
    type: 'warning',
    icon: 'auto',
  });
};
const info_message = (message, description) => {
  showMessage({
    message,
    description,
    type: 'info',
    icon: 'auto',
  });
};

export {success_message, info_message, warning_message, error_message};
