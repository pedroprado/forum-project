import axios from 'axios';
import config from './config';

export const createLike = async (like) =>{
    try {
        const response = await axios.post('/like/save', like, config);
        if(response.status === 201){
            return { like: response.data} ;
        }
        else{
            return { error: true, message: "Erro desconhecido."}
        }
    } catch (error) {
        return { error: true, message: error.message};
    }
};

export const updateLike = async (id, liked) =>{
    try {
        const response = await axios.get(`/like/update/${id}/${liked}`, config);
        if(response.status === 200){
            return { like: response.data} ;
        }
        else{
            return { error: true, message: "Erro desconhecido."}
        }
    } catch (error) {
        return { error: true, message: error.message};
    }
};
