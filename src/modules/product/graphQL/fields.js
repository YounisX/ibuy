import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import productModel from "../../../../DB/model/Product.model.js";
import { productType } from "./types.js";

export const products = {
  type: new GraphQLList(productType),
  resolve: async () => {
    const products = await productModel.find({});
    return products;
  },
};

export const productById = {
  type: productType,
  args: {
id: { type: new GraphQLNonNull(GraphQLID) },
  },
resolve: async (parent, args) => {
    const product = await productModel.findById(args.id);
    return product;
  },
};
