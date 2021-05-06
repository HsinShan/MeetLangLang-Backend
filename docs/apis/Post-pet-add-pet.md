# POST /pet
A function that can save user's pet data into PetInfo table.

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
|`petName`|string|user's pet name|
|`petSex`|string|user's pet sex|
|`petAge`|string|user's pet age|
|`petKind`|string|user's pet kind|
|`petIntro`|string|user's pet intro|
|`petPhoto`|string|user's pet photo url|

## Response fields

|Name|Type|Description|
|-|-|-|
|`success`|bool|value to indicate whether save was successful|
