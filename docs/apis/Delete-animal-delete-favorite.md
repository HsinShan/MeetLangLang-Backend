# DELETE /animal/favorites
A function that can delete animal from users' favorite list and delete info from animalInfo table if needed.

## Authentication
|Method|
|-|
|No|

## Headers
|Name|Type|Description|
|-|-|-|
|`token`|string|The logged in user token|

## Query parameters

|Name|Type|Description|
|-|-|-|


## Path parameters

|Name|Type|Description|
|-|-|-|

## JSON body parameters

|Name|Type|Description|
|-|-|-|
|`animalId`|string|animalid received from gov api|

## Response fields

|Name|Type|Description|
|-|-|-|
|`success`|bool|value to indicate whether delete was successful|
