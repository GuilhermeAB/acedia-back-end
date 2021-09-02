import type {PersonGenderType} from '../PersonGender';
import add from './methods/add';
import getList from './methods/get-list';

export type PersonType = {
  _id?: string,
  name?: string,
  birthDate?: Date,
  gender?: PersonGenderType | null,
};

export default {
  add: add,
  getList: getList
};
