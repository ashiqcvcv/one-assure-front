import './App.css';
import SelectInsurancePlan from './Components/SelectInsurancePlan';
import ViewPlanDetails from './Components/ViewPlanDetails';
import CheckOut from './Components/CheckOut';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/one-assure-front' element={<SelectInsurancePlan />} />
          <Route path='/one-assure-front/view-plan-detail' element={<ViewPlanDetails />} />
          <Route path='/one-assure-front/checkout' element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
