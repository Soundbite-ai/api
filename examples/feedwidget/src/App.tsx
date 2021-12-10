import React, { useEffect, useState } from 'react';
import { AppPayload, AzureAuthService, SoundbiteApiConfig } from "@soundbite/api";
import { useAxios as initAxiosAdapter } from "@soundbite/api-axios";
import { WidgetStore, FeedWidget } from "@soundbite/widgets-react";

const orgRoute: string = "13MSq7q03gSAbH4QUynWp";
let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYnVyIjoiNHA5TlhsOTFuMGd2WWZWbUM5ZWZMIiwic2JvciI6IjEzTVNxN3EwM2dTQWJINFFVeW5XcCIsIm5iZiI6MTYzODEzNzMyNSwiZXhwIjoxNjM4MjIzNzI1LCJpYXQiOjE2MzgxMzczMjUsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjMwMDAifQ.Eq7ErJmSnvZwAYd3RpvHYQEqEdn656hoqz74_IM0nRg";

function getToken() {
  return token;
}

function setToken(value: string) {
  token = value;
}

initAxiosAdapter();
SoundbiteApiConfig.getToken = getToken;  
SoundbiteApiConfig.ApiPrefixUrl = "https://localhost:44390";

const App: React.FC = () => {

  let [isReady, setIsReady] = useState(false);
  let [teamRoute, setTeamRoute] = useState<string | undefined>(undefined);
  let [feedTeamRoute, setFeedTeamRoute] = useState<string | undefined>(undefined);

  async function initializeWidgets(): Promise<void> {
    const payLoad: AppPayload = await AzureAuthService.loginToOrg(orgRoute);
    WidgetStore.Initialize(payLoad);
    setIsReady(true);
  }

  function getWidget() {
    if (isReady) {
      return (<div>
        <FeedWidget
          teamRoute={feedTeamRoute}
          noFeedMessage="You have no Soundbites"
          showCreateButton={true}
          showNoFeedImage={true}
          showTitle={true}
          title="Title"          
        />
      </div>);
    } else {
      return (<div>Not Ready...</div>);
    }
  }

  function onApplyTeamRoute() {
    setFeedTeamRoute(teamRoute);
  }

  return (
    <div className="App">
      <div>Token: <input type="text" onChange={(event: any) => { setToken(event.target.value);     }} defaultValue={token} /><button onClick={initializeWidgets}>Initialize</button></div>
      <div>Token: <input type="text" onChange={(event: any) => { setTeamRoute(event.target.value); }} defaultValue={teamRoute} /><button onClick={onApplyTeamRoute}>Set Team</button></div>
      { getWidget() }
    </div>
  );
};


export default App;
