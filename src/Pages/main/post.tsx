import {IPost} from './Main'
import { auth, db } from '../../config/firebase';
import{addDoc,collection,query,where,getDocs,deleteDoc,doc} from"firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth"
import {useEffect,useState,useCallback} from 'react'
import './post.css';

interface Props{
    post : IPost
}
interface Like{
    userId:string,
    likeId:string,
}
export const Post=(props:Props)=>{
    const {post}=props;
    const [user] = useAuthState(auth);
    const likesRef=collection(db,"Likes");
    const [likes,setLikes]=useState<Like[] | null>(null)
    const addPost =async()=>{
        try{
        const newDoc=await addDoc(likesRef,{
          userId:user?.uid,
          postId:post.ID,  
        })
        if(user){
            setLikes((prev)=> prev ? [...prev,{userId:user?.uid,likeId:newDoc.id}] : [{userId:user?.uid,likeId:newDoc.id}]);
        }
    }catch(err){
        console.log(err);
    }
    }
    const deletePost =async()=>{
        try{
        const likeToDeleteQuery=query(likesRef,where("postId", "==", post.ID),where("userId","==",user?.uid));
         const likeToDeleteData = await getDocs(likeToDeleteQuery);
         /*const likeId=likeToDeleteData.docs[0].id;
         const likeToDelete=doc(db,"likes",likeId);
         await deleteDoc(likeToDelete);
        
        if(user){
            setLikes((prev)=> prev && prev.filter((like)=>(like.likeId!==likeId)));
        }*/
        if (likeToDeleteData.docs.length > 0) {
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "Likes", likeId);
            await deleteDoc(likeToDelete);
          
            if (user) {
              setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
          }
    }catch(err){
        console.log(err);
    }
    }
    
    /*const likesDoc=query(likesRef,where("postId","==",post.ID));
    const getLikes= async () => {
        const data=await getDocs(likesDoc);
        setLikesAmount(data.docs.length);
    }
    */
    const getLikes = useCallback(async () => {
        const likesDoc = query(likesRef, where("postId", "==", post.ID));
        const result = await getDocs(likesDoc);
        setLikes(result.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
      }, [likesRef, post.ID]);
    useEffect(()=>{
        
        getLikes();
            
    },[getLikes]);
    const hasLiked=likes?.find((like)=>(like.userId===user?.uid))
    return(<div>
       <div className='title'>
        <h1>{post.title}</h1>
        </div>
        <div className='description'>
        <p>{post.description}</p>
        </div> 
        <div className='username'>
        <p>@{post.username}</p>
        <div className='bouton'>
        <button className='btn btn-primary' onClick={hasLiked ? deletePost: addPost}>{!hasLiked ?  <>&#10084;&#65039;</> : <>👎</>}</button>
        {likes !== null && <p>{likes?.length}</p>}
        </div>
        </div> 
    
        
    </div>)
}