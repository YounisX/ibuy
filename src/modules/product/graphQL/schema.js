import { GraphQLSchema, GraphQLString } from "graphql";
import { GraphQLObjectType } from 'graphql';
import * as productController from './fields.js'
export const productSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"productType",
        description:"",
        fields:{
            products:productController.products,
            productbyId:productController.productById
          
        }
    }),
    mutation:new GraphQLObjectType({
        name:"productMutaion",
        fields:{
            updateStock: productController.updateStock,
            deleteProduct: productController.deleteProduct
        }
    })
})