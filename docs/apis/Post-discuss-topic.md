# POST /discuss/topic

Add new topic in discuss with logged in user account.

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
|`topic`|string|Topic name|
|`content`|string|Content of topic|

## Response fields

|Name|Type|Description|
|-|-|-|
|`success`|boolean|if success, the result will be true.|
