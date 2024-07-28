'use client'
import { UploadIcon } from "lucide-react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { useCallback, useState } from "react";
import * as XLSX from 'xlsx';
import { useDropzone } from "react-dropzone";

interface XLSXDropzoneProps {
  onUpload: (data: any[]) => void
}

export default function XLSXDropzone({ onUpload }: XLSXDropzoneProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

      const extractedData = jsonData.slice(19).map((row) => ({
        nit: row[0] as string,
        name: row[1] as string,
        detail: row[4] as string,
        value: row[5] as number,
        extra: row[6] as string
      })).filter((row) => !!row.value);
      
      onUpload(extractedData);
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'file/*': ['.xlsx', '.xls'],
    }
  });
  
  return (
    <div
      {...getRootProps()}
      className="group relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted transition-colors duration-300 hover:border-primary"
    >
      <div className="space-y-2 text-center">
        <UploadIcon className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-primary" />
        <p className="text-muted-foreground group-hover:text-primary">Arrastra y suelta tu archivo aquí</p>
        <Button variant="outline">
          {loading ? <Spinner /> : 'Seleccionar archivo'}
          <input type="file" accept=".xlsx" className="hidden" {...getInputProps()} />
        </Button>
      </div>
    </div>
  )
}