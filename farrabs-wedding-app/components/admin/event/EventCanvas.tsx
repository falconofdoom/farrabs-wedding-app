import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import {
  drawGridOnCanvas,
  makeGridSnappable,
  addSeat,
  addTable,
  groupSeatAndTable,
  ungroup,
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
      addTable(tableCount, setTableCount, canvas);
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
      <h1>Event Canvas</h1>
      <button
        onClick={(e) =>
          addTable(tableCount, setTableCount, canvas)
        }
      >
        Add Table
      </button>
      <button onClick={(e) => addSeat(canvas || undefined)}>Add Seat</button>
      <button onClick={(e) => groupSeatAndTable(canvas || undefined)}>
        Group Seat and Table
      </button>
      <button onClick={(e) => ungroup(canvas || undefined)}>Ungroup</button>
      <canvas
        id="canvas"
        style={{ border: "1px solid #000" }}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </div>
  );
}
