import {Job, Response} from 'src/@types';
import Otta from './Otta';

const Scrapper = async (
  url: string
): Promise<Response<Partial<Job>, unknown>> => {
  if (url.includes('otta')) {
    return await Otta(url);
  }
  return {status: 'Error', message: 'Link not supported yet'};
};

export default Scrapper;
