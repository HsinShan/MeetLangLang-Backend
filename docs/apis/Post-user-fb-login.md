# POST /user/fb-login

Let users sign in or sign up by facebook.

## Authentication

|Method|
|-|
|No|

## JSON body parameters

|Name|Type|Description|
|-|-|-|
|`accessToken`|string|access token from Facebook|

## Response fields

|Name|Type|Description|
|-|-|-|
|`token`|string|jwt token for user|
