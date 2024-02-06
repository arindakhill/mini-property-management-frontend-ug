import { Flex, Heading, Button,  HStack, chakra, ButtonGroup, useBreakpointValue, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavMobile from './NavMobile';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const navigate = useNavigate();

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='left' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='5xl' color='pink.700'>NestQuest</Heading>
        </Link>
        {
          isDesktop ? (
          <>
            <ButtonGroup as='nav' variant='link' spacing='10'>
                {
                  ['Buy', 'Rent', 'Sell', 'About Us'].map((item)=>(
                    <Button fontSize='18px' key={item} >{item}</Button>
                    ))
                }
            </ButtonGroup>

            <HStack spacing ='4'>
            <Button size='md' variant='solid' onClick={()=>(navigate("/owner"))} bg="pink.500">Owner</Button>
              <Button size='md' variant='solid'>Sign In</Button>
              <Button size='md' variant='outline' onClick={()=>(navigate("/signup"))}>Sign up</Button>
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