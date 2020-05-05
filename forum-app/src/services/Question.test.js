import axios from 'axios';
import { listQuestions, createQuestion }  from './Question';
import config from './config';

jest.mock('axios');

describe('fetch: listQuestions', () => {
    test('fetch successfully data with status 200  should return array of questions', async () =>{
        const response = { 
            status: 200,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ]};

        axios.get.mockResolvedValue(response);

        const result = await listQuestions();

        expect(axios.get).toHaveBeenCalledWith('/question/all', config);
        expect(result).toStrictEqual({ questions: response.data});
    });
    test('fetch successfully data with No_Content should return empty array of questions', async () =>{
        const response = { 
            status: 204,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ]};

        axios.get.mockResolvedValue(response);

        const result = await listQuestions();

        expect(axios.get).toHaveBeenCalledWith('/question/all', config);
        expect(result).toStrictEqual({ questions: []});
    });
    test('fetch data with error, should return unknown message', async () =>{
        const response = { 
            status: 300,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ]};

        axios.get.mockResolvedValue(response);

        const result = await listQuestions();

        expect(axios.get).toHaveBeenCalledWith('/question/all', config);
        expect(result).toStrictEqual({error: true, message: "Erro desconhecido."});
    });
    test('fetch data with exception, should return exception message', async () =>{
        const exception_message = 'Error of connection.';
        
        axios.get.mockImplementation(() => { throw new Error(exception_message); });

        const result = await listQuestions();

        expect(axios.get).toHaveBeenCalledWith('/question/all', config);
        expect(result).toStrictEqual({error: true, message: exception_message});
    });
});

describe('post: createQuestion', () => {
    test('post successfully data with status 201, should return question created', async () =>{
        const response = { 
            status: 201,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ]};
        const question = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]};

        axios.post.mockResolvedValue(response);

        const result = await createQuestion(question);

        expect(axios.post).toHaveBeenCalledWith('/question/save', question, config);
        expect(result).toStrictEqual({ question: response.data });
    });
    test('post data with error, should return unknown message', async () =>{
        const response = { 
            status: 300,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ]};
        const question = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]};

        axios.post.mockResolvedValue(response);

        const result = await createQuestion(question);

        expect(axios.post).toHaveBeenCalledWith('/question/save', question, config);
        expect(result).toStrictEqual({  error: true, message: "Erro desconhecido."});
    });
    test('post data with exception, should return exception message', async () =>{
        const exception_message = 'Error of connection.';
        const question = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]};

        axios.post.mockImplementation(() => { throw new Error(exception_message); });

        const result = await createQuestion(question);

        expect(axios.post).toHaveBeenCalledWith('/question/save', question, config);
        expect(result).toStrictEqual({  error: true, message: exception_message});
    });
});