import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
      <Loader2 className="md:h-20 md:w-20 h-8 w-8 text-emerald-700 animate-spin" />
    </div>
  );
};

export default LoadingScreen;
