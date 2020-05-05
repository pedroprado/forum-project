import axios from 'axios';
import { createLike, updateLike }  from './Like';
import config from './config';

jest.mock('axios');

describe('post: should create like', () => {
    test('post successfully data with status 201 should return saved like', async () =>{
        const response = { 
            status: 201,
            data: {itemId: 'id', type: 1, user: 'user', liked: true, creationDate:'2019-01-02'}};
        
        const like = response.data;

        axios.post.mockResolvedValue(response);

        const result = await createLike(like);

        expect(axios.post).toHaveBeenCalledWith('/like/save', like, config);
        expect(result).toStrictEqual({ like: response.data });
    });
    test('post with error', async () =>{
        const response = { 
            status: 300,
            data: {itemId: 'id', type: 1, user: 'user', liked: true, creationDate:'2019-01-02'}};

        const like = response.data;


        axios.post.mockResolvedValue(response);

        const result = await createLike(like);

        expect(axios.post).toHaveBeenCalledWith('/like/save', like, config);
        expect(result).toStrictEqual({ error: true, message: "Erro desconhecido."});
    });
    test('post data with exception, should return exception message', async () =>{
        const like = {itemId: 'id', type: 1, user: 'user', liked: true, creationDate:'2019-01-02'};

        const exception_message = 'Error of connection.';
        
        axios.post.mockImplementation(() => { throw new Error(exception_message); });

        const result = await createLike(like);

        expect(axios.post).toHaveBeenCalledWith('/like/save', like, config);
        expect(result).toStrictEqual({error: true, message: exception_message});
    });
});

describe('update: should update like', () => {
    test('update successfully data with status 200 should return saved like', async () =>{
        const response = { 
            status: 200,
            data: {itemId: 'id', type: 1, user: 'user', liked: true, creationDate:'2019-01-02'}};
        
        axios.get.mockResolvedValue(response);

        const result = await updateLike('11', true);

        expect(axios.get).toHaveBeenCalledWith('/like/update/11/true', config);
        expect(result).toStrictEqual({ like: response.data });
    });
    test('update with error', async () =>{
        const response = { 
            status: 300,
            data: {itemId: 'id', type: 1, user: 'user', liked: true, creationDate:'2019-01-02'}};

        axios.get.mockResolvedValue(response);

        const result = await updateLike('11', false);

        expect(axios.get).toHaveBeenCalledWith('/like/update/11/false', config);
        expect(result).toStrictEqual({ error: true, message: "Erro desconhecido."});
    });
    test('update data with exception, should return exception message', async () =>{
        const like = {itemId: 'id', type: 1, user: 'user', liked: true, creationDate:'2019-01-02'};

        const exception_message = 'Error of connection.';
        
        axios.get.mockImplementation(() => { throw new Error(exception_message); });

        const result = await updateLike('111', false);

        expect(axios.get).toHaveBeenCalledWith('/like/update/111/false', config);
        expect(result).toStrictEqual({error: true, message: exception_message});
    });
});