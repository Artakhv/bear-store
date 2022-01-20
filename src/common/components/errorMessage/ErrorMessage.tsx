import "./ErrorMessage.css";

interface IErrorMessageProps {
  errorMessageTitle: string;
  errorMessage: string;
}

function ErrorMessage(errorMessageProps: IErrorMessageProps) {
  const { errorMessageTitle, errorMessage } = errorMessageProps;
  return (
    <div className="error-message-container">
      <div className="error-box">
        <h2> {errorMessageTitle} </h2>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
