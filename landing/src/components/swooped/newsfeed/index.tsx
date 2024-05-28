import { BodyComp, ImageProp, TextProp } from "../../../components";
import newsFeedImg from "@assets/newsfeed-img.png";
import CallToActionButton from "@components/CtaButton";

const Title = "latest news at your fingertips";
const Subtext = [
  "Stay up to date with the latest insights from companies you've applied to.",
];

const imgP = <ImageProp path={newsFeedImg} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const NewsFeedLanding = () => {
  return (
    <BodyComp
      imgSection={imgP}
      textSection={textP}
      button={<CallToActionButton text="Stay ahead of competition" />}
    />
  );
};

export default NewsFeedLanding;
