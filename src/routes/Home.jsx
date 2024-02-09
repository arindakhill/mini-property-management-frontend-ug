import Banner from '../components/Banner'
import Search from '../components/Search/Search'
import HouseList from '../components/Houses/HouseList';
import {useContext, useRef} from 'react'
import { useAuth } from '../context/AuthContext';
import SearchFilters from '../components/Search/SearchFilters';



const Home = () => {

  const{user} = useAuth();

  const searchRef = useRef(null);

  const showSearchAndList = user && user.role !== "OWNER";

  return (
    <>
      <Banner  searchRef={searchRef}/>
      <div ref={searchRef}>
{(!user || showSearchAndList) &&
      <SearchFilters />
  }
  {(!user || showSearchAndList)&&
      <HouseList />
  }
      </div>
    </>
  )
}

export default Home;