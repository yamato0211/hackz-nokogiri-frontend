import Link from 'next/link'
import axios from "axios";
import styles from '../../styles/Home.module.css'

import { Button } from '@mui/material'

import CustomHead from '../components/customhead'
import CustomFooter from '../components/customfooter'
import { useEffect, useState } from 'react';

interface UserData {
  name: string
  picture: string | null
  lineID: string
}

export default function Home() {
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID as string}&redirect_uri=http://localhost:3000/line&state=hoge&bot_prompt=normal&scope=profile%20openid&nonce=foobar&prompt=consent`
  const [userData, setUserData] = useState<UserData>()
  useEffect(() => {
    const getUserInfo = async () => {
      var params_second = new URLSearchParams()
      const id_token = localStorage.getItem("id_token")
      if(!id_token){
        console.log("IDTokenError")
        return
      }
      params_second.append("id_token", id_token)
      params_second.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID as string)
      const userdata = await axios.post("https://api.line.me/oauth2/v2.1/verify", params_second);
      console.log(userdata.data)
      console.log("userpicture: " + userdata.data.picture)
      setUserData({
        name: userdata.data.name,
        picture: userdata.data.picture,
        lineID: userdata.data.sub
      })
    }
    getUserInfo()

  },[])

  return (
    <div className={styles.container}>
      <CustomHead/>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Main Page
        </h1>

        <img src={userData?.picture ? userData.picture : ""} className={styles.img}/>
        <a>{userData?.name}</a>

        <Link href={url}>
          <Button variant="contained" style={{textTransform: 'none', marginBottom:'30px'}}>
            Login
          </Button>
        </Link>

        <Link href="/activities" passHref>
          <Button variant="contained" style={{textTransform: 'none', marginBottom:'30px'}}>
            Activities
          </Button>
        </Link>


        <Link href="/home" passHref>
          <Button variant="contained" style={{textTransform: 'none'}}>
            log
          </Button>
        </Link>

        {/* <Button onClick={getUserInfo}>
          console
        </Button> */}

      </main>

      <CustomFooter/>
    </div>
  )
}
