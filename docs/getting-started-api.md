[Home](../readme.md)
# API Getting Started Guide

Welcome to the Soundbite API Getting Started Guide.  This guide is intended to quickly familiarize 
you with key aspects of setting up and configuring the Soundbite API for use within your solution.
It has been broken down into the following steps:

1. Setup package dependencies
2. Configure an HTTP Adapter
3. Configure Soundbite API Settings

<br/>

## Soundbite Packages

At its core, Soundbite is a secure, enterprise-grade communications platform exposed via Web APIs. To
make interacting with our platform simple for developers, we have created a series of NPM packages 
that provide varying levels of integration options for our partners. Following is a brief overview of 
the NPM packages that we make available and what they contain:

|Package Name                |Description|
|----------------------------|-----------------------------------------------------------------------------------|
|**@soundbite/api**          |Contains the core API models and web API service classes for the Soundbite Platform.  This package can be used to build fully custom solutions on the Soundbite platform.|
|**@soundbite/api&#x2011;axios**    |Provides a default HTTP Adapter implementation using Axios.|
|**@soundbite/widgets&#x2011;react**|Contains fully functional REACT-based UI widgets that can be embedded into an application to provide Soundbite functionality with minimal development effort.|

<br/>

## Setting Up Dependencies

Soundbite packages are currently available for download as .tgz files. These packages can be placed
anywhere in your file system as long as they can be correctly referenced from the **package.json**
file in your project.  For the sake of simplicity, we recommend that you place the .tgz files in a
folder named **packages** at the root your solution.  

You can add Soundbite package dependencies to a project using **npm install** and the relative or 
absolute path the .tgz file.  In the example below, the .tgz files are relatively refereferenced
from the **packages** folder in the root of the solution:

```
npm install ./packages/soundbite-api-1.0.0.tgz
npm install ./packages/soundbite-api-axios-1.0.0.tgz
npm install ./packages/soundbite-widgets-react-i-1.0.0.tgz
```

Installing using **npm install** updates your **package.json** file with the appropriate dependency 
entry and deploys the contents of the package to the **node_modules** folder. 

Alternatively, you can manually add the .tgz file references to the **dependencies** section of your
solution's **package.json** file as shown below:

```json
{
  ...
  "dependencies":{
    "@soundbite/api": "./externals/soundbite-api-1.0.0.tgz",
    "@soundbite/api-axios": "./externals/soundbite-api-axios-1.0.0.tgz",
    "@soundbite/widgets-react": "./externals/soundbite-widgets-react-1.0.0.tgz"
  }
  ...
}
```

Manually adding the .tgz packages to the **package.json** will not automatically deploy the contents
of the package(s) to the **node_modules** folder, so you will need to run 
```
npm install
```
before the packages can be used in your solution.

<br/>

## Setting up an HTTP Adapter

You probably have a favorite NPM package for making xHttp calls.  You probably also have a bunch
of reasons why it is great and everyone should use it. Someone out there disagrees with you, and 
someone else out there disagrees with both of you plus everyone else on the internet. Instead of 
getting entrenched in this debate, Soundbite created an HTTP adapter interface that allows you to 
use whatever xHttp client you want.  It also has the added benefit of keeping bundle sizes down
because you only have to bundle one xHttp package with your solution instead of two.

For now, there are two options for setting up an HTTP adapter.

1. [**Use the Axios HTTP Adapter**](http-adapter-axios.md) - this option is optimal if your solution
is already using the Axios libary for HTTP calls because it will optimze your bundle size.  This is
also a good option if you are just getting started and want to quickly get up and running. You can 
always opt to build a custom HTTP Adapter later.  They can be switched out seamlessly.

2. [**Build a custom HTTP Adapter**](http-adapter-custom.md) - this option requires a bit of custom
development work to implement the IHttpAdapter using the library of your choice.  Since the 
interface mimics standard HTTP verb calls, implementation is normally straightforward.  This 
approach optimizes your bundle sizes.

<br/>

## Configuring the Soundbite API

Before you can ue the Soundbite API, it must be configured appropriately.  There are a series of
configuration properties exposed from from ```SoundbiteApiConfig``` in the ```@soundbite/api``` 
package, two of which must be set for API calls to succeed.  

The first is the ```httpAdapter``` property which stores a reference to the HTTP adapter used to 
make xHTTP calls.  Custom HTTP adapter implementations will need to set this property. Out of the 
box implementations from Soundbite set this property behind the scenes, so you do not have to 
explicitly set it yourself. Setting this value is outlined in more details in the 
[**Build a custom HTTP Adapter**](http-adapter-custom.md) page.

The second property that must be set is the ```getToken``` property.  Soundbite is a secure 
platform and almost all API calls require an authentication token for access.  Your application
communicates the token value to the Soundbite API through the ```getToken``` property, which stores
a function delegate that produces a ```promise<string|null>``` value. When Soundbite needs a
token, it calls ```getToken()``` and uses the resulting string as the Bearer token for 
authenticating API calls. If your application has the token string in full, you can return a
resolved promise containing the value as shown below:

``` javascript
SoundbiteApiConfig.getToken = () => Promise.resolve("<tokenValue>");
```

If your application acquires the token at a later time, then we recommend creating a local function
to acquire the token, then assigning that local function to the ```getToken``` property to help
with closures.  We receive a number of issues about tokens not updating due to improper closures.

``` javascript
let _token = null;

async function getTokenLocal(): Promise<string|null>{
    return Promise.resolve(_token);
}

SoundbiteApiConfig.getToken = getTokenLocal;

...
// Some code that updates _token that runs later on...
// Possibly a timer to avoid expired tokens...
...
```

You only need to set the ```getToken``` method once, so this call should be placed alongside other 
application initialization code. 

**Note**: Bearer tokens tend to have expiry times of approximately one hour.  If your applicaiton 
runs for long durations, then you may need to refresh the token through the Soundbite API from time
to time.

<br/>

**The complete list of configurable properties are listed below:**

|Property Name     |Required|Type|Description|
|------------------|--------|----|---|
|ApiPrefixUrl      | No     |String|URL to the Soundbite API.  By default, this value points to https://usw.soundbite.cloud/api/v1 which is the primarily production soundbite location. If you need to point to a custom/test instance of the Soundbite API this value will need to be set accordingly|
|getToken          | Yes    |Delegate|Stores a delgate function that must return a bearer token string that can be sent in the Authorization header for secure API calls.|
|httpAdapter       | Yes    |String|Reference to the IHttpAdapter instance to use for HTTP calls.  Must be set explicitly when implementing your own custom HTTP Adapter.  Soundbite HTTP adapters set this up behind the scenes (e.g. when calling ```useAxios```). See [Custom HTTP Adapter](http-adapter-custom.md) for details on settting this property.|
|imgAvatarUrl      | No     |String|Relative or absolute path of the image used to represent users with no profile image.|
|imgEmptyCardArtUrl| No     |String|Relative or absolute path of the image displayed when a feed has no content.|

Configuring these settings simply requires setting the appropriate property on the ```SoundbiteApiConfig``` object.

```javascript
import { SoundbiteApiConfig } from "@soundbite/api";
...
SoundbiteApiConfig.imgAvatarUrl = "/images/CustomUserHasNoAvatar.png";
SoundbiteApiConfig.imgEmptyCardArtUrl = "/images/NoItemsInFeed.png";
...
```
