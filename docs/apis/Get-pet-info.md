# GET /discuss/topic/detail/:messageId
A function with userId that returns pet info from the user .

## Authentication
|Method|
|-|
|No|

## Headers
|Name|Type|Description|
|-|-|-|

## Query parameters

|Name|Type|Description|
|-|-|-|

## Path parameters

|Name|Type|Description|
|-|-|-|
|`userId`|number||

## JSON body parameters

|Name|Type|Description|
|-|-|-|

## Response fields

|Name|Type|Description|
|-|-|-|
|`data`|array|pet info of the certain user|

### data fields

|Name|Type|Description|
|-|-|-|
|`key`|number|The uuid of the pet data|
|`petName`|string|Name of the pet|
|`petSex`|string|Sex of the pet|
|`petAge`|string|Age of the pet|
|`petKind`|string|Kind of the pet|
|`petIntro`|string|Introduction of the pet|
|`petPhoto`|string|Photo of the pet|