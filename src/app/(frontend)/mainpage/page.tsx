"use client"
import { useState, useEffect } from "react"
import { getUser, logoutPayloadUser } from "../Components/server/actions"
import { ROUTES } from '@/app/(frontend)/utils/constants'
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify'
import { getUserData, increaseUserBalance } from "../Components/server/getsetuserdata"

export default function MainPage() {
  
  const [username, setUsername] = useState<Awaited<ReturnType<typeof getUser>> | null>(null);
  const [UserData, setUserData] = useState<Awaited<ReturnType<typeof getUserData>> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleLogout() {
    try {
      const user = await logoutPayloadUser();
      if (user.success) {
        router.push(ROUTES.LOGIN);
      } else {
        toast.error("Logout failed");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUsername(user);

      const userData = await getUserData();
      setUserData(userData);
    })();
  }, []);

  const submitandgetbalance = async () => {
    if (UserData?.user?.id) {
      
      // Increase user balance
      await increaseUserBalance(UserData.user.id, 10);

      // 🔥 REFRESH fresh data so balance updates instantly
      const updatedData = await getUserData();

      setUserData(updatedData);
    }
  };

  return (
    <>
      welcome {username?.name}
      <br />
      welcome {username?.role} <br />

      your balance: {UserData?.userData?.balance ?? "null"}

      <br /><br />

      <button
        onClick={handleLogout}
        className="w-[10%] bg-blue-500 text-white border-white py-3 px-5"
      >
        log out
      </button>

      <button
        onClick={submitandgetbalance}
        className="w-[10%] bg-blue-500 text-white border-white py-3 px-5 mt-10"
      >
        get balance
      </button>
    </>
  );
}
