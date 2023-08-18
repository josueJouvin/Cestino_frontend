import { useState, useEffect } from "react"
import useCestino from "./useCestino"

const useProductCalculations = () => {
    const { products } = useCestino()
    const [subTotal, setSubtotal] = useState()
    const [total, setTotal] = useState()
    const [percentage, setPercentage] = useState()
    const [profit, setProfit] = useState()

    useEffect(() => {
        const calculateSubtotal = () =>{
            const subTotal = products.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)
            setSubtotal(subTotal)
        }
    calculateSubtotal()
    },[products])

    useEffect(() => {
        const calculatePercentage = () =>{
            const calc = (subTotal * percentage)/100
            setProfit(calc)
        }
        calculatePercentage()
    },[percentage, subTotal])

    useEffect(() => {
        const calculateTotal = () =>{
            const calc = percentage ? subTotal + profit : subTotal
            setTotal(calc)
        }
        calculateTotal()
    },[percentage, subTotal, profit])

  return {
    subTotal,
    total,
    percentage,
    profit,
    setPercentage
  }
}

export default useProductCalculations