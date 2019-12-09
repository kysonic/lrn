import React from 'react';
import { AUTH_TOKEN } from './Login';
import { timeDifferenceForDate } from '../utils/datetime';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                id
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

const Link = ({id, description = '', url = '', index = 0, postedBy = {name: ''}, createdAt = '', votes = [], updateStoreAfterVote}) => {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const [voteMutation, { data } ] = useMutation(VOTE_MUTATION, {
        update: (store, { data: { vote } }) => updateStoreAfterVote(store, vote, id)
    });

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{index + 1}.</span>
                {authToken && (
                    <div className="ml1 gray f11" onClick={() => voteMutation({ variables: {linkId: id} })}>
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {description} ({url})
                </div>
                <div className="f6 lh-copy gray">
                    {votes.length} votes | by{' '}
                    {postedBy ? postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(createdAt)}
                </div>
            </div>
        </div>
    );
};

export default Link;
