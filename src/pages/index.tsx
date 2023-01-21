import Link from 'next/link'
import styles from '../../styles/Home.module.css'

import { Button } from '@mui/material'

import CustomHead from '../components/customhead'
import CustomFooter from '../components/customfooter'

export default function Home() {
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID as string}&redirect_uri=http://localhost:3000/line&state=hoge&bot_prompt=normal&scope=profile%20openid&nonce=foobar&prompt=consent`
  return (
    <div className={styles.container}>
      <CustomHead/>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Main Page
        </h1>

        <Link href={url}>
          <Button variant="contained" style={{textTransform: 'none', marginBottom:'30px'}}>
            Login
          </Button>
        </Link>

        <Link href="/activities" passHref>
          <Button variant="contained" style={{textTransform: 'none'}}>
            Activities
          </Button>
        </Link>

      </main>

      <CustomFooter/>
    </div>
  )
}
