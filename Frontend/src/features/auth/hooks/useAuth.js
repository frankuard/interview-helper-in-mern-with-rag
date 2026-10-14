/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";


export const useAuth =  () => {
    const context = useContext(AuthContext)

    const {user,setUser,loading,setLoading} = context

    const handleLogin = async ({email,password}) => {
        
        setLoading(true)
        try {
            
            const data = await login({ email,password})
    
            setUser(data.user)
            
        } catch (error) {
            console.error(
      "Login failed:",
      error.response?.data || error.message)
        }
        finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({username,email,password}) => {
        
        setLoading(true)

        try {

            const data= await register({username,email,password})
            setUser(data.user)
        } catch (err) {
            console.log(err)
        }

        finally{
            setLoading(false)
        }
    }


    // try ra catch yesma baki chha
    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(null)

    }

    useEffect(() => {
      

        const getAndSetUser = async () => {
        try {
                const data = await getMe();
                setUser(data.user);
        
        } catch (error) {
           console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
        getAndSetUser()

    }, []);


    return {user,loading,handleLogin,handleLogout,handleRegister}

}
