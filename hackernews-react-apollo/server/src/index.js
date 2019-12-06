const {GraphQLServer} = require('graphql-yoga');
const {removeEmpty} = require('./utils/object');

let links = [{
    id: 'link-0',
    url: 'https://vk.com',
    description: 'VK COM'
}];

let idCount = links.length;

const resolvers = {
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },

    Query: {
        info: () => 'string',
        user: () => ({id: '123213', name: 'Hey'}),
        users: () => ([{id: '123213', name: 'Hey'}]),
        feed: () => links,
        link: (parent, {id}) => links.find(link.id === id)
    },

    Mutation: {
        createUser: (name) => ({id: '123', name: '123' + name}),

        post: (parent, {url, description}) => {
            const link = {
                id: `link-${idCount++}`,
                description: description,
                url: url,
            };
            links.push(link);
            return link;
        },

        updateLink: (parent, {id, url, description}) => {
            const indexToUpdate = links.findIndex(link => link.id === id);
            links[indexToUpdate] = Object.assign(links[indexToUpdate], removeEmpty({url, description}));
            return links[indexToUpdate];
        },

        removeLink: (parent, {id}) => {
            const indexToRemove = links.findIndex(link => link.id === id);
            const removedLink = Object.assign({}, links[indexToRemove]);
            links.splice(indexToRemove, 1);
            return removedLink;
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));
