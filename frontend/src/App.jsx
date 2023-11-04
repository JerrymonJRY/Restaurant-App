import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';

import Login from './Components/userPages/login'
import Dashboard from './Components/Dashboard/dashboard'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AddCategory from './Components/Category/AddCategory'
import ViewCategory from './Components/Category/ViewCategory'
import ViewIngredientUnit from './Components/Ingredient/unit/viewIngredientUnit'
import AddIngredientUnit from './Components/Ingredient/unit/AddIngredientUnit'
import ViewIngredients from './Components/Ingredient/ingredients/viewingredients'
import AddIngredients from './Components/Ingredient/ingredients/addingredients'
import AddVat from './Components/vat/addVat'
import ViewVat from './Components/vat/viewVat'
import AddTable from './Components/table/addTable'
import ViewTable from './Components/table/viewTable'
import AddFoodCategory from './Components/Foodcategory/addFoodcategory'
import ViewFoodCategory from './Components/Foodcategory/viewFoodcategory'
import AddFoodMenu from './Components/Foodmenu/addfoodmenu'
import ViewFoodMenu from './Components/Foodmenu/viewfoodmenu'
import EditCategory from './Components/Category/EditCategory'
import Pos from './Components/Pos/Pos'
import EditFoodCategory from './Components/Foodcategory/editFoodcategory'
import EditIngredientUnit from './Components/Ingredient/unit/EditIngredientUnit'
import EditTable from './Components/table/editTable'
import EditVat from './Components/vat/editVat'
import AddWaiter from './Components/Waiter/addWaiter'
import ViewWaiter from './Components/Waiter/viewWaiter'
import EditWaiter from './Components/Waiter/editWaiter'
import ViewCustomer from './Components/Customer/viewCustomer'
import AddCustomer from './Components/Customer/addCustomer'
import EditCustomer from './Components/Customer/editCustomer'
import ViewPosOrder from './Components/Orders/viewPosorder'
import ViewPosOrderdetails from './Components/Orders/viewOrderdetails'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} ></Route>
      <Route path='/dashboard' element={<Dashboard />} ></Route>
      {/* Food Ingredient Category */}
      <Route path='/addingredientfoodcategory' element={<AddCategory/>}></Route>
      <Route path='/viewingredientfoodcategory' element={<ViewCategory />}></Route>
      <Route path='/editingrdientfoodcategory/:id' element={<EditCategory />}></Route>
      {/* Food Ingredient Unit */}
      <Route path='/viewingredientunit' element={<ViewIngredientUnit />}></Route>
      <Route path='/addingredientunit' element={<AddIngredientUnit />}></Route>
      <Route path='/editingredientunit/:id' element={<EditIngredientUnit />}></Route>

      {/* Food Ingredients */}
      <Route path='/viewingredients' element={<ViewIngredients />}></Route>
      <Route path='/addingredients' element={<AddIngredients />}></Route>
      {/* Food Vat */}
      <Route path='/addVat' element={<AddVat />}></Route>
      <Route path='/viewVat' element={<ViewVat />}></Route>
      <Route path='/editVat/:id' element={<EditVat />}></Route>
      {/* Table */}
      <Route path='/addTable' element={<AddTable />}></Route>
      <Route path='/viewTable' element={<ViewTable />}></Route>
      <Route path='/editTable/:id' element={<EditTable />} ></Route>
      {/* Food Category */}
      <Route path='/addfoodcategory' element={<AddFoodCategory />}></Route>
      <Route path='/editfoodcategory/:id' element={<EditFoodCategory />}></Route>
      <Route path='/viewfoodcategory' element={<ViewFoodCategory />}></Route>
      {/* food Menu */}
      <Route path='/addfoodmenu' element={<AddFoodMenu />}></Route>
      <Route path='/viewfoodmenu' element={<ViewFoodMenu />}></Route>
      {/* Waiter */}
      <Route path='/addWaiter' element={<AddWaiter />}></Route>
      <Route path='/viewWaiter' element={<ViewWaiter />}></Route>
      <Route path='/editWaiter/:id' element={<EditWaiter />}></Route>
      {/* Pos */}
      <Route path='/pos' element={<Pos />}></Route>
      <Route path='/posorder' element={<ViewPosOrder />}></Route>
      <Route path='/posorderdetails/:id' element={<ViewPosOrderdetails />}></Route>

      {/* Customer  */}
      <Route path='/viewCustomer' element={<ViewCustomer />}></Route>
      <Route path='/addCustomer' element={<AddCustomer />}></Route>
      <Route path='/editCustomer/:id' element={<EditCustomer />}></Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App
