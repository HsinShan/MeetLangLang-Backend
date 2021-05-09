# POST /discuss/topic

Add new response in MesgResponse with logged in user account.

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
|`mesgId`|string|The uuid of the topic responsed|
|`content`|string|Content of response|

## Response fields

|Name|Type|Description|
|-|-|-|
|`success`|boolean|if success, the result will be true.|
