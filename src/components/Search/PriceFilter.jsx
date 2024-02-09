import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

const PriceFilter = () => {
  const { price, setPrice } = useContext(HouseContext);

  const prices = [
    { value: "20000 - 30000" },
    { value: "30000 - 110000" },
    { value: "110000 - 140000" },
    { value: "140000 - 170000" },
    { value: "170000 - 200000" },
    { value: "200000 - 230000" },
    { value: "230000 - 260000" },
    { value: "260000 - 290000" },
    { value: "290000 - 320000" },
    { value: "320000 - 350000" },
    { value: "350000 - 380000" },
    { value: "380000 - 410000" },
    { value: "410000 - 440000" },
    { value: "440000 - 470000" },
    { value: "470000 - 500000" },
    
  ];

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Select value={price} onChange={priceHandler} placeholder="Select Price">
      {prices.map((price, index) =>
          <option key={index}>{price.value}</option>
        )
      }
    </Select>
  );
};

export default PriceFilter;