[Home](../README.md)
## Using the AXIOS HTTP Adapter

Soundbite provides an out-of-the-box HTTP Adapter implementation for the [Axios library](https://www.npmjs.com/package/axios). 
To use the Axios library with the Soundbite API, you need to do the following:

1. Add a dependency to the ```@soundbite/api-axios``` package in your **packages.json** file.
2. Import and call the ```setupAxiosAdapter``` method from the package:
```
import { setupAxiosAdapter } from "@soundbite/api-axios"
...
setupAxiosAdapter();
...
```

The ```setupAxiosAdapter``` method fully configures Soundbite to use the Axios HTTP adapter. You
only need to call this method once, so this call should be placed alongside other application 
initialization code. 