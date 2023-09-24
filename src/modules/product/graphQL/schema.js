import { GraphQLSchema, GraphQLString } from "graphql";
import { GraphQLObjectType } from 'graphql';
import * as productController from './fields.js'
export const productSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"productType",
        description:"",
        fields:{
            products:productController.products
          
        }
    })
})