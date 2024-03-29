
module.exports = {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
    createdAt: (parent) => parent.createdAt,
    postedBy: (parent, args, context) => {
        return context.prisma.link({ id: parent.id }).postedBy();
    },
    votes: (parent, args, context) => {
        return context.prisma.link({ id: parent.id }).votes();
    }
};
