import GroupDialog from '@/components/Modal'
import { useGroupGetGroups } from '@/tools/callapi'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

export function GroupPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { groupsDTO, getGroups } = useGroupGetGroups()

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    console.log(groupsDTO)
  }, [groupsDTO])

  const onCloseModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div>
      data
      <Button onClick={() => setModalIsOpen(true)}>OpenModal</Button>
      <GroupDialog open={modalIsOpen} onClose={onCloseModal} />
      {groupsDTO?.map((group, index) => (
        <div key={index}>
          {group.groupId} - {group.groupName}
        </div>
      ))}
    </div>
  )
}
