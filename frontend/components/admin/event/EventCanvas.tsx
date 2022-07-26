import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import {
  drawGridOnCanvas,
  makeGridSnappable,
  addSeat,
  addTable,
  groupSeatAndTable,
  ungroup,
  saveCanvas,
  deleteActiveObjects,
  deleteAndBackspaceHandler,
} from "./EventCanvasHelper";

interface Props {
  gridSize: number;
  canvasWidth: number;
  canvasHeight: number;
  currentAction: String;
}

export default function EventCanvas(props: Props) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [tableCount, setTableCount] = useState<number>(0);

  useEffect(() => {
    console.log("XXX");
    let _canvas = initCanvas();
    setCanvas(_canvas);
    let canvasDeleteHandler = deleteAndBackspaceHandler(_canvas);
    window.addEventListener("keyup", canvasDeleteHandler);
    return () => {
      _canvas.dispose();
      window.removeEventListener("keyup", canvasDeleteHandler);
    };
  }, []);

  useEffect(() => {
    if (props.currentAction.startsWith("addTable")) {
      addTable(tableCount, canvas);
      setTableCount(tableCount + 1);
    }

    if (props.currentAction.startsWith("addSeat")) {
      addSeat(canvas);
    }

    if (props.currentAction.startsWith("groupTableAndSeat")) {
      groupSeatAndTable(canvas);
    }

    if (props.currentAction.startsWith("ungroup")) {
      ungroup(canvas);
    }

    if (props.currentAction.startsWith("save")) {
      saveCanvas(canvas);
    }

    if (props.currentAction.startsWith("delete")) {
      deleteActiveObjects(canvas);
    }

  }, [props.currentAction]);

  const initCanvas = () => {
    let _canvas = new fabric.Canvas("canvas", {
      height: props.canvasHeight,
      width: props.canvasWidth,
      backgroundColor: "white",
    });
    return makeGridSnappable(
      props.gridSize,
      drawGridOnCanvas(props.gridSize, _canvas)
    );
  };

  return (
    <div>
      <canvas
        id="canvas"
        style={{ border: "1px solid #000" }}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </div>
  );
}
