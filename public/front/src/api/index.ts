import api from '../services/api';

const verifyServerIsOn = async (): Promise<any> => {
  return api.head('/').then((response) => response.data);
};

export default {
  verifyServerIsOn,
};
