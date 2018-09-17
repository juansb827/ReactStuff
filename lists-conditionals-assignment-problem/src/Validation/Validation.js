import React from 'react';

const validation = (props) => {
    return  ( 
        <div>
            {(props.length < 5) ? <p>Too short</p> : <p>Text long enough</p>}
        </div>               
    )

}

export default validation;