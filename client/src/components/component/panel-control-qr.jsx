import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { MapIcon, QrCodeIcon, CameraIcon } from "lucide-react";

export function PanelControlQr({ countqr, onLinkNewQR }) {
  return (
    <div className="flex flex-col p-2">
      <div className="flex-1 p-2">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Panel de control</CardTitle>
            <CardDescription>Resumen de los códigos QR vinculados a su cuenta</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:border-gray-800 w-full md:w-1/2">
                <QrCodeIcon className="w-8 h-8 text-gray-900 dark:text-gray-50" />
                <div className="grid gap-1">
                  <div className="font-medium">Total de códigos QR</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{countqr} códigos QR vinculados</div>
                </div>
              </div>
              <div
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:border-gray-800 w-full md:w-1/2">
                <MapIcon className="w-8 h-8 text-gray-900 dark:text-gray-50" />
                <div className="grid gap-1">
                  <div className="font-medium">Ubicaciones</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">En proceso de desarrollo</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={onLinkNewQR}>
              <CameraIcon className="w-4 h-4 mr-2" />
              Vincular nuevo QR por cámara
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
