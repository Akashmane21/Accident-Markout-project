import React , { useEffect , useState} from 'react';
import styles from "../styles/Home.module.scss";
import Router from 'next/router';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import firebase from '../db/firebase'
import { useRouter } from 'next/router'

export default  function Nav() {
  const [Userdata, setUserdata] = useState({"Name":"NA"});
  const [usernamee, setusernamee] = useState('')
  const router = useRouter()

  useEffect(async () => {
 

    const Username = await localStorage.getItem("id");
    setusernamee(Username)
    
    if(Username !=null){
      
      const User = await  firebase.database().ref(`BE-Project/All_Users/${Username}/Auth`);
      User.on('value' , (snapshot)=>{
        const Data =snapshot.val()
        setUserdata(Data);
      })
    }
    else{
      console.log("user not authenticated");
    }
  }, []);

  
 async function Logout(){
  await localStorage.removeItem("authcheck")
  await localStorage.removeItem("id")
  await localStorage.removeItem("UserData")
  window.location.reload()
  }


  return (

    <nav>
    <div className={styles.header}>
      <img   onClick={()=> router.push('/')} src="/icons/pngfind.com-journey-png-6403705 (1).png" alt="" />
      <li>
        <ul onClick={()=> router.push('/#Footer')}>About</ul>
        <ul onClick={()=> router.push('/Map')}>Find Safe route</ul>
        <ul onClick={()=> router.push('/User')}>Add Black-spot</ul>

        {usernamee=='Akash_12345' && <ul onClick={()=> router.push('/Admin')}>Admin Panel</ul> }
     
      </li>
{Userdata.Name=='NA' ? 
         <div className={styles.btns}>

         <button onClick={() => Router.push('/Auth')}>Login</button>
         <button onClick={() => Router.push('/Auth')}>Register</button>
   </div>
:
<div className='user'>
{/* <Chip style={{color:"gray" , marginRight:30 , marginTop:6}} label={Userdata.Name} avatar={<Avatar src={Userdata.DPLink} />} /> */}
<Button className='deletee' variant="outlined"  style={{}} >
{Userdata.Name} 
</Button>
<Button className='deletee' onClick={Logout} variant="varient"  style={{color : 'orangered'}} >
      Logout 
</Button>
</div>

 }
    </div>
  </nav>
  );
}
