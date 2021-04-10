# POST /user/savepet
A feature that can save user's liked pet id to DB 

## Authentication

|Method|
|-|
|No|

## JSON body parameters

|Name|Type|Description|
|`pet_ID`|string|petid received from gov api|

## Response fields

|Name|Type|Description|
|`result`|bool|value to indicate whether save was successful|
