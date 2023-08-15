import {auth,db} from '../../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import{getDocs,collection} from"firebase/firestore";
import {useEffect,useState,useCallback} from 'react';
import { Post } from "./post"


import './main.css'
export interface IPost{
    ID:string,
    id:string,
    username:string,
    description:string,
    title:string,
}
export const Main=()=>{
    const [user] = useAuthState(auth);
    const [postsList,setPostsLists]= useState<IPost[] | null>(null);
    const postRef=collection(db,"Posts");
    /*const getPosts=async () =>{
        const data=await getDocs(postRef);
        setPostsLists(data.docs.map((doc)=>({...doc.data(),ID:doc.id} )) as IPost[] );
    }*/
    const getPosts=useCallback(async()=>{
        const data=await getDocs(postRef);
        setPostsLists(data.docs.map((doc)=>({...doc.data(),ID:doc.id} )) as IPost[] );
    },[postRef])
    useEffect(()=>{
        getPosts();
    },[getPosts]);
    return(
        <div className='main'>
        {user ? <h1>WELCOME {user?.displayName}</h1>: <div><h1>WELCOME</h1><h3>Please Login</h3></div>}
        <div>
            {postsList?.map((post)=>(
                <Post post = {post}/>
            ))}
        </div>
        </div>
        
    )
}