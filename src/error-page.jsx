import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1 className="errorComponent">Page not found!</h1>
      <p className="errorComponent">Sorry, an unexpected error has occurred.</p>
      <p className="errorComponent">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}