import axios from 'axios';
import { findAnswersByQuestionId, createAnswer }  from './Answer';
import config from './config';

jest.mock('axios');

describe('fetch: findAnswersByQuestionId', () => {
    test('fetch successfully data with status 200 should return array of answers', async () =>{
        const response = { 
            status: 200,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', questionId:'123'} ]};

        axios.get.mockResolvedValue(response);

        const result = await findAnswersByQuestionId('123');

        expect(axios.get).toHaveBeenCalledWith('/answer/find/123', config);
        expect(result).toStrictEqual({ answers: response.data });
    });
    test('fetch successfully data No_Content should return empty array os answers', async () =>{
        const response = { 
            status: 204,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', questionId: '123'} ]};

        axios.get.mockResolvedValue(response);

        const result = await findAnswersByQuestionId('155');

        expect(axios.get).toHaveBeenCalledWith('/answer/find/155', config);
        expect(result).toStrictEqual({ answers: []});
    });
    test('fetch data with error, should return unknown message', async () =>{
        const response = { 
            status: 300,
            data: [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ]};

        axios.get.mockResolvedValue(response);

        const result = await findAnswersByQuestionId('155');

        expect(axios.get).toHaveBeenCalledWith('/answer/find/155', config);
        expect(result).toStrictEqual({error: true, message: "Erro desconhecido."});
    });
    test('fetch data with exception, should return exception message', async () =>{
        const exception_message = 'Error of connection.';
        
        axios.get.mockImplementation(() => { throw new Error(exception_message); });

        const result = await findAnswersByQuestionId('155');

        expect(axios.get).toHaveBeenCalledWith('/answer/find/155', config);
        expect(result).toStrictEqual({error: true, message: exception_message});
    });
});

describe('post: createAnswer', () => {
    test('post successfully data with status 201, should return answer created', async () =>{
        const answer = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', questionId: '123'};
        const response = { 
            status: 201,
            data: [ answer ]
        };

        axios.post.mockResolvedValue(response);

        const result = await createAnswer(answer);

        expect(axios.post).toHaveBeenCalledWith('/answer/save', answer, config);
        expect(result).toStrictEqual({ answer : response.data});
    });
    test('post data with error, should return unknown message', async () =>{
        const answer = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', questionId: '123'};
        const response = { 
            status: 300,
            data: [ answer ]};

        axios.post.mockResolvedValue(response);

        const result = await createAnswer(answer);

        expect(axios.post).toHaveBeenCalledWith('/answer/save', answer, config);
        expect(result).toStrictEqual({  error: true, message: "Erro desconhecido."});
    });
    test('post data with exception, should return exception message', async () =>{
        const exception_message = 'Error of connection.';
        const answer = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', questionId: '123'};

        axios.post.mockImplementation(() => { throw new Error(exception_message); });

        const result = await createAnswer(answer);

        expect(axios.post).toHaveBeenCalledWith('/answer/save', answer, config);
        expect(result).toStrictEqual({  error: true, message: exception_message});
    });
});