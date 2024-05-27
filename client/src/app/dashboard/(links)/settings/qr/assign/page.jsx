"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";
import { getUser } from "@/utils/auth";
import { assignQR } from "@/utils/qr"; // Asegúrate de que esta importación sea correcta

// Importar react-qr-scanner dinámicamente para evitar problemas con SSR
const QrScanner = dynamic(() => import("react-qr-scanner"), { ssr: false });

export default function Page() {
  const [userUUID, setUserUUID] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener el userUUID cuando el componente se monte
    async function fetchUserUUID() {
      try {
        const uuid = await getUser();
        setUserUUID(uuid);
      } catch (err) {
        setError("Error al obtener el UUID del usuario. Por favor, intenta nuevamente.");
      }
    }

    fetchUserUUID();

    // Verificar si el contexto es seguro (HTTPS)
    if (window.isSecureContext) {
      // Verificar la disponibilidad de la API getUserMedia
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            stream.getTracks().forEach(track => track.stop());
          })
          .catch(err => {
            setError("No se puede acceder a la cámara. Asegúrate de que los permisos están concedidos y que la cámara está disponible.");
          });
      } else {
        setError("La API de cámara no está disponible en este navegador.");
      }
    } else {
      setError("Se requiere una conexión HTTPS para acceder a la cámara.");
    }
  }, []);

  const handleScan = async (data) => {
    if (data) {
      const qrGeneralUUID = data.text;
      setScanResult(qrGeneralUUID);
      try {
        await assignQR(qrGeneralUUID, userUUID);
        router.push('/success-page'); // Redirige a una página de éxito si es necesario
      } catch (err) {
        setError("Error al realizar la acción con el UUID. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error al escanear el código QR. Por favor, intenta nuevamente.");
  };

  const previewStyle = {
    height: 400,
    width: '100%',
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Vincula tu cuenta
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Escanea el código QR para vincular tu cuenta de forma rápida y segura.
            </p>
          </div>
          <div className="w-full max-w-md">
            {error ? (
              <Alert variant="destructive">
                <TriangleAlertIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <QrScanner
                delay={300}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
              />
            )}
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium leading-none">Instrucciones:</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-500 dark:text-gray-400">
              <li>Enfoca el código QR en el área central.</li>
              <li>Sigue las instrucciones en tu dispositivo para completar el proceso.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
