export const formatDate = (timestamp) => {
    const seconds = timestamp.seconds;
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  export const randomColorGenerator = () => {
    return (
      "#" +
      Math.floor(Math.random() * 0x2f2f2f)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  export const DEFAULT_LABEL = {
    label: "None",
    color: "bg-slate-500",
    hoverColor: 'bg-slate-700'
  };