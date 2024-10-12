import { Link } from "react-router-dom";

export const LogoBar = () => {
  return (
    <Link
      to="/"
      className="font-extrabold text-xl tracking-tighter dark:text-white"
    >
      Work<span className="text-emerald-500">Tracker</span>
    </Link>
  );
};
