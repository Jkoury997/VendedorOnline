"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";
import { assignQR, getQRGeneralsByUser } from "@/utils/qr";
import QRScanner from "@/components/component/qrScanner";
import { PanelControlQr } from "@/components/component/panel-control-qr";

export default function Page() {
  const [userUUID, setUserUUID] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [qrGenerals, setQrGenerals] = useState([]);
  const [isLinkingNewQR, setIsLinkingNewQR] = useState(false);
  const router = useRouter();
  const qrLinkSectionRef = useRef(null);

  useEffect(() => {
    async function fetchUserUUID() {
      try {
        const uuid = await getUser();
        setUserUUID(uuid);
        const response = await getQRGeneralsByUser(uuid);
        setQrGenerals(response.qrGenerals);
      } catch (err) {
        setError("Error al obtener el UUID del usuario o los QR vinculados. Por favor, intenta nuevamente.");
      }
    }
    fetchUserUUID();

    if (window.isSecureContext) {
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

  useEffect(() => {
    if (isLinkingNewQR && qrLinkSectionRef.current) {
      qrLinkSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLinkingNewQR]);

  const handleScan = async (data) => {
    if (data) {
      const qrGeneralUUID = data.text;
      setScanResult(qrGeneralUUID);
      try {
        await assignQR(qrGeneralUUID, userUUID);
        router.replace(router.asPath);
      } catch (err) {
        setError("Error al realizar la acción con el UUID. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error al escanear el código QR. Por favor, intenta nuevamente.");
  };

  const handleLinkNewQR = () => {
    setIsLinkingNewQR(true);
  };

  return (
    <>
      {qrGenerals.length > 0 ? (
        <div className="panel-control-qr">
          <PanelControlQr countqr={qrGenerals.length} onLinkNewQR={handleLinkNewQR} />
        </div>
      ) : (
        !isLinkingNewQR && (
          <QRScanner
            error={error}
            handleScan={handleScan}
            handleError={handleError}
          />
        )
      )}
      {isLinkingNewQR && (
        <QRScanner
          ref={qrLinkSectionRef}
          error={error}
          handleScan={handleScan}
          handleError={handleError}
        />
      )}
    </>
  );
}
