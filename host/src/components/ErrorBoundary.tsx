import { useRouteError } from "react-router";

function createRemoteErrorBoundary(name: string) {
  return function RemoteErrorBoundary() {
    const error = useRouteError();

    console.error(`${name} remote failed`, error);

    return (
      <section>
        <h2>{name} unavailable</h2>
        <p>
          We couldn't load the {name.toLowerCase()} module.
        </p>  
        <button
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </section>
    );
  };
}

export const ProductErrorBoundary =
  createRemoteErrorBoundary("Product");

export const CartErrorBoundary =
  createRemoteErrorBoundary("Cart");