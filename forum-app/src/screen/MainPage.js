import React, { PureComponent } from 'react';
import Questions from '../containers/Questions';
import QuestionDetail from '../containers/QuestionDetail';

import styles from './MainPage.module.css'

class MainPage extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selectedQuestionItem: {},
			viewQuestionDetail: false,   
        }
    }

    onBackButtonClicked = () =>{
        this.setState({ viewQuestionDetail: false});

        const state = { 
            selectedQuestionItem: {},
            viewQuestionDetail: false
        }
        localStorage.setItem('state', JSON.stringify(state));

    };
    
    onQuestionItemSelected = (selectedQuestion)=>{
		this.setState({ selectedQuestionItem: selectedQuestion });
        this.setState({ viewQuestionDetail: true});
        
        const state = { 
            selectedQuestionItem: {...selectedQuestion},
            viewQuestionDetail: true
        }
        localStorage.setItem('state', JSON.stringify(state));
       
	};

    componentDidMount = () => {
        const state = JSON.parse(localStorage.getItem('state'));
        if(state !== null){
            this.setState({selectedQuestionItem: state.selectedQuestionItem});
            this.setState({viewQuestionDetail: state.viewQuestionDetail});
        }
    };

    render(){
        const { viewQuestionDetail, selectedQuestionItem } = this.state;
        return(
            <div className={styles.MainPage}>
            {viewQuestionDetail? 
                <QuestionDetail 
                    backButtonClicked={this.onBackButtonClicked}
					selectedQuestion={selectedQuestionItem}/> 
                : 
                <Questions 
                    onQuestionItemSelected={this.onQuestionItemSelected}
                />
            }
            </div>
        );
    };
}

export default MainPage;
