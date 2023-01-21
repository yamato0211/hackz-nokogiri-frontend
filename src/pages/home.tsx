import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import response from './line'

import { Button } from '@mui/material'

import CustomHead from '../components/customhead'
import CustomFooter from '../components/customfooter'

export default function Home() {

    function logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("access_token");
    }

  return (
    <div className={styles.container}>
      <CustomHead/>

      <main className={styles.main}>

        <h1 className={styles.title}>
          home Page
        </h1>

        <Button variant="contained" href="/" onClick={logout}>
          logout
        </Button>

      </main>



      <CustomFooter/>
    </div>
  )
}
