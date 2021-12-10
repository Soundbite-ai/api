![Soundbite Logo](docs/images/logo-long.png)

Soundbite is a secure communications platform for building short-form audio engagement for 
audiences. At its core, our platform is web-api that can be leveraged to build highly customized
audio solutions. We provide a core set of NPM packages to help web developers interact with our
platform, and a series of fully functional UI widgets that can easily be embedded into an existing
application.

![Tech Layers](docs/images/tech-layers.png)

In this document you will find links to the NPM packages that we provide to help integrate our 
platform with your solution, as well as documentation to help you get started developing.

# Documentation

[Getting Started](docs/getting-started.md)
[Widget Documentation](docs/widgets.md)

# SharePoint Web Part Packages


Welcome to the Soundbite API and Widget documentation.  Please know that all example applications
are intended to be very minimilistic to highlight how to get the Soundbite API and Widgets up and 
running without the distraction of secondary concepts.

Most of the examples found here were created using the create-react-app script with the type script
template. All non-essential content was then stripped away (testing, images, css, etc) leaving an
extremely minimal framework for creating samples.

## Soundbite Packages

Soundbite has developed the following NPM packages:

|Package Name                |Description|
|----------------------------|-----------------------------------------------------------------------------------|
|**@soundbite/api**          |Contains the core API models and web API service classes for the Soundbite Platform|
|**@soundbite/api-axios**    |Provides a default HTTP Adapter implementation using Axios|
|**@soundbite/widgets-react**|Contains REACT-based UI widgets that can be embedded into an application|


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



## Implementing a Custom Soundbite HTTP Adapter

You probably have a favorite NPM package for making xHttp calls.  You probably also have a bunch
of reasons why it is great and everyone should use it. Someone out there disagrees with you, and 
someone else disagrees with both of you. Instead of getting entrenched in this debate, Soundbite 
created an HTTP adapter interface that allows you to use whatever xHttp client you want, and has
the added benefit of keeping bundle sizes down.

**But I don't want to implement your HTTP adapter because that sounds hard and annoying!** We
completely understand, and have provided a default implementation using the [Axios npm package](https://www.npmjs.com/package/axios).
Details on using the default implementation are just below this section.  Even if you ultimately
want to implement your own HTTP adapter, you can use the Axios implementation to start and replace
it later with a custom implementation.

Implementing your own HTTP Adapter is fairly straightforward.  First, you need to import 
**```IHttpAdapter```** interface from the **```@soundbite/api```** package

```
import { IHttpAdapter } from "@soundbite/api"
```

Next, you need to implement all of the methods defined by the interface.  The methods essentially
match up with the major HTTP verbs:

```
get: <T>(url: string, includeToken?: boolean, contentType?: string);
post: <T>(url: string, body: unknown, includeToken?: boolean, contentType? string);
put: <T>(url: string, body: unknown, includeToken?: boolean, contentType? string);
patch: <T>(url: string, body: unknown, includeToken?: boolean, contentType? string);
delete: <T>(url: string, includeToken?: boolean, contentType?: string);
```

All methods return a generic type <T> that can represent any data comming back from the request,
and the method parameters details are outlined below:

|Parameter Name|Description|
|--------------|--------------------------------------------------------------|
|url           | Specifies the URL location to which the HTTP request is sent |
|body          | Request body content sent when using post/put/patch.|
|includeToken  | Flag indicating whether a bearer token should be sent with the request.  If not specified defaults to true|
|contentType   | String specifying the value of the Content-Type header of the request.  If not specified defaults to application/json |

Finally, you must configure the Soundbite API to use your HTTP adapter. This is accomplished by
importing the ```SoundbiteApiConfig``` from ```@soundbite/api``` and setting the 
```httpAdapter``` property to an instance of your HTTP adapter implementation:

```
import { SoundbiteApiConfig } from '@soundbite/api';
...
SoundbiteApiConfig.httpAdapter = new InstanceOfYourHttpAdapter();
```

You only need to set the HTTP Adapter once, so this call should be placed alongside other 
application initialization code.

## Can Soundbite Implement an HTTP Adapter For Me?

Absolutely. Please contact our sales team for information on custom solution implementation.

## Using the Default AXIOS HTTP Adapter

Soundbite provides an out-of-the-box HTTP Adapter implementation for [Axios npm package](https://www.npmjs.com/package/axios). 
If you are using the Axios library for HTTP calls then this is definately the way to go. If you are
not, you can still use the Axios HTTP Adapter, but it will add slightly to your overall packages 
size because it will bundle the Axios library with your solution.  

To use the axios library, you need to add a dependency to the ```@soundbite/api-axios``` package in your 
**packages.json** file. For more information on this, please see the section [Setting Up Dependencies](#Setting-Up-Dependencies).

You then need to import and call the ```useAxios``` method from the package:

```
import { useAxios } from "@soundbite/api-axios"
...
useAxios();
```

The ```useAxios``` method fully configures Soundbite to use the Axios HTTP adapter. You only need
to call this method once, so this call should be placed alongside other application 
initialization code. 

## Configuring the Soundbite API

The Soundbite API requires some degree of configuration before it can be used.  Configuration
settings are exposed from ```SoundbiteApiConfig``` in the ```@soundbite/api``` package.
The configurable properties are listed below:

|Property Name     |Required|Type|Description|
|------------------|--------|----|---|
|ApiPrefixUrl      | No     |String|URL to the Soundbite API.  By default, this value points to https://usw.soundbite.cloud/api/v1 which is the primarily production soundbite location. If you need to point to a custom/test instance of the Soundbite API this value will need to be set accordingly|
|getToken          | Yes    |Delegate|Stores a delgate function that must return a bearer token string that can be sent in the Authorization header for secure API calls.|
|httpAdapter       | Yes    |String|Reference to the IHttpAdapter instance to use for HTTP calls.  Must be set explicitly when implementing your own custom HTTP Adapter.  Soundbite HTTP adapters set this up behind the scenes (e.g. when calling ```useAxios```).|
|imgAvatarUrl      | No     |String|Relative or absolute path of the image used to represent users with no profile image.|
|imgEmptyCardArtUrl| No     |String|Relative or absolute path of the image displayed when a feed has no content.|

**Configuring the getToken Method**

Configuring the ```getToken``` method requires you to setup a function to return the current user token,
as shown in the following example:
```
import { SoundbiteApiConfig } from "@soundbite/api"
...
// Example for JavaScript
SoundbiteApiConfig.getToken = function(){ return "<BearerToken>" };

// Example for TypeScript
SoundbiteApiConfig.getToken = ()=> "<BearerToken>";
```

You only need to set the ```getToken``` method once, so this call should be placed alongside other 
application initialization code.
