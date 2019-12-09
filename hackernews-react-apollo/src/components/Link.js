import React from 'react';

const Link = ({description = '', url = '', postedBy = {name: ''} }) => {
    return (
        <div>
            <div>
                {description} ({url}) [{postedBy && postedBy.email}]
            </div>
        </div>
    );
};

export default Link;
