"use client";

import { useEffect, useState } from "react";
import { BlockPicker } from "react-color";

const SortingAlgorithmsVisualizer: React.FC = () => {
  const [bars, setBars] = useState<number[]>([10, 10, 10, 10, 10, 10, 10, 10]);
  const [algorithm, setAlgorithm] = useState<string>("bubbleSort");
  const [highlightedBars, setHighlightedBars] = useState<number[]>([]);
  const [prevBars, setPrevBars] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animValue, setAnimValue] = useState<number>(1);
  const [barLength, setBarLength] = useState<number>(1);
  const [progressPickerColor, setProgressPickerColor] = useState<string>("#37d67a");
  const [barPickerColor, setBarPickerColor] = useState<string>("#37d67a");
  
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms * 100));

  const Bar: React.FC<{ height: number; index: number }> = ({ height, index }) => (
    <div className="mx-2 text-center">
      <div
        className="mx-1"
        style={{
          height: `${height * barLength}px`,
          width: "20px",
          backgroundColor: highlightedBars.includes(index) ? progressPickerColor : barPickerColor,
        }}
      ></div>
      <div className="bar-value">{height}</div>
    </div>
  );

  const BarVisualizer: React.FC = () => (
    <div className="flex items-end justify-center h-64">
      {bars.map((height, index) => (
        <Bar key={index} height={height} index={index} />
      ))}
    </div>
  );

  const bubbleSort = async (arr: number[]) => {
    setIsSorting(true);
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        setHighlightedBars([i, i + 1]);
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          setBars([...arr]);
          await delay(animValue);
        }
        setHighlightedBars([]);
      }
      n--;
    } while (swapped);
    setIsSorting(false);
  };

  const handleSort = () => {
    const sortingAlgorithm: { [key: string]: (arr: number[]) => Promise<void> } = {
      bubbleSort,
    };
    if (sortingAlgorithm[algorithm]) {
      sortingAlgorithm[algorithm]([...bars]);
    }
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputArray = e.target.value.split(",").map(Number);
    setBars(inputArray);
    setPrevBars(inputArray);
  };

  const handleReset = () => {
    setBars([...prevBars]);
    setHighlightedBars([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4 bg-gray-900 text-white min-w-full text-center p-6 font-light cursor-pointer">
        VizzyFy
      </h1>
      <div className="mb-4">
        <input type="text" placeholder="Enter array, e.g., 5,3,8,6" className="border border-gray-300 p-2 mr-4" onChange={handleArrayInput} />
        <select className="border border-gray-300 p-2" onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="bubbleSort">Bubble Sort</option>
        </select>
      </div>
      <BarVisualizer />
      <div className="buttons">
        <button onClick={handleSort} disabled={isSorting} className={`mt-4 mx-4 px-4 py-2 ${isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white rounded`}>
          {isSorting ? "Sorting..." : "Sort"}
        </button>
        <button onClick={handleReset} className={`mt-4 mx-4 px-4 py-2 ${isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"} text-white rounded`}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortingAlgorithmsVisualizer;
