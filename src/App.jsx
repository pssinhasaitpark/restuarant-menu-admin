import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./view/layout/DashboardLayout";
import Dashboard from "./view/pages/Dashboard/Dashboard";

import Login from "./view/pages/Login/Login";
import "./App.css";
import MenuList from "./view/components/Lists/MenuList";
import Customers from "./view/pages/customers/Customers";
// import RestaurantForm from "./view/components/Forms/RestaurantForm";
import RestaurantList from "./view/components/Lists/ResturantsList";
import RestaurantTableList from "./view/components/Lists/RestaurantTableList";
import CreatetableForm from "./view/components/Forms/CreateTableForm";
import Profile from "./view/pages/Profile/Profile"
// import Review from "./view/pages/Review/Review"
import StaffForm from "./view/pages/StaffForm/StaffForm";
import Menu from "./view/components/Forms/menu";
import Support from "./view/components/Lists/Support";
import StaffList from "./view/components/Lists/StaffList";

function App() {
  return (
    <Routes>
      {/* Login Page without Sidebar & Header */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout for Authenticated Pages */}
      <Route element={<DashboardLayout />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/menulist" element={<MenuList />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/restaurantform" element={<RestaurantList />} />
        <Route path="/createtable" element={<CreatetableForm />} />
        <Route path="/createlist" element={<RestaurantTableList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/staffform" element={<StaffForm />} />
        <Route path="/stafflist" element={<StaffList />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
    </Routes>
  );
}

export default App;
