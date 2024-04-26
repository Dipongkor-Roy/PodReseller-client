import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAllProducts from "../../Hooks/useAllProducts";
import CategoryDisplayTab from "../CategoryDisp/CategoryDisplayTab";

const Category = () => {
  const { category } = useParams();
  const [products] = useAllProducts();
  const categories = ["Samsung", "Apple", "Xiaomi"];
  const initalIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initalIndex);

  const samsung = products.filter((item) => item.category === "Samsung");
  const apple = products.filter((item) => item.category === "Apple");
  const xiaomi = products.filter((item) => item.category === "Xiaomi");
  return <div>
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Samsung</Tab>
          <Tab>Apple</Tab>
          <Tab>Xiaomi</Tab>
         
        </TabList>
        <TabPanel >
      <CategoryDisplayTab item={samsung}></CategoryDisplayTab>
        </TabPanel>
        <TabPanel>
        <CategoryDisplayTab item={apple}></CategoryDisplayTab>
        </TabPanel>
        <TabPanel>
        <CategoryDisplayTab item={xiaomi}></CategoryDisplayTab>
        </TabPanel>
      </Tabs>
  </div>;
};

export default Category;
