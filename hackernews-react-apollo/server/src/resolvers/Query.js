async function feed(parent, args, context) {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { url_contains: args.filter },
        ],
    } : {};

    const count = await context.prisma
        .linksConnection({
            where,
        })
        .aggregate()
        .count();

    const links = context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    });

    return {
        count,
        links
    }
}

module.exports = {
    feed,
};
