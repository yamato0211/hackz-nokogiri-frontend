import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const Line = () => {

  const route = useRouter();

  const getToken = async () => {

    // アクセストークンの発行
    var params = new URLSearchParams()
    params.append('grant_type', "authorization_code")
    params.append('code', route.query.code as string)
    params.append('redirect_uri', "http://localhost:3000/line")
    params.append('client_id',  process.env.NEXT_PUBLIC_CLIENT_ID as string)
    params.append('client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET as string)

    const token = await axios.post("https://api.line.me/oauth2/v2.1/token", params);
    console.log("token: ", token.data)
    localStorage.setItem("id_token",token.data.id_token)
    localStorage.setItem("access_token",token.data.access_token)


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

    const response = await axios.post("http://localhost:8000/api/users/auth", {
      name: userdata.data.name,
      picture: userdata.data.picture,
      lineID: userdata.data.sub,
    })
    const data = await response.data
    console.log(data)
  }

  return (
    <div>
      <button onClick={getToken}>send message</button>
    </div>
  ) 
}

export default Line