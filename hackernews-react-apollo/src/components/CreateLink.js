import React, {useState} from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            url
            description
        }
    }
`;

const CreateLink = ({history}) => {
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const [createPost, { data }] = useMutation(POST_MUTATION, {
        onCompleted: () => {
            history.push('/');
        }
    });

    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <button onClick={() => {
                createPost({variables: {description, url}});
            }}>Submit</button>
        </div>
    );
};

export default CreateLink;
