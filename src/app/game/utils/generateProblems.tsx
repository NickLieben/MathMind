import { Problem } from "../types/Problem";

type ProblemProps = {
  maxProblems: number
  maxNumber: number
}

const GenerateProblems = ({maxProblems, maxNumber}: ProblemProps) => {
  const newProblems: Problem[] = []
  for (let i = 0; i < maxProblems; i++) {
    newProblems.push({
      num1: Math.floor(Math.random() * maxNumber) + 1,
      num2: Math.floor(Math.random() * maxNumber) + 1,
      userAnswer: null,
      isCorrect: null,
    })
  }
  return newProblems
}


export default GenerateProblems;