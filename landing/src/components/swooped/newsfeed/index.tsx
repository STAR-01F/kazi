import { BodyComp, ImageProp, TextProp } from "../../../components";
import newsFeedImg from "@assets/news.png";
import CallToActionButton from "@components/CtaButton";

const Title = "latest news at your fingertips";
const Subtext = [
  "Stay up to date with the latest insights from companies you've applied to.",
  "Use the latest company news to prepare thoughtful questions and discussion points for your interviews.",
  "Demonstrate your knowledge and interest in the company’s recent developments.",
];

const imgP = <ImageProp path={newsFeedImg} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const NewsFeedLanding = () => {
  return (
    <BodyComp
      imgSection={imgP}
      textSection={textP}
      button={<CallToActionButton text="Get Company Updates" />}
    />
  );
};

export default NewsFeedLanding;
