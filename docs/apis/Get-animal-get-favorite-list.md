# GET /animal/favorites
A function that returns all user's saved animals' info.

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
|`animalInfo`|array|all users saved animals info|

### animalInfo fields

|Name|Type|Description|
|-|-|-|
|`animal_id`|string|animalid received from gov api|
|`animal_sex`|string|animal sex received from gov api|
|`animal_kind`|string|animal kind received from gov api|
|`animal_colour`|string|animal colour received from gov api|
|`animal_sterilization`|string|animal sterilization state received from gov api|
|`animal_remark`|string|animal remarks received from gov api|
|`shelter_tel`|string|shelter telephone no received from gov api|
|`shelter_address`|string|shelter address received from gov api|
|`animal_place`|string|animal location received from gov api|
|`album_file`|string|animal picture received from gov api|

