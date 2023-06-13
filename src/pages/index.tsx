import { reloadUser } from "@/store/user/userSlice";
import { useEffect } from "react";
import {useRouter}  from 'next/router';


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    
    router.push('/home')
  }, [])


  return (<></>)
}
