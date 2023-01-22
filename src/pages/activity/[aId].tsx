import axios from 'axios'
import { ServerURL } from '../../refs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface UserData {
  name: string
  picture: string | null
  lineID: string
}

const Activity = () => {
  const router = useRouter()
  const { aId } = router.query

  const [user, setUser] = useState<UserData>()
  const [activity, setActivity] = useState()

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
      setUser({
        name: userdata.data.name,
        picture: userdata.data.picture,
        lineID: userdata.data.sub
      })

      const response = await axios.get(ServerURL + "/activitie/" + aId)
      setActivity(response.data)
    }
  })

  return <p>Activity: {aId}</p>
}

export default Activity
