"use client";

import React, { useState, useEffect } from "react";
import { BlockPicker } from "react-color";

interface SortingAlgorithmsVisualizerProps {
  data: number[];
}

const SortingAlgorithmsVisualizer: React.FC<
  SortingAlgorithmsVisualizerProps
> = ({ data }) => {
  const [bars, setBars] = useState<number[]>([]);
//   const [bars, setBars] = useState<number[]>([10, 10, 10, 10, 10, 10, 10, 10]);
  const [algorithm, setAlgorithm] = useState<string>("bubbleSort");
  const [highlightedBars, setHighlightedBars] = useState<number[]>([]);
  const [prevBars, setPrevBars] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animValue, setAnimValue] = useState<number>(1);
  const [barLength, setBarLength] = useState<number>(1);
  const [progressPickerColor, setProgressPickerColor] =
    useState<string>("#37d67a");
  const [barPickerColor, setBarPickerColor] = useState<string>("#37d67a");
  //   const appName = "VizzyFy";

  useEffect(() => {
    setPrevBars(bars);
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms * 100));

  const Bar: React.FC<{ height: number; index: number }> = ({
    height,
    index,
  }) => (
    <div className="mx-2 text-center">
      <div
        className="mx-1"
        style={{
          height: `${height * barLength}px`,
          width: "20px",
          backgroundColor: highlightedBars.includes(index)
            ? progressPickerColor
            : barPickerColor,
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

  useEffect(() => {
    console.log(data);
    
    setBars(data);
    setPrevBars(bars);
  }, [data]);

  //   const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  // const inputArray = e.target.value.split(",").map(Number);
  //     setBars(data);
  //     setPrevBars(bars);
  //   };

  const handlleReset = () => {
    setBars([...prevBars]);
    setHighlightedBars([]);
  };

  const bubbleSort = async (arr: number[]): Promise<void> => {
    setIsSorting(true);
    let n = arr.length;
    let swapped = false;

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
    if(swapped){
    }

    setIsSorting(false);
    // return arr;
  };

  const insertionSort = async (arr: number[]): Promise<void> => {
    setIsSorting(true);
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      setHighlightedBars([i]);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setBars([...arr]);
        await delay(animValue);
      }
      arr[j + 1] = key;
      setBars([...arr]);
      setHighlightedBars([]);
    }
    setIsSorting(false);
    // return arr;
  };

  const selectionSort = async (arr: number[]): Promise<void> => {
    setIsSorting(true);
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      for (let j = i + 1; j < n; j++) {
        setHighlightedBars([i, j]);
        if (arr[i] > arr[j]) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swapped = true;
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, animValue * 100));
        }
        setHighlightedBars([]);
      }
    }
    n--;

    setIsSorting(false);
    // return arr;
  };

  const quickSort = async (
    arr: number[],
    low = 0,
    high = arr.length - 1
  ): Promise<void> => {
    if (low >= high) return;
    setIsSorting(true);
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlightedBars([j, high]);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setBars([...arr]);
        await delay(animValue);
      }
      setHighlightedBars([]);
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setBars([...arr]);
    await quickSort(arr, low, i);
    await quickSort(arr, i + 2, high);
    setIsSorting(false);
  };

  const mergeSort = async (arr: number[]): Promise<number[]> => {
    setIsSorting(true);
    async function merge(left: number[], right: number[]) {
      const result = [],
        leftIdx = 0,
        rightIdx = 0;

      while (leftIdx < left.length && rightIdx < right.length) {
        setHighlightedBars([leftIdx, rightIdx]);
        await delay(animValue);

        if (left[leftIdx] < right[rightIdx]) {
          result.push(left[leftIdx]);
          leftIdx++;
        } else {
          result.push(right[rightIdx]);
          rightIdx++;
        }
        setBars([...result, ...left.slice(leftIdx), ...right.slice(rightIdx)]);
        await delay(animValue);
        setHighlightedBars([]);
      }
      return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
    }

    async function mergeSortHelper(arr: number[]): Promise<number[]> {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left: number[] = await mergeSortHelper(arr.slice(0, mid));
      const right: number[] = await mergeSortHelper(arr.slice(mid));

      return await merge(left, right);
    }
    const sortedArr = await mergeSortHelper(arr);
    setBars(sortedArr);
    setIsSorting(false);
    return sortedArr;
  };

  const handleSort = () => {
    const sortingAlgorithm: Record<
      string,
      (arr: number[]) => Promise<void | number[]>
    > = {
      bubbleSort,
      selectionSort,
      insertionSort,
      quickSort,
      mergeSort,
    };

    if (sortingAlgorithm[algorithm]) {
      sortingAlgorithm[algorithm]([...bars]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <h1 className="text-2xl mb-4 bg-gray-900 text-white min-w-full text-center p-6 font-light cursor-pointer " >{appName}</h1> */}

      <div className="mb-4">
        {/* <input
          type="text"
          placeholder="Enter array, e.g., 5,3,8,6"
          className="border border-gray-300 p-2 mr-4"
          onChange={handleArrayInput}
        /> */}
        <select
          className="border border-gray-300 p-2"
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="mergeSort">Merge Sort</option>
        </select>
        <div className="anim-input block mx-2 text-center items-center">
          <label className="block" htmlFor="animValue">
            Animation Value: {animValue}
          </label>
          <input
            className="inline-block"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAnimValue(Number(e.target.value));
            }}
            type="range"
            name="animation-range"
            id="animation-range"
            min={1}
            max={10}
            placeholder="2"
            defaultValue={1}
          />
        </div>
        <div className="anim-input block mx-2 text-center items-center">
          <label className="block" htmlFor="animValue">
            Bar Height: {barLength}
          </label>
          <input
            className="inline-block"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBarLength(Number(e.target.value));
            }}
            type="range"
            name="bar-length"
            id="bar-length"
            min={1}
            max={20}
            placeholder="2"
            defaultValue={1}
          />
        </div>
      </div>
      <BarVisualizer />
      <div className="buttons">
        <button
          onClick={handleSort}
          disabled={isSorting}
          className={`mt-4 mx-4 px-4 py-2 ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
        <button
          onClick={handlleReset}
          className={`mt-4 mx-4 px-4 py-2 ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white rounded`}
        >
          Reset
        </button>
      </div>
      <div className="colorPickers flex">
        <div className="text-center">
          Bar Indicators
          <BlockPicker
            className="m-4"
            color={barPickerColor}
            onChange={(color) => {
              setBarPickerColor(color.hex);
              console.log(barPickerColor);
            }}
          />
        </div>
        <div className="text-clip">
          <h3>Progress Indicators</h3>
          <BlockPicker
            className="m-4"
            color={progressPickerColor}
            onChange={(color) => {
              setProgressPickerColor(color.hex);
            }}
          />
        </div>
      </div>
      <div className="example-arr bg-green-600 rounded m-2 p-2 text-white shadow-lg">
        You can use this array for example <br />
        98, 85, 47, 39, 42, 93, 32, 60, 24, 82, 80, 92, 12, 11, 99, 45, 65, 30,
        75, 44
      </div>

      {/* <div className="footer min-w-full p-12 bg-gray-900 text-white text-center">
        &copy;Copyright by SarvT
      </div> */}
    </div>
  );
};

export default SortingAlgorithmsVisualizer;
