import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react'


import Header from './components/Header/Header';
import Home from './routes/Home';
import PropertyDetails from './routes/PropertyDetails';
import Footer from './components/Footer'
import HouseProvider from './context/HouseContext';
import HouseDetails from './components/PropertyDetails/HouseDetails';
import UserRegistration from './components/auth/UserRegistration';
import HeaderComponent from './components/Owners/HeaderComponent';
import OwnerDashboardComponent from './components/Owners/OwnerDashboardComponent';

import 'bootstrap/dist/css/bootstrap.min.css'
import Form from './components/PropertyDetails/Form';
import { AuthProvider } from './context/AuthContext';
import SignInModal from './components/auth/SignInModal';
import ManageAccount from './components/auth/ManageAccount';
import OfferHistory from './components/offers/OfferHistory';


//Owner related components

import Owners from './components/Owners/Owners';
import OwnerDetails from './components/Owners/OwnerDetails'
import AddProperty from './components/Owners/AddProperty';
import PropertyList from './components/Owners/PropertyList';
import PropertyDetail from './components/Owners/PropertyDetail';
import UpdateProperty from './components/Owners/EditProperty';
import PropertyOffers from './components/Owners/PropertyOffers';
import UpdateOffer from './components/Owners/UpdateOffer';
import Layout from './Layout';
import { getPropertiesApi } from './Api/Api';
import 'bootstrap/dist/css/bootstrap.min.css'

//Admin related components
import Customers from './components/Admin/Customers';
import FavoritesList from './components/Houses/FavoritesList';



const App = () => {
  return (
    <AuthProvider>
    <HouseProvider>
      <Container maxW='8xl' px='1'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/owner' element={<OwnerDashboardComponent/>} />
          <Route path='/owners' element={<Owners/>} />

        
          <Route path='property-details' element={ <PropertyDetails /> } >
            <Route path=":propertyId" element={<HouseDetails />} />
          </Route>
          <Route path="/signup" element={<UserRegistration/>}/>
          <Route path="/signin" element={<SignInModal/>}/>
          <Route path="/manage-account" element={<ManageAccount/>}/>

          <Route path="/offer-history" element={<OfferHistory />} />
          <Route path="/favorites" element={<FavoritesList/>}/>



          <Route path="/owner" element={<OwnerDashboardComponent/>}/>
          <Route path='/owners' element={<Owners/>} />
          <Route path='/owner-detail/:oid' element={<OwnerDetails/>} />
          <Route path='/add-property' element={<AddProperty/>} />
          <Route path='/properties' element={<PropertyList/>} />
          <Route path='/property-detail' element={<PropertyDetail/>} />
          <Route path='/update-property' element={<UpdateProperty/>} />
          <Route path='/offers' element={<PropertyOffers/>} />
          <Route path='/update-offer' element={<UpdateOffer/>} />


          <Route path='/view-all-customers' element={<Customers/>} />


          <Route path="*"
                element={ <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                          </main>
                        }
          />
        </Routes>
      </Container>
      <Footer />
    </HouseProvider>
    </AuthProvider>
  )
}

export default App