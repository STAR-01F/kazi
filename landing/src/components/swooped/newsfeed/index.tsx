import { BodyComp, ImageProp, TextProp } from "../../../components";
import newsFeedImg from "@assets/newsfeed-img.png";

const Title = "The latest news at your fingertips";
const Subtext = [
  "Stay up to date with up to date insights from your saved companies",
];

const imgP = <ImageProp path={newsFeedImg} />;
const textP = <TextProp title={Title} subtext={Subtext} />;

const NewsFeedLanding = () => {
  return <BodyComp imgSection={imgP} textSection={textP} />;
};

export default NewsFeedLanding;
