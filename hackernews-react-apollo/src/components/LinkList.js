import React from 'react';
import Link from './Link';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                url
                description
                createdAt
                postedBy {
                    name
                    email
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`;

const LinkList = () => {
    const { loading, error, data } = useQuery(FEED_QUERY);

    const updateCacheAfterVote = (store, createVote, linkId) => {
        const data = store.readQuery({ query: FEED_QUERY });

        const votedLink = data.feed.links.find(link => link.id === linkId);
        votedLink.votes = createVote.link.votes;

        store.writeQuery({ query: FEED_QUERY, data });
    };

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return data.feed.links.map((link, index) => (
        <Link
            key={link.id}
            {...link}
            index={index}
            updateStoreAfterVote={updateCacheAfterVote}
        />
    ));
};

export default LinkList;
