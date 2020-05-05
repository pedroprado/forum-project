import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QuestionsSummary from '../components/QuestionsSummary/QuestionsSummary';
import ApiError from '../hoc/error/ApiError';

import { listQuestions, createQuestion } from '../services/Question';
import { createLike, updateLike } from '../services/Like';

class Questions extends PureComponent{
	_isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
			questions: [],
			newQuestion: '',
			error: false,
			errorMessage: '',
        };
    }

	fetchQuestions = async () => {
		const response = await listQuestions();
		if(response.error){
			if(this._isMounted){
				this.setState({ errorMessage: response.message});
				this.setState({ error : true });
			}
		}else{
			if(this._isMounted){
				this.setState({ questions: [...response.questions]});
				this.setState({ error : false });
			}
			
		}	
	};

	saveQuestion = async (newQuestion, username) => {
		const new_question = { text: newQuestion, user: username }
		const response = await createQuestion(new_question);
		if(response.error){
			if(this._isMounted){
				this.setState({ errorMessage: response.message});
				this.setState({ error : true });
			}
		}else{
			if(this._isMounted){
				this.setState({ error : false });
			}
		}	
	}


	onQuestionItemSelected = (questionId)=>{
		const question = this.state.questions.filter( question => question.id === questionId);
		this.props.onQuestionItemSelected(question[0]);
	};

	onNewQuestionChange = (value) =>{
		this._isMounted && this.setState({newQuestion: value});
	}

	onNewQuestionSubmit = async (event, username) => {
		event.preventDefault();
		if (window.confirm('Tem certeza que deseja enviar pergunta?')){
			await this.saveQuestion(this.state.newQuestion, username);
			await this.fetchQuestions();
			this._isMounted && this.setState({ newQuestion: ''});
		}
	};

	onLikeQuestionClicked = async (myLike, questionId, username) => {
		if(myLike.length === 0 || myLike === undefined){
            const like = {
                itemId: questionId,
                type: 1,
                user: username,
                liked: true
			};
			await createLike(like);
        }else{
            const like_id = myLike[0].id;
			const liked = !myLike[0].liked;
			await updateLike(like_id, liked);
		}
		await this.fetchQuestions();	
	};

	componentWillUnmount() {
		this._isMounted = false;
	 }

    componentDidMount = async () => {
		this._isMounted = true;
		await this.fetchQuestions();
    }

    render(){
		const { questions, newQuestion, error, errorMessage } = this.state;
        return(
			<ApiError error={error} message={errorMessage} >
				<QuestionsSummary
					onQuestionSelected={this.onQuestionItemSelected}
					onLikeQuestionClicked={this.onLikeQuestionClicked}
					newQuestion={newQuestion} 
					onNewQuestionChange={this.onNewQuestionChange}
					onNewQuestionSubmit = {this.onNewQuestionSubmit}   
					questions={questions} />
			</ApiError> 
        );  
    };
}

Questions.propTypes = {
	onQuestionItemSelected: PropTypes.func
};

export default Questions;