import add from './methods/add';
import exists from './methods/exists';
import getByCode from './methods/get-by-code';
import getById from './methods/get-by-id';
import getList from './methods/get-list';

export type PersonGenderType = {
  _id?: string,
  code?: string,
};

export default {
  exists: exists,
  add: add,
  getById: getById,
  getByCode: getByCode,
  getList: getList
};
