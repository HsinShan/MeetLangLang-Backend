# Error Code
- 共三碼
## 第一碼: modules
1. auth
2. animal
3. discuss
4. user
5. pet
## 第二碼: type
1. token
2. parameter
3. db
## 第三碼: 流水號

## 列表
|Code|Description|
|-|-|
|111|token is invalid|
|121|field `token` is missing.|
|211|token has not been decoded.|
|221|animalId is missing|
|231|Insert animal info into animalInfo table error|
|232|Insert uuid & animalId into FavoriteMap table error|
|233|Delete link in FavoriteMap table error|
|234|Check if need to delete animal in AnimalInfo table error|
|311|token has not been decoded.|
|321|field `title` is missing.|
|322|field `content` is missing.|
|323|field `title` should not be empty.|
|324|field `content` should not be empty.|
|331|insert into Message table error|
|332|get topics form Message table error|
|333|get detail form Message table error|
|421|field `accessToken` is missing.|
|422|field `email` is missing.|
|423|field `first_name` is missing.|
|424|field `name` is missing.|
|431|insert into User table error|
|511|token has not been decoded.|
|521|petname is missing.|
|522|field `petName` should not be empty.|
|531|insert pet info into PetInfo table error|
|532|get pet info from PetInfo table error|