import { createContext, useState } from "react";

export const BreadcrumbContext = createContext();

const BreadcrumbWrapper = (props) => {
  const [itemList, setItemList] = useState([]);
  return (
    <BreadcrumbContext.Provider value={{ itemList, setItemList }}>
      {props.children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbWrapper;
