import getByCode from './get-by-code';
import getList from './get-list';

export default {
  getByCode: {
    validation: getByCode.validation,
    method: getByCode.method
  },
  getList: {
    method: getList.method
  }
};
