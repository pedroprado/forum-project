import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import QuestionDetail from './QuestionDetail';
import BackButton from '../components/UI/BackButton/BackButton';
import QuestionBox from '../components/QuestionDetail/QuestionBox/QuestionBox';
import AnswerList from '../components/QuestionDetail/AnswerList/AnswerList';
import AuthContext from '../context/AuthContext';

import { findAnswersByQuestionId, createAnswer } from '../services/Answer';

jest.mock('../services/Answer');

Enzyme.configure({ adapter: new Adapter() });

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return shallow(<QuestionDetail {...defaultProps} />);
};

describe('QuestionDetailPage', () => {
    const mock_props = { 
        selectedQuestion: {id:'123', text: 'text', user: 'user', creationDate:'2019-01-02', answers: []},
        backButtonClicked: jest.fn()
    } ;

    describe('Render components', () => {
        test('should render BackButton', () => {
            const component = createComponent();
            expect(component.find(BackButton).exists()).toBe(true);
        });
        test('should render QuestionBox', () => {
            const component = createComponent();
            expect(component.find(QuestionBox).exists()).toBe(true);
        });
        test('should render AnswerList', () => {
            const component = createComponent();
            expect(component.find(AnswerList).exists()).toBe(true);
        });
        test('should render AuthContext', () => {
            const component = createComponent();
            const authContext = component.find(AuthContext.Consumer);
            expect(authContext.exists()).toBe(true);
        });
    describe('States and Methods', () => {
        test('componentDidMount: should call fetch function', async () => {
            const component = createComponent(mock_props);

            component.instance().fetchAnswersByQuestionId = jest.fn();

            await component.instance().componentDidMount();

            expect(component.instance().fetchAnswersByQuestionId).toHaveBeenCalledWith(mock_props.selectedQuestion.id);
        });
        test('fetchQuestions without error', async () => {
			const component = createComponent();
			const answers = [ {id:'11', text: 'text', user: 'user', creationDate:'2019-01-02', answers:[]} ];
			const response = { answers: answers };

			findAnswersByQuestionId.mockResolvedValue(response);

			await component.instance().fetchAnswersByQuestionId('111');

            expect(findAnswersByQuestionId).toHaveBeenCalledWith('111');
			expect(component.state('answers')).toStrictEqual(response.answers);
			expect(component.state('error')).toBe(false);
        });
        test('fetchQuestions with error', async () => {
			const component = createComponent();
			const error_message = 'error message';
			const response = { error: true, message: error_message};

			findAnswersByQuestionId.mockResolvedValue(response);

			await component.instance().fetchAnswersByQuestionId('111');

            expect(findAnswersByQuestionId).toHaveBeenCalledWith('111');
			expect(component.state('errorMessage')).toStrictEqual(response.message);
			expect(component.state('error')).toBe(true);
		});
        test('saveAnswer without error', async () => {
            const component = createComponent(mock_props);
            const newAnswer = 'answer';
            const username = 'user';
            const questionId = 'questionId';
            const answer =  {text: newAnswer, user: username, questionId: questionId};
            const response = { answer : answer}; 

            createAnswer.mockResolvedValue(response);

            await component.instance().saveAnswer(newAnswer, username, questionId);

            expect(createAnswer).toHaveBeenCalledWith(answer);
            expect(component.state('error')).toBe(false);
        });
        test('saveAnswer with error', async () => {
            const component = createComponent(mock_props);
            const newAnswer = 'answer';
            const username = 'user';
            const questionId = 'questionId';
            const answer =  {text: newAnswer, user: username, questionId: questionId};
            const error_message = 'error message';
            const response = { error: true, message: error_message};

            createAnswer.mockResolvedValue(response);

            await component.instance().saveAnswer(newAnswer, username, questionId);

            expect(createAnswer).toHaveBeenCalledWith(answer);
            expect(component.state('errorMessage')).toStrictEqual(response.message);
            expect(component.state('error')).toBe(true);
        });
        test('onNewAnswerChange: newAnswer', () => {
            const value = 'value';
            const component = createComponent(mock_props);

            component.instance().onNewAnswerChange(value);

            expect(component.state('newAnswer')).toBe('value');
        });
        test('onNewAnswerSubmit: window confirm true', async () => {
            const component = createComponent(mock_props);

            const event = { preventDefault: _ => _}
			const username = 'username';
            const questionId = 'questionId';
            const newAnswerState = 'newAnswer';
            component.setState({ newAnswer: newAnswerState });

            window.confirm = jest.fn(() => true);
            component.instance().fetchAnswersByQuestionId = jest.fn();
            component.instance().saveAnswer = jest.fn();
  
            await component.instance().onNewAnswerSubmit(event, username, questionId);
            
            expect(component.instance().saveAnswer).toHaveBeenCalledWith(newAnswerState, username, questionId );
            expect(component.state('newAnswer')).toBe('');
            expect(component.instance().fetchAnswersByQuestionId).toHaveBeenCalledWith(mock_props.selectedQuestion.id);
        });
        test('onNewAnswerSubmit: window confirm false', async () => {
            const component = createComponent(mock_props);

            const event = { preventDefault: _ => _}
			const username = 'username';
            const questionId = 'questionId';

            window.confirm = jest.fn(() => false);
            component.instance().fetchAnswersByQuestionId = jest.fn();
  
            await component.instance().onNewAnswerSubmit(event, username, questionId);
            
            expect(component.instance().fetchAnswersByQuestionId).toHaveBeenCalledWith(mock_props.selectedQuestion.id);
        });

    });    
     
    });
});