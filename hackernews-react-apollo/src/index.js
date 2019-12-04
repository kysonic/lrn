import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { ApolloProvider } from 'react-apollo';
import { client } from './services/apollo';

ReactDOM.render(
    (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    ),
    document.getElementById('root')
);
