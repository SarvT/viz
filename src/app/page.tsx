"use client";

import { useState } from "react";
import BinaryTreeVisualizer from "./components/BinaryTreeVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import AlgorithmSelector from "./components/AlgorithmSelector";
import InputForm from "./components/InputForm";
import SortingAlgorithmsVisualizer from "./components/SortingAlgorithmsVisualizer";

export default function Home() {
  const initialMaze = Array(10)
    .fill(null)
    .map(() => Array(10).fill(false));
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("binaryTree");
  const [inputData, setInputData] = useState<number[]>([]);
  // const [maze, setMaze] = useState<boolean[][]>([]);

  const handleAlgorithmChange = (algorithm: string) => {
    console.log(inputData);
    
    setSelectedAlgorithm(algorithm);
    setInputData([]);
    // setMaze([]);
  };

  const handleInputSubmit = (data: number[] | boolean[][]) => {
    if (Array.isArray(data[0])) {
      // setMaze(data as boolean[][]);
    } else {
      setInputData(data as number[]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Algorithm Visualizer</h1>
      <AlgorithmSelector onSelect={handleAlgorithmChange} />
      <InputForm onSubmit={handleInputSubmit} algorithm={selectedAlgorithm} />
      {selectedAlgorithm === "binaryTree" && (
        <BinaryTreeVisualizer data={inputData} />
      )}
      {selectedAlgorithm === "sorting" && (
        <SortingAlgorithmsVisualizer data={inputData}/>
      )}
      {selectedAlgorithm === "pathfinding" && (
        <PathfindingVisualizer initialMaze={initialMaze} />
      )}
    </main>
  );
}
