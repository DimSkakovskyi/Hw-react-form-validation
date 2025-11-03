type SuccessMessageProps = {
  message: string;
  error?: string;
};

const SuccessMessage = ({ message, error }: SuccessMessageProps) => {
  if (error) return null;
  return <div className="success">{message}</div>;
};

export default SuccessMessage;
