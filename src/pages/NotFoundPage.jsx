import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <main className="absolute inset-0 bg-zinc-200">
        <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
          <h1 className="text-8xl text-center font-black tracking-tight uppercase text-emerald-900 ">
            404 Page not found
          </h1>
          <p className="text-base font-medium text-center max-w-md">
            Sorry, we can't find the page. <br />
            This page doesn't exist!!!!
          </p>
          <Link
            to="/auth"
            className="text-sm font-semibold shadow-md shadow-black/20 bg-emerald-800 transition-all ease-linear hover:bg-emerald-400 text-white hover:text-black rounded-md px-4 py-2 flex items-center justify-center"
          >
            Go home page
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
