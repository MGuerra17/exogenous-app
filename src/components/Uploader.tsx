'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import XLSXDropzone from "./XLSXDropzone";
import { Transaction } from "@/interfaces/transaction";

export default function Uploader({onUpload}: {onUpload: (data: Transaction[]) => void}) { 
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Subir exógena</CardTitle>
          <CardDescription>Arrastra y suelta tu archivo aquí o haz click para seleccionar uno</CardDescription>
        </CardHeader>
        <CardContent>
          <XLSXDropzone onUpload={onUpload} />
        </CardContent>
      </Card>
    </main>
  )
}

