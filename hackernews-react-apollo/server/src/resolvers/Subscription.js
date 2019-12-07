function newLinkSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    },
};

function newVoteSubscription(parent, args, context) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
}

const newVote = {
    subscribe: newVoteSubscription,
    resolve: payload => {
        return payload
    },
};

module.exports = {
    newLink,
    newVote
};
