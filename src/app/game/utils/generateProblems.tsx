import { OperationsType } from "@/app/types/operations";
import { Problem } from "../types/Problem";

type ProblemProps = {
  maxProblems: number
  gameType: OperationsType
}

const GenerateProblems = ({maxProblems, gameType}: ProblemProps) => {
  const newProblems: Problem[] = []
  for (let i = 0; i < maxProblems; i++) {
    const { num1, num2 } = GenerateNumbers(gameType)
    newProblems.push({
      num1,
      num2,
      userAnswer: null,
      isCorrect: null,
    })
  }
  return newProblems
}

const GenerateNumbers = (gameType: OperationsType) => {
  const maxNumber = 10;

  if(gameType === "addition") {
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    return { num1, num2 }
  }

  if(gameType === "subtraction") {
    let num1, num2;

    do {
      num2 = Math.floor(Math.random() * maxNumber) + 1;
      num1 = Math.floor(Math.random() * maxNumber) + 1;
    } while (num1 < num2 );
    
    return { num1, num2 }
  }

  if (gameType === "division") {
    const maxDivisorNumber = 10
    const maxNumber = 100
    let num1, num2, multiplier;

    do {
      num2 = Math.floor(Math.random() * maxDivisorNumber) + 1;
      multiplier = Math.floor(Math.random() * (maxNumber / num2 - 1)) + 2;
      num1 = num2 * multiplier;
  } while (num1 === num2 || multiplier > 10);

    return { num1, num2 };
}

  const num1 = Math.floor(Math.random() * maxNumber) + 1;
  const num2 = Math.floor(Math.random() * maxNumber) + 1;
  return { num1, num2 }
}


export default GenerateProblems;