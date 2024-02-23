const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"name"   
    },{
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"password_confirmation",
        id:"password_confirmation",
        name:"password_confirmation",
        type:"password",
        autoComplete:"password_confirmation",
        isRequired:true,
        placeholder:"Confirm Password"   
    },
    {
        labelText: "Mobile",
        labelFor: "mobile",
        id: "mobile",
        name: "mobile",
        type: "text",
        autoComplete: "mobile",
        isRequired: true,
        placeholder: "Mobile Number"
        
    },
    {
        labelText: "Verification Code",
        labelFor: "verification_code",
        id: "verification_code",
        name: "verification_code",
        type: "text",
        autoComplete: "off",
        isRequired: false,
        placeholder: "Verification Code (Enter after SMS received)"
    },
    {
        labelText: "Comment",
        labelFor: "comment",
        id: "comment",
        name: "comment",
        type: "text",
        autoComplete: "comment",
        isRequired: false,
        placeholder: "Comment (Optional)"
    }
]

const userSettingsFields = [
    {
        labelText: "Name",
        labelFor: "name",
        id: "name",
        name: "name",
        type: "text",
        autoComplete: "name",
        isRequired: true,
        placeholder: "Name"
    },
    {
        labelText: "Mobile",
        labelFor: "mobile",
        id: "mobile",
        name: "mobile",
        type: "text",
        autoComplete: "mobile",
        isRequired: true,
        placeholder: "Mobile Number"
    },
    {
        labelText: "Comment",
        labelFor: "comment",
        id: "comment",
        name: "comment",
        type: "text",
        autoComplete: "comment",
        isRequired: false,
        placeholder: "Comment (Optional)"
    }
];

export {loginFields, signupFields, userSettingsFields}