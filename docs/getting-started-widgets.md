[Home](../README.md)
# Widget Documentation

Soundbite Widgets provide a quick and easy way for developers to embed Soundbite functionality
into a new or existing application.  Widgets are first-class citizens in the Soundbite codebase,
built against our web APIs, and tuned for performance.  Why?  Because we use these exact same
widgets to build our hosted web application and we need them to work well.

This document contains information for getting started with Widgets.  To the extent possible, the
examples herein have been trimmed down to the bare necessities to make it easier for you to see 
how to work with Widgets without the clutter of other "stuff" in the example.

<br/>

## Additional Required Packages

Before you can use Widgets you will need to add dependencies on a couple of packages that have
been setup as peer dependencies within our NPM packages.  Peer dependencies are not automatically
imported during the ```npm install``` process and must be manually added either through the command
line or by manually modifying the **package.json** file.  If you use the command line to add any
peer dependencies, then they will be automatically downloaded to the **node_modules** folder in your
project.  If you manually add the entries to the **package.json** file, then you will need to re-run
```npm install``` in order to download the package.

**Peer Dependencies:** 

|Package Name                     |Version|Description|
|---------------------------------|-------|-----------------------------------------------------------------------------------|
|**[mobx](https://www.npmjs.com/package/mobx)**                                   | ^6.2.0|Used for state management|
|**[mobx&#8209;react&#8209;lite](https://www.npmjs.com/package/mobx-react-lite)** | ^3.2.0|Provides ability for React functional components to response to state changes from MobX|
|**[react](https://www.npmjs.com/package/react)**                                 |^16.9.0|Core library for React.  Must be a peer dependency to avoid DOM tree with multiple react versions|
|**[react-dom](https://www.npmjs.com/package/react-dom)**                         |^16.9.0|Core library for React component rendering.|

In addition to the Peer dependencies, you will also need to reference the Soundbite packages from
your solution as well.  

**package.json**
```
{
  dependencies: {
    ...
    "mobx": "^6.2.0",
    "mobx-react-lite": "^3.2.0",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "@soundbite/api": "file:soundbite-api-1.0.0.tgz",
    "@soundbite/api-axios": "file:soundbite-api-axios-1.0.0.tgz",
    "@soundbite/widgets-react": "file:soundbite-widgets-react-1.0.0.tgz"
    ...
  }
}
```
**Note:** the .tgz files in your **package.json** will need to be pathed correctly if they are in a subdirectory or 
some other location other than the root of the project.

<br/>

## Initializing the Widget Store

Soundbite Widgets have two ways of interacting with data.  One way is by manually acquiring data 
and passing it into Widgets via properties on the various widget components.  When data is not
explicitly provided to a Widget, it will "fall-back" on data in the ```WidgetStore```, a class that
is available in the ```@soundbite/widgets-react``` package.  This allows some Widgets, like the 
Feed Widget, to operate with very little configuration.  Before the ```WidgetStore``` can provide 
useful data to the Widgets it must first be initialized.  

To initialize the WidetStore, you need to acquire an ```AppPayload``` from the Soundbite API, as 
shown in the code below.  The ```AppPayload``` contains all of the data needed to initialize the 
```WidgetStore``` for use by a user.

```javascript
import { AppPayload, AzureAuthService } from "@soundbite/api";
import { WidgetStore } from "@soundbite/widgets-react";
...
const payLoad: AppPayload = await AzureAuthService.loginToOrg(orgRoute);
WidgetStore.Initialize(payLoad);
```

After the ```WidgetStore``` has been initialized, it will begin providing default data to any
Widget that can "fallback" on ```WidgetStore``` data.

<br/>

## Feed Widget

The Feed widget displays a collection of Soundbites for the current user.  All of the properties on
the Feed widget are optional if the WidgetStore is initialized.  If the WidgetStore is not 
initialized then the orgRoute, sessions, and currentUser properties must be populated.

|Name              |Type              |Required|Description|
|------------------|------------------|--------|-------------------------------------------------------------------------------------------------------------|
|noFeedMessage     | string           | No     | Message displayed to the user when there are no Soundbites in the feed.
|showNoFeedImage?: | boolean          | No     | Flag indicating whether the empty card art image should be displayed when there is no feed data.
|showCreateButton? | boolean          | No     | Flag indicating whether the create button should be displayed.
|showTitle?:       | boolean          | No     | Flag indicating whether to show the title at the top of the widget.
|title?:           | string           | No     | Title text displayed at the top of the widget.  Disregarded when showTitle is false.
|orgRoute?         | string           | No     | Explicitly sets the Organization Route instead of retrieving it from the WidgeStore.
|sessions?:        | SessionPreview[] | No     | Explicitly sets the list of sessions to display instead of using the WidgetStore.  Specifies the collection of sessions to display in the feed.  Default value will be the organization feed if not team is specified, or the team feed if a Team Route is specified.
|teamRoute?:       | string           | No     | Applies a filter to only show sessions from the specified team.  Disregarded when the sessions property has data.
|currentUser?:     | Person           | No     | Explicitly sets the current user instead of retrieving it from the WidgeStore.

<br/>

## Examples:

|Name|Description|
|-----------|---|
|[Feed Widget](../examples/feedwidget)|Example demonstrating how to work with the Feed Widget.|
