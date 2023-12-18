import { useAppPath } from '@/tools/router/router'
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Flex, Grid, GridItem, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { FaUserGroup } from 'react-icons/fa6'
import { MdAccountBalance } from 'react-icons/md'

const logoutOption: LogoutOptions = {
  logoutParams: {
    returnTo: window.location.origin
  }
}

const RootPage = () => {
  const pathName = useAppPath()
  const { logout } = useAuth0()
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Flex bg="teal" h={'60px'} minWidth="max-content" alignItems="center" p={2}>
        <Box>
          <Heading>{pathName}</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="red" onClick={() => logout(logoutOption)}>
            Logout
          </Button>
        </Box>
      </Flex>
      <Grid templateAreas={`"nav main"`} gridTemplateRows={'1fr'} gridTemplateColumns={'150px 1fr'} h="calc(100vh - 60px)">
        <GridItem area={'nav'} p={2} borderRight="2px" borderColor="gray">
          <Button leftIcon={<IoHome />} justifyContent="flex-start" colorScheme="teal" variant="ghost" width="100%" onClick={() => navigate('/app/home')}>
            Home
          </Button>
          <Button
            leftIcon={<FaUserGroup />}
            justifyContent="flex-start"
            colorScheme="teal"
            variant="ghost"
            width="100%"
            onClick={() => navigate('/app/groups')}
          >
            Groups
          </Button>
          <Button
            leftIcon={<MdAccountBalance />}
            justifyContent="flex-start"
            colorScheme="teal"
            variant="ghost"
            width="100%"
            onClick={() => navigate('/app/bankaccounts')}
          >
            Accounts
          </Button>
        </GridItem>
        <GridItem pl="2" area={'main'} p={2}>
          <Outlet />
        </GridItem>
      </Grid>
    </React.Fragment>
  )
}

export { RootPage }
