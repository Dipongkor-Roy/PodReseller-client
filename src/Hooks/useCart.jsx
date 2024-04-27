import { useQuery } from '@tanstack/react-query'
import { useContext } from "react";
import { AuthContext } from '../Context/AuthContext';



const useCart = () => {
    const {user}=useContext(AuthContext);
    const {refetch,data:cart=[]}= useQuery({
        queryKey:['cart',user?.email],
        queryFn:async ()=>{
            const res=await fetch(`http://localhost:3000/carts?email=${user?.email}`)
            return res.json();
        },
    })
    return [cart,refetch]
};

export default useCart;