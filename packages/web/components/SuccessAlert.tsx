import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface SuccessAlertProps {
  show: boolean;
  message: string;
  onClose?: () => void;
}

export default function SuccessAlert({
  show = false,
  message = "Ação concluída com sucesso!",
  onClose,
}: SuccessAlertProps) {
  const [visivel, setVisivel] = useState(show);

  useEffect(() => {
    setVisivel(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisivel(false);
        if (onClose) onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visivel) return null;

  return (
    <Alert className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-50 border-green-200 text-green-800 animate-in fade-in slide-in-from-top-5 duration-300 w-100">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle className="font-bold">Sucesso!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
