import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Questions from './Questions';
import QuestionsSummary from '../components/QuestionsSummary/QuestionsSummary';
import { listQuestions, createQuestion }  from '../services/Question';
import { createLike, updateLike } from '../services/Like';


jest.mock('../services/Question');
jest.mock('../services/Like');

Enzyme.configure({ adapter: new Adapter() });

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return shallow(<Questions {...defaultProps} />);
};

describe('QuestionsPage', () => {
	describe('Render components', () =>{
		test('Render QuestionsSummary', () => {
			const component = createComponent();

			const questionsSummary = component.find(QuestionsSummary);

			expect(questionsSummary.exists()).toBe(true);
		});
	});

	describe('States and Methods', () => {});
		test('componentDidMount: should call fetch function', async () => {
			const component = createComponent();

			component.instance().fetchQuestions = jest.fn();

			await component.instance().componentDidMount();

			expect(component.instance().fetchQuestions).toHaveBeenCalledTimes(1);
		});
		test('fetchQuestions without error', async () => {
			const component = createComponent();
			const questions = [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ];
			const response = { questions: questions };

			listQuestions.mockResolvedValue(response);

			await component.instance().fetchQuestions();

			expect(component.state('questions')).toStrictEqual(response.questions);
			expect(component.state('error')).toBe(false);
		});
		test('fetchQuestions with error', async () => {
			const component = createComponent();
			const error_message = 'error message';
			const response = { error: true, message: error_message};

			listQuestions.mockResolvedValue(response);

			await component.instance().fetchQuestions();

			expect(component.state('errorMessage')).toBe(error_message);
			expect(component.state('error')).toBe(true);
		});
		test('saveQuestion without error', async () => {
			const component = createComponent();

			const newQuestion = 'newQuestion';
			const username = 'username';
			const new_question = { text: newQuestion, user: username} ;
			const response = { question : new_question };

			createQuestion.mockResolvedValue(response);

			await component.instance().saveQuestion(newQuestion, username);

			expect(createQuestion).toHaveBeenCalledWith(new_question);
			expect(component.state('error')).toBe(false);
		});
		test('saveQuestion with error', async () => {
			const component = createComponent();

			const newQuestion = 'newQuestion';
			const username = 'username';
			const new_question = { text: newQuestion, user: username};
			const error_message = 'error message';
			const response = { error: true, message: error_message};

			createQuestion.mockResolvedValue(response);

			await component.instance().saveQuestion(newQuestion, username);

			expect(createQuestion).toHaveBeenCalledWith(new_question);
			expect(component.state('errorMessage')).toBe(error_message);
			expect(component.state('error')).toBe(true);
		});
		test('onQuestionItemSelected: should call props.onQuestionItemSelected', () => {
			const question1 = {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]};
			const mockFunc = jest.fn();
			const component = createComponent({onQuestionItemSelected: mockFunc});
			component.setState({ questions: [question1] });

			component.instance().onQuestionItemSelected('11');
			
			expect(mockFunc).toHaveBeenCalledTimes(1);
			expect(mockFunc).toHaveBeenCalledWith(question1);	
		});
		test('onNewQuestionChange: should update state', async () => {
			const component = createComponent();
			const value = 'value';

			await component.instance().onNewQuestionChange(value);
			
			expect(component.state('newQuestion')).toBe(value);	
		});
		test('onNewQuestionSubmit: window confirm true', async () => {
			const component = createComponent();

			const event = { preventDefault: _ => _}
			const username = 'username';
			const new_question = 'Como testar React?';
			component.setState({ newQuestion: new_question });

			window.confirm = jest.fn(() => true);
			component.instance().saveQuestion = jest.fn();
			component.instance().fetchQuestions = jest.fn();

			await component.instance().onNewQuestionSubmit(event, username);

			expect(component.instance().saveQuestion).toHaveBeenCalledWith(new_question, username);
			expect(component.instance().fetchQuestions).toHaveBeenCalledTimes(1);
			expect(component.state('newQuestion')).toBe('');
		});
		test('onNewQuestionSubmit: window confirm false', async () => {
			const component = createComponent();

			const event = { preventDefault: _ => _}
			const username = 'username';
			const new_question = 'Como testar React?';
			component.setState({ newQuestion: new_question });

			window.confirm = jest.fn(() => false);
			component.instance().saveQuestion = jest.fn();
			component.instance().fetchQuestions = jest.fn();

			await component.instance().onNewQuestionSubmit(event, username);

			expect(component.instance().saveQuestion).toHaveBeenCalledTimes(0);
			expect(component.instance().fetchQuestions).toHaveBeenCalledTimes(0);
			expect(component.state('newQuestion')).toBe(new_question);
		});
		test('onLikeQuestionClicked no like, should create like', async () => {
			const component = createComponent();

			const myLike = [];
			const questionId = 'id';
			const username = 'user';
			const response = {};

			const like  = {
                itemId: questionId,
                type: 1,
                user: username,
                liked: true
			};

			createLike.mockResolvedValue(response);
			component.instance().fetchQuestions = jest.fn();

			await component.instance().onLikeQuestionClicked(myLike, questionId, username);

			expect(createLike).toHaveBeenCalledWith(like);
			expect(component.instance().fetchQuestions).toHaveBeenCalledTimes(1);
		});
		test('onLikeQuestionClicked, should update like', async () => {
			const component = createComponent();

			const myLike = [{
				id: '111',
                itemId: 'id',
                type: 1,
                user: 'user',
                liked: true
			}];
		
			const response = {};

			updateLike.mockResolvedValue(response);
			component.instance().fetchQuestions = jest.fn();

			await component.instance().onLikeQuestionClicked(myLike, 'questionId', 'username');

			expect(updateLike).toHaveBeenCalledWith(myLike[0].id, !myLike[0].liked);
			expect(component.instance().fetchQuestions).toHaveBeenCalledTimes(1);	
		});

});