import { Route, Routes } from "react-router-dom";
import SalesList from "./salesList/SalesList";

const App = () => {
  return (
    <div className="p-8 ">
      <Routes>
        <Route path="/" element={<SalesList />} />
      </Routes>
    </div>
  );
};

export default App;