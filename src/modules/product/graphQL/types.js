import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const imageType = new GraphQLObjectType({
  name: "imageType",
  fields: {
    secure_url: { type: GraphQLString },
    public_id: { type: GraphQLString },
  },
});

export const productType = new GraphQLObjectType({
  name: "products",
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLString },
    finalPrice: { type: GraphQLString },
    stock: { type: GraphQLString },
    color: { type: new GraphQLList(GraphQLString) },
    mainImage: {
      type: imageType,
    },
    subImages: { type: new GraphQLList(imageType) },
    subCategoryId: { type: GraphQLID },
    categoryId: { type: GraphQLID },
    brandId: {
      type: new GraphQLObjectType({
        name: "brandType",
        fields: {
            slug: { type: GraphQLID },
          image: { type: imageType },
          name: { type: GraphQLString },
          slug:{type:GraphQLString}
        },
      }),
    },
  },
});
