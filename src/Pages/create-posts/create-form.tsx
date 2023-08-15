import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {auth,db} from '../../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import {addDoc,collection} from "firebase/firestore"
import {useNavigate} from 'react-router-dom'
import './create-posts.css'
interface CreateFormData{
    title:string,
    description:string,
}
export const CreateForm = () =>{
    const [user] = useAuthState(auth);
    const schema=yup.object().shape({
        title:yup.string().required("Title Required"),
        description:yup.string().required("Description is required"),
    })
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver : yupResolver(schema)
    })
    const navigate=useNavigate();
    const postsRef=collection(db,"Posts");
    const onSubmit =async(data:CreateFormData)=>{
        await addDoc(postsRef,{
            title:data.title,
            description:data.description,
            username:user?.displayName,
            id:user?.uid,
        })
        navigate('/');
        alert("Post Added");
        
    }
    return(
         <form onSubmit={handleSubmit(onSubmit)} >
            <div className="form-group"><input type="text" placeholder="Add a title" {...register("title")} className="form-control input"/></div>
            <p>{errors.title?.message}</p>
            <textarea placeholder="Add a description" {...register("description")} className="form-control" />
            <p>{errors.description?.message}</p>
            <input type="submit" className='btn btn-info' />
        </form>
    );
}