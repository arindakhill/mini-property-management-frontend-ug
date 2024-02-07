import { Flex } from '@chakra-ui/react';
import Footer from './components/Footer'; // Import your Footer component

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex flex="1">{children}</Flex> {/* Page content goes here */}
      <Footer />
    </Flex>
  );
};

export default Layout;
