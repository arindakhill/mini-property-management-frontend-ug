import Banner from '../components/Banner'
import Search from '../components/Search/Search'
import HouseList from '../components/Houses/HouseList';
import {useRef} from 'react'



const Home = () => {

  const searchRef = useRef(null);

  return (
    <>
      <Banner  searchRef={searchRef}/>
      <div ref={searchRef}>
      <Search />
      <HouseList />
      </div>
    </>
  )
}

export default Home;