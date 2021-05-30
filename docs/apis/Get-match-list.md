# GET /match/list
A function with userId that returns match data the user received .

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

## Response fields

|Name|Type|Description|
|-|-|-|
|`data`|array|info of the users that send match|

### data fields

|Name|Type|Description|
|-|-|-|
|`userId`|string|UserId of the user that send the match|
|`name`|string|Name of the user that send the match|
|`email`|string|Email of the user that send the match|
|`petData`|array|pet info of the user that send the match|

### petData fields

|Name|Type|Description|
|-|-|-|
|`key`|number|The uuid of the pet data|
|`petName`|string|Name of the pet|
|`petSex`|string|Sex of the pet|
|`petAge`|string|Age of the pet|
|`petKind`|string|Kind of the pet|
|`petIntro`|string|Introduction of the pet|
|`petPhoto`|string|Photo of the pet|