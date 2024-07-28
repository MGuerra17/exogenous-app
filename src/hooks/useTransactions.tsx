import { Status, Transaction } from "@/interfaces/transaction"
import { generateXLSXFile } from "@/lib/transactions"
import saveAs from "file-saver"
import { useState } from "react"
import JSConfetti from 'js-confetti'

export default function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(0)
  const [status, setStatus] = useState<Status>(Status.Pending)

  const handleChangeCategory = (category: string, index: number) => {
    const newTransactions = [...transactions]
    newTransactions[index].category = category
    setTransactions(newTransactions)
    if (index === transactions.length - 1) return
    setCurrentTransactionIndex(index + 1)
  }

  const handleBack = () => {
    setCurrentTransactionIndex(currentTransactionIndex - 1)
  }

  const handleFinish = () => {
    const transactionsXLSXFile = generateXLSXFile({ transactions })
    const jsConfetti = new JSConfetti()
    saveAs(transactionsXLSXFile, 'data.xlsx');
    setStatus(Status.Success)
    jsConfetti.addConfetti()
  };

  const handleClear = () => {
    setTransactions([])
    setCurrentTransactionIndex(0)
    setStatus(Status.Pending)
  }

  return {
    transactions,
    currentTransactionIndex,
    status,
    handleChangeCategory,
    handleBack,
    handleFinish,
    handleClear,
    setTransactions
  }
}