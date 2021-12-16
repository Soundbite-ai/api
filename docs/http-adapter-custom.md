[Home](../README.md)
# Creating a Custom Soundbite HTTP Adapter

You probably have a favorite NPM package for making xHttp calls.  You probably also have a bunch
of reasons why it is great and everyone should use it. Someone out there disagrees with you, and 
someone else out there disagrees with both of you plus everyone else on the internet. Instead of 
getting entrenched in this debate, Soundbite created an HTTP adapter interface that allows you to 
use whatever xHttp client you want.  It also has the added benefit of keeping bundle sizes down
because you only have to bundle one xHttp package instead of two.

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

#### Can Soundbite Implement an HTTP Adapter For Me?

Absolutely. Please contact our sales team for information on custom solution implementation.