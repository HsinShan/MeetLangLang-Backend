# POST /user/savepet
A feature that can save user's liked pet to FavoriteMap table and add petInfo to PetInfo table.   

## Authentication
|Method|
|-|
|No|

## JSON body parameters

|Name|Type|Description|
|`uuid`|string|user's uuid|
|`petId`|string|petid received from gov api|
|`sex`|string|pet sex received from gov api|
|`age`|string|pet age received from gov api|
|`kind`|string|pet kind received from gov api|
|`address`|string|pet address received from gov api|
|`picture`|string|pet picture received from gov api|

## Response fields

|Name|Type|Description|
|`success`|bool|value to indicate whether save was successful|
