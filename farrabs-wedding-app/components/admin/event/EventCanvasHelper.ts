import { fabric } from "fabric";

export function drawGridOnCanvas(
  gridSize: number,
  canvas: fabric.Canvas
): fabric.Canvas {
  for (var i = 0; i < canvas.getWidth() / gridSize; i++) {
    canvas.add(
      new fabric.Line([i * gridSize, 0, i * gridSize, canvas.getWidth()], {
        stroke: "#ccc",
        selectable: false,
      })
    );
    canvas.add(
      new fabric.Line([0, i * gridSize, canvas.getHeight(), i * gridSize], {
        stroke: "#ccc",
        selectable: false,
      })
    );
  }

  return canvas;
}

export function makeGridSnappable(
  gridSize: number,
  canvas: fabric.Canvas
): fabric.Canvas {
  canvas.on("object:moving", function (options: any) {
    if (
      Math.round((options.target.left / gridSize) * 4) % 4 == 0 &&
      Math.round((options.target.top / gridSize) * 4) % 4 == 0
    ) {
      options.target
        .set({
          left: Math.round(options.target.left / gridSize) * gridSize,
          top: Math.round(options.target.top / gridSize) * gridSize,
        })
        .setCoords();
    }
  });
  return canvas;
}

export const addTable = (
  tableCount: number,
  setTableCount: Function,
  canvi: fabric.Canvas | null | undefined) => {
  let rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 250,
    height: 100,
    angle: 0,
  });
  rect.fill;
  rect.center();
  rect.setCoords();
  var text = new fabric.Text(`Table ${tableCount}`, {
    left: 190,
    top: 140,
    fontSize: 15,
    fontFamily: "Verdana",
    fill: "white",
  });

  var group = new fabric.Group([rect, text], {
    left: 50,
    top: 50,
  });

  canvi?.add(group);
  canvi?.renderAll();
  setTableCount(tableCount + 1);
};

export const addSeat = (canvi: fabric.Canvas | null | undefined) => {
  let circle = new fabric.Circle({
    radius: 15,
    fill: "#f55",
    top: 100,
    left: 100,
  });
  circle.fill;
  circle.center();
  circle.setCoords();

  canvi?.add(circle);
  canvi?.renderAll();
};

export const groupSeatAndTable = (canvi: fabric.Canvas | null | undefined) => {
  canvi?.getActiveObjects().forEach((i) => {
    canvi.remove(i);
  });
  var group = new fabric.Group(canvi?.getActiveObjects());

  canvi?.add(group);
  canvi?.renderAll();
};

export const ungroup = (canvi: fabric.Canvas | null | undefined) => {
  canvi
    ?.getActiveObjects()
    .filter((i) => i.type == "group")
    .forEach((group) => {
      (group as fabric.Group).forEachObject((obj) => {
        (group as fabric.Group).removeWithUpdate(obj);
        canvi.add(obj);
      });
    });
};

export function deleteAndBackspaceHandler(canvas: fabric.Canvas) {
  return (key: any) =>
    (key.key == "Delete" || key.key == "Backspace") &&
    canvas.getActiveObjects().forEach((element) => {
      canvas.remove(element);
    });
}
