type Job = {
  id?: string;
  title: string;
  description: string;
  company: string;
  companyLogoURL: string;
  jobLink: string;
  status?: string;
  jobLocation?: {address?: {addressRegion: string; addressCountry: string}};
  hiringOrganization?: {logo: string};
  jobSource?: string;
  workableDescription: Array<string>;
  workableLocation?: string;
};

export default Job;
