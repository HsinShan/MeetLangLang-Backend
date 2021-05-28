# POST /pet/draw

Draw a pet-card.

## Authentication

|Method|
|-|
|JWT Token|

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

## Response fields

|Name|Type|Description|
|-|-|-|
|`key`|number|The uuid of the pet data|
|`petName`|string|Name of the pet|
|`petSex`|string|Sex of the pet|
|`petAge`|string|Age of the pet|
|`petKind`|string|Kind of the pet|
|`petIntro`|string|Introduction of the pet|
|`petPhoto`|string|Photo of the pet|
|`userId`|string|UserId of the pet owner|