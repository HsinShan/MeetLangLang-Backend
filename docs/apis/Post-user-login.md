# POST /user/login

Let users sign in or sign up.

## Authentication

|Method|
|-|
|No|

## JSON body parameters

|Name|Type|Description|
|-|-|-|
|`email`|string|User's email|

## Response fields

|Name|Type|Description|
|-|-|-|
|`token`|string|jwt token for user|
|`firstName`|string|user's first name|
|`fullName`|string|user's full name|
