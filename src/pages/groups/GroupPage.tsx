import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button, Flex, Spacer, useBoolean, IconButton } from '@chakra-ui/react'
import { CreationGroupDialog } from './CreationGroupDialog'
import { FaGear } from 'react-icons/fa6'

interface IGroupBasePageProps {
  groupIndexDTO: GroupIndexDTO[]
}

const GroupsPagePage = (props: IGroupBasePageProps) => {
  const [groups, setGroups] = React.useState(props.groupIndexDTO)
  const [open, setOpen] = useBoolean()
  const { getUserGroups } = useGroupServiceApi()
  const navigate = useNavigate()

  const onCreate = async () => {
    const data = await getUserGroups()
    setGroups(data)
    setOpen.off()
  }

  const onClickGroupButton = (groupId: string) => {
    navigate('/app/group/' + groupId)
  }

  return (
    <>
      <CreationGroupDialog open={open} handleCancel={() => setOpen.off()} handleCreate={onCreate} />
      <Flex>
        <Heading as="h1" colorScheme="blue">
          List of groups
        </Heading>
        <Spacer />
        <Button colorScheme="green" onClick={() => setOpen.on()}>
          Create group
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Group id</Th>
              <Th>Group name</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groups.map(group => {
              return (
                <Tr key={group.groupId}>
                  <Td>{group.groupId}</Td>
                  <Td>{group.groupName}</Td>
                  <Td>
                    <IconButton colorScheme="teal" aria-label="Search database" icon={<FaGear />} onClick={() => onClickGroupButton(group.groupId)} />
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

const GroupsPage = () => {
  const { getUserGroups } = useGroupServiceApi()
  const [groupDTOs, setGroupDTOs] = useState<GroupIndexDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserGroups().then(data => {
      setGroupDTOs(data)
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading} maxW={'1000px'}>
      <GroupsPagePage groupIndexDTO={groupDTOs} />
    </PageWrapper>
  )
}

export { GroupsPage }
