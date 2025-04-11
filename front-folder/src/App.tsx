import { Route, Routes } from "react-router-dom";
import SalesList from "./salesList/SalesList";
import CreateNewSale from "./salesList/CreateNewSale";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="p-8 overflow-hidden">
      <Routes>
        <Route path="/" element={<SalesList />} />
        <Route path="/newSale" element={<CreateNewSale />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;