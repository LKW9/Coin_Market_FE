import axios from 'axios';
import { useEffect, useState } from 'react';

const LogoutBtn = () => {
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  useEffect(() => {
    axios
    .post("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/user/userprofile")
      .then((response) => {
      console.log(response.data.decodedToken.user)
        setEmail(response.data.decodedToken.user.email)
        setPhoto(response.data.decodedToken.user.photo)
  })
    .catch(() => {
  });
  }, []);


  const redirectAfterLogoutPath = () => {
    window.location.href = "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/auth/logout";
  };

  return (
    <button
      className=' w-[200px] h-full'
      onClick={redirectAfterLogoutPath}
    >
      <img className='w-[50px] mx-auto' src={photo} alt="userImage" />
      <p className='text-[4px]'>{email}</p>
      <p>로그아웃</p>
    </button>
  )
}

export default LogoutBtn