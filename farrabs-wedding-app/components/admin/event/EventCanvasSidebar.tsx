import Link from "next/link";
import 'boxicons/css/boxicons.min.css';
import styles from './css/EventCanvasSidebar.module.scss';
import {useEffect, useRef, useState } from "react";

interface Props {
  sideBarClickEventHandler: Function;
}

const sidebarNavItems = [
  {
    display: "Add table",
    icon: <i className="bx bx-table"></i>,
    action: "addTable",
  },
  {
    display: "Add seat",
    icon: <i className="bx bx-chair"></i>,
    action: "addSeat",
  },
  {
    display: "Group table and seat",
    icon: <i className="bx bx-selection"></i>,
    action: "groupTableAndSeat",
  },
  {
    display: "Ungroup",
    icon: <i className="bx bx-grid-alt"></i>,
    action: "ungroup",
  },
];

const EventCanvasSidebar = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  // const location = useLocation();

  useEffect(() => {
      setTimeout(() => {
          const sidebarItem = sidebarRef?.current?.querySelector('.sidebar__menu__item');
          if (indicatorRef?.current?.style) {
            indicatorRef.current.style.height = `${sidebarItem?.clientHeight}px`;
          }
          sidebarItem && setStepHeight(sidebarItem.clientHeight);
          
      }, 50);
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    props.sideBarClickEventHandler(sidebarNavItems[index].action);
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>Design your event</div>
      <div className={styles.sidebar__menu}>
        <div className={styles.sidebar__menu__indicator}>
          {
            sidebarNavItems.map((item, index) => (
                <div className={[styles.sidebar__menu__item, activeIndex === index ? styles.sidebar__menu__item__active : ''].join(" ")} key={index} 
                  onClick={() => { handleClick(index);}}
                >
                  <div className={styles.sidebar__menu__item__icon}>
                    {item.icon}
                  </div>
                  <div className={styles.sidebar__menu__item__text}>
                    {item.display}
                  </div>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default EventCanvasSidebar;
