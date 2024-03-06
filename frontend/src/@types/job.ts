type Job = {
  id?: string;
  title: string;
  description: string;
  company: string;
  jobLink: string;
  status?: string;
  keywords?: string;
  jobLocation?: {address?: {addressRegion: string; addressCountry: string}};
  hiringOrganization?: {logo: string};
  jobSource?: string;
};

export default Job;
