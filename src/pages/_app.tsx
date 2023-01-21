import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Router, { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => {
    console.log(router.pathname)
    const id = localStorage.getItem("id_token");
    const access = localStorage.getItem("access_token");
    if(router.pathname !== "/"){
      if(id != null && id.length != 0){
        //アクティビティページに飛ばす
        Router.push("/activities");
        console.log("id=" + id);
      }
    }
  },[])

  return <Component {...pageProps} />
}
