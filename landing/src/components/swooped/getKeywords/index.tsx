import { BodyComp, ImageProp, TextProp } from "../../../components";
import amzJobPage from "@assets/amazon-job-page.png";

const Title = "Make that jobs yours!";
const Subtext = [
  "Kazi can suggest keywords to add to your CV to help beat ATS software",
  "Practice with AI generated interview questions",
  "Create notes in preparation of your interview",
];

const imgP = <ImageProp path={amzJobPage} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const ATS = () => {
  return <BodyComp imgSection={imgP} textSection={textP} />;
};

export default ATS;
