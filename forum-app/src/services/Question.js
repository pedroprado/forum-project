import axios from 'axios';
import config from './config';

export const listQuestions = async () =>{
    try {
        const response = await axios.get('/question/all', config);
        if(response.status === 200){
            return { questions: response.data} ;
        }
        if(response.status === 204){
            return { questions :[]};
        }
        else{
            return { error: true, message: "Erro desconhecido."}
        }
    } catch (error) {
        return { error: true, message: error.message};
    }
};

export const createQuestion =  async(question) => {
    try {
        const response = await axios.post('/question/save', question, config);
        if(response.status === 201){
            return { question: response.data} ;
        }
        else{
            return { error: true, message: "Erro desconhecido."}
        }
    } catch (error) {
        return { error: true, message: error.message};
    }
};

