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
                postedBy {
                    email
                }
            }
        }
    }
`;

const LinkList = () => {
    const { loading, error, data, refetch } = useQuery(FEED_QUERY);

    window.refetchLinks = refetch;

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

    return data.feed.links.map((link, id) => (
        <Link key={id} {...link} />
    ));
};

export default LinkList;
