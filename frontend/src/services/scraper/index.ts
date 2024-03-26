import {Job, Response} from 'src/@types';
import Otta from './Otta';
import fetchWorkable from './Workable';

const Scrapper = async (
  url: string
): Promise<Response<Partial<Job>, unknown>> => {
  if (url.includes('otta')) {
    return await Otta(url);
  }

  if (url.includes('workable')) {
    return await fetchWorkable(url);
  }
  return {status: 'Error', message: 'Link not supported yet'};
};

export default Scrapper;
