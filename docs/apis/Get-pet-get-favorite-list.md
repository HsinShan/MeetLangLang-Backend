# POST /pet/favorites
A function that returns user's saved pets' pet info.

## Authentication
|Method|
|-|
|No|

## JSON body parameters

|Name|Type|Description|
|`uuid`|string|user's uuid|

## Response fields

|Name|Type|Description|
|`result`|bool|indicates whether user has saved pets|
|`petlist`|list|all users saved pets' pet info|

