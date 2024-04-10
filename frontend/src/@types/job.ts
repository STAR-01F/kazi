type Job = {
  id?: string;
  title: string;
  description: string;
  company: string;
  companyLogo: string | null;
  jobLink: string;
  status?: string;
  jobLocation?: {address?: {addressRegion: string; addressCountry: string}};
  hiringOrganization?: {logo: string};
  jobSource?: string;
  workableDescription: Array<string>;
  workableLocation?: string;
};

export default Job;
