import axios from "axios";

const API=axios.create(
    {
    
        baseURL:'http://localhost:8080/api/v1'
    }
    );

//export const getPropertiesApi=(token)=>API.get('/properties');
//export const getAllOwnersApi=()=>API.get('/properties');
/*export const delelePostByIdApi=(id)=>API.delete(`/posts/${id}`);
export const savePostApi=(post)=>API.post('/posts',post);
export const updatePostApi=(post,id)=>API.put(`/posts/${id}`,post);
export const  getCommetsByPost=(id)=>API.get(`/comments/post/${id}`);*/

export const getPropertiesApi = (token) => {
    return API.get('/properties', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

