export const Users = () => {
  const users = [
    { name: 'jb1', email: 'toto1@email.com' },
    { name: 'jb2', email: 'toto2@email.com' },
    { name: 'jb3', email: 'toto3@email.com' }
  ]

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {users!.map(
          ({ name, email }: { name: string; email: string }, i: number) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{email}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
