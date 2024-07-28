'use client'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ChevronLeftIcon from "./icons/ChevronLeftIcon"
import SuccessModal from "./SuccessModal"
import CategoryOption from "./CategoryOption"
import useCategorizer from "@/hooks/useCategorizer"
import { Transaction } from "@/interfaces/transaction"
import { CATEGORIES } from "@/constants/categories"

interface CategorizerProps {
  transaction: Transaction
  currentTransactionIndex: number
  length: number
  showSuccess: boolean
  onSave: (category: string, index: number) => void
  handleBack: () => void
  handleFinish: () => void
  handleClear: () => void
}

export default function Categorizer({ 
  transaction,
  currentTransactionIndex,
  length,
  showSuccess,
  onSave,
  handleBack,
  handleFinish,
  handleClear
}: CategorizerProps) {
  const {activeCategory, handleCategoryPress, handleNext} = useCategorizer({
    transaction,
    currentTransactionIndex,
    length,
    onSave,
    handleFinish
  })

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b flex items-center justify-center px-6 py-4">
        <div className="flex items-center gap-x-24">
          <Button variant="outline" size="icon" onClick={handleBack} disabled={currentTransactionIndex === 0}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <h1 className="font-semibold text-lg">Movimiento #{currentTransactionIndex + 1}</h1>
          <p className="text-muted-foreground">{currentTransactionIndex + 1}/{length}</p>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Detalles del movimiento</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1">
              <div className="text-muted-foreground">Nombre/Razón social</div>
              <div className="font-medium">{transaction.name}</div>
            </div>
            <div className="grid gap-1">
              <div className="text-muted-foreground">Detalle</div>
              <div>{transaction.detail}</div>
            </div>
            <div className="grid gap-1">
              <div className="text-muted-foreground">Uso declaración sugerida</div>
              <div>{transaction.extra}</div>
            </div>
            <div className="grid gap-1">
              <div className="text-muted-foreground">Valor</div>
              <div className="font-medium text-2xl">{transaction.value.toLocaleString('es-CO', {currency: 'COP', style: 'currency'})}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {CATEGORIES.map(({ name, className }) => (
                  <CategoryOption
                    key={name}
                    name={name}
                    color={className}
                    active={activeCategory === name}
                    onPress={() => handleCategoryPress(name)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end" onClick={handleNext}>
              <Button disabled={activeCategory == null}>
                {currentTransactionIndex === length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      {showSuccess && <SuccessModal handleFinish={handleFinish} handleClear={handleClear} />}
    </div>
  )
}




