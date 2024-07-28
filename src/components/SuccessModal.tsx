import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function SuccessModal({handleFinish, handleClear}: {handleFinish: () => void, handleClear: () => void}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>¡Listo!</CardTitle>
          <CardDescription>Se ha descargado el archivo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-x-2">
            <Button onClick={handleFinish}
            variant='outline'>Descargar nuevamente</Button>
            <Button onClick={handleClear}>Cerrar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}