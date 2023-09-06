
class ApiFeature {

constructor(mongooseQuery,queryData){
    this.mongooseQuery = mongooseQuery;
    this.queryData = queryData;
}

paginate(){
    const{page,size} = this.queryData;
    if(!page||page<=0){
        page = 1 ; 
      }
      if(!size||size<=0){
        size = 3 ; 
      }
      //equation to get the number of pages to skip in pagination
      const skip  = (page - 1) * size;
     this.mongooseQuery.skip(skip).limit(size);
     return this;

}

filter(){
const excludeQueryParams = ['page','size','sort','search','fields'];
const filterQuery ={...this.queryData}
excludeQueryParams.forEach(param=> delete filterQuery[param]);
this.mongooseQuery.find(JSON.parse(JSON.stringify(filterQuery).replace(/(gt|gte|lt|lte|in|nin|eq|neq)/g,match=>`$${match}`)));
return this 
}

sort(){
this.mongooseQuery.sort(this.queryData.sort?.replaceAll(","," ")) ; 
return this ; 
}


}

export default ApiFeature;