import { HttpSerivce } from './http.service';

class UserService extends HttpSerivce {
  constructor() {
    super();
  }

  loginUser(fields) {
    return this.post({
      url: 'login',
      data: {...fields},
    })
  }

  verifyUser(fields) {
    return this.post({
      url: 'verify',
      data: {...fields},
    })
  }

  resetUser(fields) {
    return this.post({
      url: 'reset',
      data: {...fields},
    })
  }

  registerUser(fields) {
    return this.post({
      url: 'register',
      data: {...fields},
    })
  }

  changeData(fields) {
    return this.post({
      url: 'changeData',
      data: {...fields},
    })
  }

}

export const userSerivce = new UserService();
export default userSerivce;
