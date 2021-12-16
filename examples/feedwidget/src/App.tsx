import React, { useState } from 'react';
import { AppPayload, AzureAuthService, SoundbiteApiConfig } from "@soundbite/api";
import { setupAxiosAdapter } from "@soundbite/api-axios";
import { WidgetStore, FeedWidget } from "@soundbite/widgets-react";
import './App.css';

// Setup the API to use the Axios HTTP Adapter
setupAxiosAdapter();

const App: React.FC = () => {

    /////[ State Properties ]///////////////////////////////////////////////////////////////////////
    
    let [isReady, setIsReady] = useState(false);            // Stores a flag to signal when configuration is complete and the feed can be displayed.
    let [token, setToken] = useState<string | null>("");    // Stores the authentication token value entered in the form.
    let [orgRoute, setOrgRoute] = useState("");             // Stores the organization route entered in the form.
    let [teamRoute, setTeamRoute] = useState("");           // Stores the team route value used to trim the feed to a specific team.
    let [teamRouteValue, setTeamRouteValue] = useState(""); // Stores the team route value entered into the form.
    let [apiUrl, setApiUrl] = useState<string>(             // Stores the API Url value entered into the form.
        "https://usw.soundbite.cloud/api/v1");

    /////[ Event Handlers ]/////////////////////////////////////////////////////////////////////////

    /**
     * Configures the Soundbite API based on the settings entered into the form. These settings will
     * normally be set during application initialization.  They are configured here because it is a
     * demo application.
     */
    async function onInitializeWidgets(): Promise<void> {
        SoundbiteApiConfig.getToken = () => Promise.resolve(token);
        SoundbiteApiConfig.ApiPrefixUrl = apiUrl;
        onApplyTeamRoute();
        const payLoad: AppPayload = await AzureAuthService.loginToOrg(orgRoute);
        WidgetStore.Initialize(payLoad);
        setIsReady(true);
    }

    /**
     * As the user enters text into the Team Route textbox, the value is stored in the 
     * teamRouteValue state property.  This method applies that value to the teamRoute
     * state property after it has been compeltely entered.  This helps avoid continually
     * calling out to the Soundbite API before the value is complete.
     */
    function onApplyTeamRoute() {
        setTeamRoute(teamRouteValue);
    }

    /////[ Component Rendering ]////////////////////////////////////////////////////////////////////

    return (
        <React.Fragment>
            <div>
                <div className="DataEntryRow">
                    <div>API Url:</div>
                    <input type="text" onChange={(event: any) => { setApiUrl(event.target.value); }} defaultValue={apiUrl} />
                </div>
                <div className="DataEntryRow">
                    <div>Auth Token:</div>
                    <input type="text" onChange={(event: any) => { setToken(event.target.value); }} defaultValue={token ?? ""} />
                </div>
                <div className="DataEntryRow">
                    <div>Org Route:</div>
                    <input type="text" onChange={(event: any) => { setOrgRoute(event.target.value); }} defaultValue={teamRoute} />
                </div>
                <div className="DataEntryRow">
                    <div>Team Route:</div>
                    <input type="text" onChange={(event: any) => { setTeamRouteValue(event.target.value); }} defaultValue={teamRoute} />
                    {!isReady ? null : <button onClick={onApplyTeamRoute}>Update Team</button>}
                </div>
                <div className="ButtonRow">
                    { isReady ? null : (<button onClick={onInitializeWidgets}>Initialize Widget</button>) }                    
                </div>
            </div>
            <hr/>
            {!isReady ? null : (
                <FeedWidget
                    teamRoute={teamRoute}
                    noFeedMessage="You have no Soundbites"
                    showCreateButton={true}
                    showNoFeedImage={true}
                    showTitle={true}
                    title="Title"
                />
            )}
            {isReady ? null : (
                <React.Fragment>
                    <div className="Instructions">
                        <b>Please enter configuration settings and press the Initialize Widget button.</b>
                    </div>
                    <div className="Instructions">
                        By default, the API URL points to the USW instance of Soundbite.  Most customers are on this instance.
                        You can acquire your Auth token by navigating to the Soundbite website and using the browser developer
                        tools to inspect API calls to Soundbite. You will want to copy the Authorization header value which will
                        contain a Bearer token value.  When entering the value here, make sure to remove the <b>Bearer</b>
                        &nbsp;portion of the value as well as any whitespace.
                    </div>
                    <div className="Instructions">
                        Org Route and Team Route can be determined from the URL on the soundbite website.  The organization
                        route appears immediately after <b>/organizations/</b> and the team route appears immediately after&nbsp;
                        <b>/teams/</b> in the URL.
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default App;
