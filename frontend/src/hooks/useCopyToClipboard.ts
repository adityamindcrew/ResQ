import { toast } from "react-hot-toast";

function useCopyToClipboard() {
  const clipboard = (text: string | Number) => {
    navigator.clipboard
      .writeText(text.toString())
      .then(() => {
        toast.success("Text copied to clipboard");
      })
      .catch((error) => {
        toast.error("Error copying text to clipboard");
        console.error("Error copying text to clipboard:", error);
      });
  };

  return clipboard;
}

export default useCopyToClipboard;
