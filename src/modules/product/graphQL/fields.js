import {  GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import productModel from '../../../../DB/model/Product.model.js'
export const products = 
    {
    type:new GraphQLList(new GraphQLObjectType({
        name:'products',
        fields:{
        name:{type:GraphQLString}
        }
    })),resolve:async()=>{
    const products  = await productModel.find({});
    return  products; 
    }
    }
