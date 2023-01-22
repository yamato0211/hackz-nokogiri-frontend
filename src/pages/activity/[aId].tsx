import axios from 'axios'
import { ServerURL } from '../../refs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface UserData {
  name: string
  picture: string | null
  lineID: string
}

interface Member {
  lineId: string
  activitieId: string
}

interface Record {
  id: string
  name: string
  lineId: string
}

interface Activity {
  id: string
  name: string
  dateTime: string
  place: string
  misc: string
  createdAt: string
  updatedAt: string
  member: Member[]
  Record: Record
}

const Activity = () => {
  const router = useRouter()
  const { aId } = router.query
  const [user, setUser] = useState<UserData>()
  const [activity, setActivity] = useState<Activity>()

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
      setUser({
        name: userdata.data.name,
        picture: userdata.data.picture,
        lineID: userdata.data.sub
      })
      console.log(userdata.data)

      await axios.get(ServerURL + "/activitie/" + aId as string)
      .then((res) => {
        setActivity(res.data)
      })

      console.log(activity)
    }
    if(router.isReady) {
      getUserInfo()
    }
  },[router.isReady])

  async function addMember() {
    const response = await axios.get(ServerURL + "/activitie/" + `?activitieId=${aId}&lineId=${user?.lineID}`)
    console.log(response.data)

    if(response.status === 200){
      alert('done!')
      router.push('/')
    }else{
      alert('failed!')
      router.push('/')
    }
  }

  return (
    <div>
      <h1>{activity?.name}</h1>
      <h1>{activity?.place}</h1>
      <h1>{activity?.dateTime}</h1>
      <h1>{activity?.misc}</h1>
      <button onClick={addMember}>参加する</button>
      <br />
      <button onClick={() => {router.push('/')}}>参加しない</button>
    </div>
  )
}

export default Activity
