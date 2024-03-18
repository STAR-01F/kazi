import Severity from './severity';

type ToasterProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: Severity;
};

export default ToasterProps;
