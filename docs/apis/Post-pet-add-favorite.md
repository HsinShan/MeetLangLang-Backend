# POST /pet/favorites
A function that can save user's liked pets to FavoriteMap table and add petInfo to PetInfo table.   

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
|`petId`|string|petid received from gov api|
|`sex`|string|pet sex received from gov api|
|`kind`|string|pet kind received from gov api|
|`color`|string|pet color received from gov api|
|`sterilization`|string|pet sterilization state received from gov api|
|`remark`|string|pet remarks received from gov api|
|`tel`|string|shelter telephone no received from gov api|
|`address`|string|shelter address received from gov api|
|`place`|string|pet location received from gov api|
|`picture`|string|pet picture received from gov api|

## Response fields

|Name|Type|Description|
|-|-|-|
|`success`|bool|value to indicate whether save was successful|
