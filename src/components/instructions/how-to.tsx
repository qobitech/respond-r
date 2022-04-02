import React from 'react';
interface IProps {
    title: string;
    howTo: Array<string | JSX.Element>;
};

export const HowTo: Array<IProps> = [
    {
        title: "How to register your organization",
        howTo:[
            "Click on any of the buttons that say 'Register' on the home page or navigation",
            "Fill in the form with the required information",
            "You'll get verification steps sent to the registered email",
            "Follow the steps then proceed to login"
        ]
    },
    {
        title: "How to create an application",
        howTo:[
            "After logging in, navigate to the applications section",
            "Click on the 'Create Application' button",
            "Fill in the required fields and create"
        ]
    },
    {
        title: "How to create an application",
        howTo:[
            "After logging in, navigate to the applications section",
            "Click on the 'Create Application' button",
            "Fill in the required fields and create"
        ]
    },
    {
        title: "How to subscribe to a bundle",
        howTo:[
            "After logging in, navigate to your subscription page",
            "Select from the available bundles, one that suits your organization's needs",
            "Add as many existing applications as you want to the bundle",
            "Click the 'Subscribe' button to finish the process",
            <i>You can always add more applications to the bundle after subscription</i>
        ]
    },
]