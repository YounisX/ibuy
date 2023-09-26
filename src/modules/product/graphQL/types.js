import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export function imageType(name) {
  return new GraphQLObjectType({
    name: name||"imageType",
    fields: {
      secure_url: { type: GraphQLString },
      public_id: { type: GraphQLString },
    },
  });
}
export const sharedTypes = imageType()

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
      type: sharedTypes,
    },
    subImages: { type: new GraphQLList(sharedTypes) },
    subCategoryId: { type: GraphQLID },
    categoryId: { type: GraphQLID },
    brandId: {
      type: new GraphQLObjectType({
        name: "brandType",
        fields: {
            slug: { type: GraphQLID },
          image: { type: sharedTypes },
          name: { type: GraphQLString },
          slug:{type:GraphQLString}
        },
      }),
    },
  },
});
