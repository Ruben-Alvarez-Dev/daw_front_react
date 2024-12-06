import React from 'react'
import UsersComponent from '../../components/specific/users/Users'
import styles from './Users.module.css'

const Users = () => {
  return (
    <div className={styles.users}>
      <UsersComponent />
    </div>
  )
}

export default Users
