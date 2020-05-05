import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainPage from './MainPage';
import Questions from '../containers/Questions';
import QuestionDetail from '../containers/QuestionDetail';

Enzyme.configure({ adapter: new Adapter() });

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return shallow(<MainPage {...defaultProps} />);
};

describe('MainPage', () => {
    describe('Render tests', () => {
        test('Should define component', () => {
            const component = createComponent();
            expect(component).toBeDefined();
        });
        test('Should render QuestionsPage', () => {
            const component = createComponent();
            expect(component.find(Questions).exists()).toBe(true);
        });
        test('Should render QuestionDetailPage', () => {
            const component = createComponent();
            component.setState({ viewQuestionDetail: true });
            expect(component.find(QuestionDetail).exists()).toBe(true);
        });
    });
    describe('States and functions tests', () => {
        test('onBackButtonClicked: should set viewQuestionDetail to false ', () => {
            const component = createComponent();
            component.setState({ viewQuestionDetail: true });
            
            expect(component.state('viewQuestionDetail')).toBe(true);
            
            component.instance().onBackButtonClicked();
            expect(component.state('viewQuestionDetail')).toBe(false);
        });
        test('onQuestionItemSelected: should set selectedQuestionItem and viewQuestionDetail to true', () => {
            const selectedQuestion = { id: '11', text: 'text', user: 'user'};
            const component = createComponent();
            component.setState({ viewQuestionDetail: false });
            
            expect(component.state('viewQuestionDetail')).toBe(false);

            component.instance().onQuestionItemSelected(selectedQuestion);

            expect(component.state('selectedQuestionItem')).toBe(selectedQuestion);
            expect(component.state('viewQuestionDetail')).toBe(true);
        });
    });
    
});