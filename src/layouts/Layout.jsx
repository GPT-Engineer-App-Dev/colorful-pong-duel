import { Box, Flex, Text } from "@chakra-ui/react";
import { FaShip } from "react-icons/fa";

const Layout = ({ children }) => (
  <Flex direction="column" minHeight="100vh">
    <Flex as="header" bg="blue.800" color="white" p={4} align="center">
      <FaShip size="24px" />
      <Text fontSize="2xl" ml={2}>Port Management App</Text>
    </Flex>
    <Box as="main" flex="1" p={4} bg="gray.100">
      {children}
    </Box>
    <Flex as="footer" bg="blue.800" color="white" p={4} justify="center">
      <Text>© 2023 Port Management App</Text>
    </Flex>
  </Flex>
);

export default Layout;