import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BackButton from '../components/UI/BackButton/BackButton';
import QuestionBox from '../components/QuestionDetail/QuestionBox/QuestionBox';
import AnswerList from '../components/QuestionDetail/AnswerList/AnswerList';
import AnswerForm from '../components/UI/Forms/AnswerForm';
import AuthContext from '../context/AuthContext';
import ApiError from '../hoc/error/ApiError';

import styles from './QuestionDetail.module.css';

import { findAnswersByQuestionId, createAnswer } from '../services/Answer';

class QuestionDetail extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
            newAnswer: '',
            answers: [],
            error: false,
            errorMessage: ''    
        }
    }

    fetchAnswersByQuestionId = async (questionId) => {
        const response = await findAnswersByQuestionId(questionId);
        if(response.error){
			this.setState({ errorMessage: response.message});
			this.setState({ error : true });
		}else{
			this.setState({ answers: [...response.answers]});
			this.setState({ error : false });
		}
    };

    saveAnswer = async (newAnswer, username, questionId) => {
        const answer = {text: newAnswer, user: username, questionId: questionId};
        const response = await createAnswer(answer);
        if(response.error){
			this.setState({ errorMessage: response.message});
			this.setState({ error : true });
		}else{
			this.setState({ error : false });
		}	
	}

	onNewAnswerChange = (value) =>{
		this.setState({newAnswer: value});
	}

	onNewAnswerSubmit = async (event, username, questionId) => {
        event.preventDefault();
		if (window.confirm('Tem certeza que deseja enviar resposta?')){
            await this.saveAnswer(this.state.newAnswer, username, questionId);
            this.setState({ newAnswer: ''});
		}
        await this.fetchAnswersByQuestionId(this.props.selectedQuestion.id);
    };

    componentDidMount = async () => {
        await this.fetchAnswersByQuestionId(this.props.selectedQuestion.id);
    };

    render(){
        const { selectedQuestion } = this.props;
        const { error, errorMessage } = this.state;
        return(
            <div className={styles.QuestionDetail} data-testid='questionDetailId'>
                <BackButton clicked={this.props.backButtonClicked} />
                <ApiError error={error} message={errorMessage} >
                    <QuestionBox 
                        question={selectedQuestion.text}
                        user={selectedQuestion.user}
                        answers={this.state.answers.length} />
                    <AnswerList answerList = {this.state.answers}/>
                    
                    <AuthContext.Consumer>
                        {context => <AnswerForm 
                            questionId = {selectedQuestion.id}
                            username={context.username}
                            newAnswer={this.state.newAnswer}
                            onNewAnswerChange={this.onNewAnswerChange}
                            onNewAnswerSubmit={this.onNewAnswerSubmit}/>}
                    </AuthContext.Consumer>
                </ApiError>
               
            </div>
        );
    }
}

QuestionDetail.defaultProps = {
    selectedQuestion: {
        id: '',
        text: '',
        user: '',
        creationDate: '',
        answers:[]
    }
};

QuestionDetail.propTypes = {
    backButtonClicked : PropTypes.func,
    selectedQuestion: PropTypes.object
};

export default QuestionDetail;


