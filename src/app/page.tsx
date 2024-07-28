'use client'
import Categorizer from "@/components/Categorizer"
import Uploader from "@/components/Uploader"
import useTransactions from "@/hooks/useTransactions"
import { Status } from "@/interfaces/transaction"

export default function Home() {
  const {
    transactions,
    currentTransactionIndex,
    status,
    handleChangeCategory,
    handleBack,
    handleFinish,
    handleClear,
    setTransactions
  } = useTransactions()

  if (transactions.length < 1) return <Uploader onUpload={setTransactions} />
  
  return (
    <Categorizer 
      transaction={transactions[currentTransactionIndex]} 
      currentTransactionIndex={currentTransactionIndex} 
      length={transactions.length} 
      onSave={handleChangeCategory} 
      handleBack={handleBack}
      handleFinish={handleFinish}
      showSuccess={status === Status.Success}
      handleClear={handleClear}
    />
  )
}