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
import Owners from './components/Owners/Owners';
import 'bootstrap/dist/css/bootstrap.min.css'
import NewOwner from './components/Owners/NewOwner';
import Form from './components/PropertyDetails/Form';
import { AuthProvider } from './context/AuthContext';
import SignInModal from './components/auth/SignInModal';
import ManageAccount from './components/auth/ManageAccount';
import OfferHistory from './components/offers/OfferHistory';

const App = () => {
  return (
    <AuthProvider>
    <HouseProvider>
      <Container maxW='8xl' px='1'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='property-details' element={ <PropertyDetails /> } >
            <Route path=":propertyId" element={<HouseDetails />} />
          </Route>
          <Route path="/signup" element={<UserRegistration/>}/>
          <Route path="/signin" element={<SignInModal/>}/>
          <Route path="/manage-account" element={<ManageAccount/>}/>
          <Route path="/owner" element={<OwnerDashboardComponent/>}/>
          <Route path="/offer-history" element={<OfferHistory />} />
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