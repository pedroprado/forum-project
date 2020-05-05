import axios from 'axios';
import config from './config';

export const findAnswersByQuestionId = async (questionId) =>{
    try {
        const response = await axios.get(`/answer/find/${questionId}`, config);
        if(response.status === 200){
            return { answers: response.data} ;
        }
        if(response.status === 204){
            return { answers :[]};
        }
        else{
            return { error: true, message: "Erro desconhecido."}
        }
    } catch (error) {
        return { error: true, message: error.message};
    }
};

export const createAnswer =  async(answer) => {
    try {
        const response = await axios.post('/answer/save', answer, config);
        if(response.status === 201){
            return { answer: response.data} ;
        }
        else{
            return { error: true, message: "Erro desconhecido."}
        }
    } catch (error) {
        return { error: true, message: error.message};
    }
};