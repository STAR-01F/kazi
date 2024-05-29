import CallToActionButton from "@components/CtaButton";
import { BodyComp, ImageProp, TextProp } from "../../../components";
import jobNotesImg from "@assets/job_notes.jpeg";

const title = "Detailed Job View with Personalized Notes";
const subText = [
  "Access full job descriptions for each application right from your dashboard.",
  "Record important information such as application deadlines, interview tips and contact names.",
  "Use your notes to prepare for interviews and tailor your approach to each specific job.",
];

const JobAndNotes = () => {
  return (
    <BodyComp
      imgSection={<ImageProp path={jobNotesImg} />}
      textSection={<TextProp title={title} blurbtext={subText} />}
      button={<CallToActionButton text="Personalize Your Search" />}
    />
  );
};

export default JobAndNotes;
