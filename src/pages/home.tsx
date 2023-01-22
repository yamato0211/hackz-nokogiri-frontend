import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import response from './line'

import { Button, Grid } from '@mui/material'

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

        <h2 className={styles.title}>
          logout page
        </h2>

        <Grid container style={{marginTop:'30px'}}>
          <Grid item xs={5}></Grid>

          <Grid item xs={1}>
            <Button variant="contained" href="/" onClick={logout} style={{textTransform: 'none', marginBottom:'30px', justifyItems:"center"}}>
              logout
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" href="/">
              no
            </Button>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
        <a>
          You have to re-login if you put logout.
        </a>

      </main>



      <CustomFooter/>
    </div>
  )
}
