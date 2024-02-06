import { Flex, Heading, Button,  HStack, chakra, ButtonGroup, useBreakpointValue, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavMobile from './NavMobile';
import Dashboard from '../Owner/OwnerDashboardComponent';

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='center' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='3xl' color='pink.700'>Real estate.</Heading>
        </Link>
        {
          isDesktop ? (
          <>
            <ButtonGroup as='nav' variant='link' spacing='5'>
                {
                  ['Home', 'Features', 'About Us',''].map((item)=>(
                    <Button fontSize='16px' key={item}>{item}</Button>
                    ))
                }
            </ButtonGroup>

            <HStack>
            <Link to='/owner'><Button size='sm' variant='solid'>Owner</Button></Link>
              <Button size='sm' variant='solid'>Contact</Button>
              <Button size='sm' variant='outline'>Sign up</Button>
            </HStack>
          </>
          ) : (
            <NavMobile />
          )
        }
      </Flex>
      {/* <Divider color='pink.800' w={}='20px' />  */}
    </chakra.header>
  )
}

export default Header