import { Transaction } from "@/interfaces/transaction"
import { useEffect, useState } from "react"

interface CategorizerProps {
  transaction: Transaction
  currentTransactionIndex: number
  length: number
  onSave: (category: string, index: number) => void
  handleFinish: () => void
}

export default function useCategorizer({
  transaction,
  currentTransactionIndex,
  length,
  onSave,
  handleFinish
}: CategorizerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (transaction.category) {
      setActiveCategory(transaction.category)
    } else {
      setActiveCategory(null)
    }
  }, [transaction])

  const handleCategoryPress = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null)
      return
    }

    setActiveCategory(category)
  }

  const handleNext = () => {
    if (activeCategory === null) return
    onSave(activeCategory, currentTransactionIndex)
    if (currentTransactionIndex === length - 1) {
      setTimeout(() => {
        handleFinish()
      }, 200)
    }
  }

  return {
    activeCategory,
    handleCategoryPress,
    handleNext
  }
}