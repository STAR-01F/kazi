import { BodyComp, ImageProp, TextProp } from "../../../components";
import allJobsImg from "@assets/job-page-overlay.png";

const Title = "All your job applications in one place";
const Subtext =
  "Easily view, track and manage the status of all your applications";

const imgP = <ImageProp path={allJobsImg} />;
const textP = <TextProp title={Title} subtext={Subtext} />;

const AllJobsLanding = () => {
  return <BodyComp imgSection={imgP} textSection={textP} />;
};

export default AllJobsLanding;
