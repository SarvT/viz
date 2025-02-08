"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
}

interface BinaryTreeVisualizerProps {
  data: number[];
}

const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({
  data,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [sortedValues, setSortedValues] = useState<number[]>([]);

  // newly added
  useEffect(() => {
    if (root) drawTree();
  }, [root]);
  
  // newly added
  useEffect(() => {
    if (root) {
      
      calculateNodePositions(root, 0, canvasRef.current?.width || 800, 0, 50);
      drawTree();
    }
  }, [root]);

  useEffect(() => {
    if (data.length === 0) return;

    const newRoot = createBinaryTree(data);
    setRoot(newRoot);
    drawTree();
  }, [data]);

  useEffect(() => {
    drawTree();
  }, [root]);

  const createBinaryTree = (numbers: number[]): TreeNode | null => {
    if (numbers.length === 0) return null;

    const root: TreeNode = {
      value: numbers[0],
      left: null,
      right: null,
      x: 0,
      y: 0,
    };

    for (let i = 1; i < numbers.length; i++) {
      insertNode(root, numbers[i]);
    }

    return root;
  };

  const insertNode = (node: TreeNode, value: number) => {
    if (value < node.value) {
      if (node.left === null) {
        node.left = { value, left: null, right: null, x: 0, y: 0 };
      } else {
        insertNode(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = { value, left: null, right: null, x: 0, y: 0 };
      } else {
        insertNode(node.right, value);
      }
    }
  };

  const calculateNodePositions = (
    node: TreeNode | null,
    left: number,
    right: number,
    depth: number,
    verticalSpacing: number
  ) => {
    if (node === null) return;

    const x = (left + right) / 2;
    const y = depth * verticalSpacing;

    node.x = x;
    node.y = y;

    calculateNodePositions(node.left, left, x, depth + 1, verticalSpacing);
    calculateNodePositions(node.right, x, right, depth + 1, verticalSpacing);
  };

  const drawTree = () => {
    const canvas = canvasRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate node positions
    // calculateNodePositions(root, 0, canvas.width, 0, 50);
    // newly added
    calculateNodePositions(root, 50, canvas.width - 50, 0, 50)


    // Draw the tree
    drawNode(ctx, root);

    // Draw sorted values
    if (sortedValues.length > 0) {
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `Sorted: ${sortedValues.join(", ")}`,
        canvas.width / 2,
        canvas.height - 20
      );
    }
  };

  const drawNode = (ctx: CanvasRenderingContext2D, node: TreeNode | null) => {
    if (node === null) return;

    // Draw lines to children
    if (node.left) {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(node.left.x, node.left.y);
      ctx.stroke();
    }
    if (node.right) {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(node.right.x, node.right.y);
      ctx.stroke();
    }

    // Draw node
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    // newly added
    // ctx.arc(Math.max(node.x, 20), Math.max(node.y, 20), 20, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    // Draw value
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.value.toString(), node.x, node.y);

    // Recursively draw children
    drawNode(ctx, node.left);
    drawNode(ctx, node.right);
  };

  const handleSort = () => {
    if (!root) return;

    const sorted: number[] = [];
    const inorderTraversal = (node: TreeNode | null) => {
      if (node === null) return;
      inorderTraversal(node.left);
      sorted.push(node.value);
      inorderTraversal(node.right);
    };

    inorderTraversal(root);
    setSortedValues(sorted);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        // newly added p-4
        className="border border-gray-300 mb-4"
      ></canvas>
      <Button onClick={handleSort}>Sort</Button>
    </div>
  );
};

export default BinaryTreeVisualizer;
