import { Link, Head } from "@inertiajs/react";

export default function ErrorPage({ status, message }) {
  const errorColors = {
    503: 'error',
    500: 'error',
    404: 'error',
    403: 'error',
  };

  const title = `${getStatusTitle(status)}`;
  const description = getStatusDescription(status);

  const errorColor = errorColors[status] || 'gray';

  function getStatusTitle(status) {
    switch (status) {
      case 503:
        return 'Service Unavailable';
      case 500:
        return 'Server Error';
      case 404:
        return 'Page Not Found';
      case 403:
        return 'Forbidden';
      default:
        return '';
    }
  }

  function getStatusDescription(status) {
    switch (status) {
      case 503:
        return 'Sorry, we are doing some maintenance. Please check back soon.';
      case 500:
        return 'Whoops, something went wrong on our servers.';
      case 404:
        return 'Sorry, the page you are looking for could not be found.';
      case 403:
        return 'Sorry, you are forbidden from accessing this page.';
      default:
        return '';
    }
  }

  return (
    <>
      <Head title={title} />
      <main className={`grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 bg-${errorColor}`}>
        <div className="text-center">
          <p className={`text-sm font-semibold text-${errorColor} uppercase tracking-wide`}>{status}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">{message || description}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/">
              Go back home
            </Link>
            <Link href="/contact">
              Contact support
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
