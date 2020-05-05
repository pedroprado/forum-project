import React from 'react';
import PropTypes from 'prop-types';

const apiError = props => {
    return (
    <>
        {props.error? 
            <div style={{padding:'15px'}} data-testid='apiErrorId'>
                <p>Erro ao buscar dados.</p>
                <p>Tente novamente mais tarde!</p>
                <p>Tipo do Erro: <span style={{fontWeight:'bolder'}} data-testid='messageSpanId'>{props.message}</span></p>
            </div> 
            : 
            <div data-testid='apiErrorNotErrorId'>{props.children}</div>
        }
    </> 
  );
};

apiError.propTypes = {
    message: PropTypes.string
};

export default apiError;