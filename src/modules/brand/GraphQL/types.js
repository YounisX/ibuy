export const brandTypes = new GraphQLObjectType({
    name: "brandType",
    fields: {
        slug: { type: GraphQLID },
      image: { type: imageType },
      name: { type: GraphQLString },
      slug:{type:GraphQLString}
    },
  })