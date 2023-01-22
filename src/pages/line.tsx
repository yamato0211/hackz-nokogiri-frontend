import axios from "axios";
import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Button } from '@mui/material'
import { ClientURL, ServerURL } from '../refs'
import styles from '../../styles/Home.module.css'

const Line = () => {

  const router = useRouter();
  
  const getToken = async () => {

    // アクセストークンの発行
    var params = new URLSearchParams()
    params.append('grant_type', "authorization_code")
    params.append('code', router.query.code as string)
    params.append('redirect_uri', ClientURL + "/line")
    if(!process.env.NEXT_PUBLIC_CLIENT_ID){
      console.log(4)
      return
    }
    params.append('client_id',  process.env.NEXT_PUBLIC_CLIENT_ID)
    if(!process.env.NEXT_PUBLIC_CLIENT_SECRET){
      console.log(4)
      return
    }
    params.append('client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET as string)
    // console.log("=================")
    // console.log(process.env.NEXT_PUBLIC_CLIENT_SECRET)
    // console.log("=================")
    try {
      const token = await axios.post("https://api.line.me/oauth2/v2.1/token", params);
      console.log("token: ", token.data)
      localStorage.setItem("id_token",token.data.id_token)
      localStorage.setItem("access_token",token.data.access_token)
    }catch(e) {
      console.log(e)
    }


    // IDトークンの検証
    var params_second = new URLSearchParams()
    const id_token = localStorage.getItem("id_token")
    if(!id_token){
      console.log("IDTokenError")
      return
    }
    params_second.append("id_token", id_token)
    params_second.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID as string)
    const userdata = await axios.post("https://api.line.me/oauth2/v2.1/verify", params_second);
    console.log("userdata: ", userdata.data)

    const response = await axios.post(ServerURL + "/users/auth", {
      name: userdata.data.name,
      picture: userdata.data.picture,
      lineID: userdata.data.sub,
    })
    const data = await response.data
    console.log(data)
    console.log(id_token)

    router.push('/activities')
  }

  return (
    <main className={styles.main}>

      <h1>
        LOGIN COMPLETED!
      </h1>

      <Button variant="contained" onClick={getToken} style={{textTransform: 'none', width:'250px'}} type='button'>
        return to home
      </Button>

    </main>

  ) 
}

export default Line