import EventCanvas from "../../../components/admin/event/EventCanvas";
import type { NextPage, GetStaticProps } from "next";
import EventCanvasSidebar from "../../../components/admin/event/EventCanvasSidebar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// props type

type Props = {
  posts: [String];
};


// component render function
const Canvas: NextPage<Props> = () => {
  const [action, setAction] = useState<string>("");

  const sidebarClickedEvent = (_action: string) => {
    setAction(_action + "_" + uuidv4());
  };

  return (
    <div>
      <EventCanvasSidebar sideBarClickEventHandler={sidebarClickedEvent} />
      <EventCanvas gridSize={50} canvasHeight={1024} canvasWidth={1024} currentAction={action}/>
    </div>
  );
};

export default Canvas;
