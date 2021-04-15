# POST /user/savepet
A function that checks if the user has already saved the pet or not.

## Authentication
|Method|
|-|
|No|

## JSON body parameters

|Name|Type|Description|
|`uuid`|string|user's uuid|
|`petId`|string|petid received from gov api|

## Response fields

|Name|Type|Description|
|`saved`|bool|value to indicate whether save was successful|
