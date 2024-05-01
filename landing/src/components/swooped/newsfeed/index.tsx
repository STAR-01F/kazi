import { BodyComp, ImageProp, TextProp } from "../../../components";
import newsFeedImg from "@assets/newsfeed-img.png";

const Title = "The latest news at your fingertips";
const Subtext = [
  "Stay up to date with the latest insights from your saved companies",
];

const imgP = <ImageProp path={newsFeedImg} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const NewsFeedLanding = () => {
  return <BodyComp imgSection={imgP} textSection={textP} />;
};

export default NewsFeedLanding;
