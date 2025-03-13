"use client";
import "../../app/globals.css";
import { Button, Card, Input } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import useGameSetting from "./hooks/useGameSetting";


export default function GamePage() {
  const { 
    startGame,
    handleSubmit,
    MAX_PROBLEMS,
    resetGame,
    inputRef,
    problems,
    currentProblemIndex,
    gameTime,
    gameState,
    userAnswer,
    setUserAnswer
  } = useGameSetting()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {gameState === "ready" && (
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Teste de Matemática</h1>
          <p className="mb-6">Responda 10 problemas de adição o mais rápido possível.</p>
          <Button onClick={startGame} >
            Começar
          </Button>
        </Card>
      )}

      {gameState === "playing" && (
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="mb-4 text-sm">
            Problema {currentProblemIndex + 1} de {MAX_PROBLEMS}
          </div>

          <Card className="p-8 w-full mb-6">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="text-3xl font-bold mb-6">
                {problems[currentProblemIndex].num1} + {problems[currentProblemIndex].num2} =
              </div>

              <Input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-center text-2xl p-6 w-32 mb-4"
                autoFocus
                required
              />

              <Button type="submit">
                Próximo
              </Button>
            </form>
          </Card>
        </div>
      )}

      {gameState === "finished" && (
        <div className="w-full max-w-4xl">
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Resultados</h2>
            <p className="text-center mb-6">Tempo total: {gameTime} segundos</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {problems.map((problem, index) => {
                const correctAnswer = problem.num1 + problem.num2
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-md flex items-center justify-between ${
                      problem.isCorrect ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <div>
                      {problem.num1} + {problem.num2} = {problem.userAnswer}
                    </div>
                    <div className="flex items-center">
                      {problem.isCorrect ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="flex items-center">
                          <CloseIcon className="h-5 w-5 text-red-600 mr-1" />
                          <span className="text-sm text-gray-600">({correctAnswer})</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="flex justify-center">
            <Button onClick={resetGame} >
              Tentar Novamente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
