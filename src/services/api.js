import { api } from '../utils/index';
import axios from 'axios';

const ApiServices = {
  getCoinList: () => axios.get(`${api}/ticker/24hr`)
}

export default ApiServices;
