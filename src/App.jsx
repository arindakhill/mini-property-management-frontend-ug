import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './components/Header/Header';
import Home from './routes/Home';
import PropertyDetails from './routes/PropertyDetails';
import Footer from './components/Footer'
import HouseProvider from './context/HouseContext';
import HouseDetails from './components/PropertyDetails/HouseDetails';
import Form from './components/PropertyDetails/Form';
import OwnerDashboardComponent from './components/Owner/OwnerDashboardComponent';

import 'bootstrap/dist/css/bootstrap.min.css'


import NewOwner from './components/Owner/NewOwner';
import Owners from './components/Owner/Owners';


const App = () => {
  return (
    <HouseProvider>
      <Container maxW='container.lg' px='6'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/owner' element={<OwnerDashboardComponent/>} />
          <Route path='/new-owner' element={<NewOwner/>} />
          <Route path='/owners' element={<Owners/>} />

        
          <Route path='property-details' element={ <PropertyDetails /> } >
            <Route path=":propertyId" element={<HouseDetails />} />
          </Route>
          <Route path="/signup" element={<UserRegistration/>}/>
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
  )
}

export default App