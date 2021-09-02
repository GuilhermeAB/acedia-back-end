import getList from './get-list';
import post from './post';

export default {
  post: {
    validation: post.validation,
    method: post.method
  },
  getList: {
    method: getList.method
  }
};
