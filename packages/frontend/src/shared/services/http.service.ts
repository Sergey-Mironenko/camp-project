import axios from 'axios';
import 'dotenv/config';

export class HttpSerivce {
  constructor(private baseUrl = process.env.SERVER_URL, private fetchingService = axios, private apiVersion = 'api') {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion
  }

  private getFullApiUrl(url) {
    return `${this.baseUrl}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      'Authorization': localStorage.getItem('token'),
    }
  }

  get(config, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.get(this.getFullApiUrl(config.url));
  }

  post(config, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.post(this.getFullApiUrl(config.url), config.data);
  }

  put(config, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.patch(this.getFullApiUrl(config.url), config.data);
  }

  patch(config, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.patch(this.getFullApiUrl(config.url), config.data);
  }

  delete(config, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.patch(this.getFullApiUrl(config.url), config.data);
  }
}

export const httpSerivce = new HttpSerivce();
export default httpSerivce;
