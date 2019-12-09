import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { ApolloProvider } from 'react-apollo';
import { client } from './services/apollo';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    ),
    document.getElementById('root')
);
