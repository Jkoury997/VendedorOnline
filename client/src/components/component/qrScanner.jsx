import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

// Importar react-qr-scanner dinámicamente para evitar problemas con SSR
const QrScanner = dynamic(() => import("react-qr-scanner"), { ssr: false });

const QRScanner = forwardRef(({ error, handleScan, handleError }, ref) => {
  const previewStyle = {
    height: 400,
    width: '100%',
  };

  const videoConstraints = {
    facingMode: { exact: "environment" }
  };

  return (
    <section ref={ref} className="w-full py-4 md:py-8 lg:py-12 xl:py-16">
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
                constraints={{ video: videoConstraints }}
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
});

QRScanner.displayName = 'QRScanner';

export default QRScanner;
