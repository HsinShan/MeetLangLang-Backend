# POST /animal/favorites
A function that can save user's liked animals to FavoriteMap table and add animal info to AnimalInfo table.   

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
|`animalId`|string|animalid received from gov api|
|`sex`|string|animal sex received from gov api|
|`kind`|string|animal kind received from gov api|
|`colour`|string|animal colour received from gov api|
|`sterilization`|string|animal sterilization state received from gov api|
|`remark`|string|animal remarks received from gov api|
|`tel`|string|shelter telephone no received from gov api|
|`address`|string|shelter address received from gov api|
|`place`|string|animal location received from gov api|
|`picture`|string|animal picture received from gov api|

## Response fields

|Name|Type|Description|
|-|-|-|
|`success`|bool|value to indicate whether save was successful|
