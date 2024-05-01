import { BodyComp, ImageProp, TextProp } from "../../../components";
import amzJobPage from "@assets/amazon-job-page.png";

const Title = "Make that jobs yours!";
const Subtext = [
  "Kazi can suggest keywords to add to your CV to help beat ATS software",
];

const imgP = <ImageProp path={amzJobPage} />;
const textP = <TextProp title={Title} subtext={Subtext} />;

const AllJobsLanding = () => {
  return <BodyComp imgSection={imgP} textSection={textP} />;
};

export default AllJobsLanding;
